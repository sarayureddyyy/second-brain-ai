import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

export class BillingError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

export function billingServices(env = process.env) {
  const required = ["STRIPE_SECRET_KEY", "SUPABASE_SERVICE_ROLE_KEY", "APP_URL"];
  if (required.some(name => !env[name])) throw new BillingError(503, "Billing is being set up. Please try again later.");
  // This first integration is sandbox-only until an explicit live rollout.
  if (!env.STRIPE_SECRET_KEY.startsWith("sk_test_")) throw new BillingError(503, "Sandbox billing is not configured correctly.");
  const url = env.SUPABASE_URL || "https://xxmqfkqawpdivxrltnii.supabase.co";
  const db = createClient(url, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const siteUrl = new URL(env.APP_URL).origin;
  if (!siteUrl.startsWith("https://") && !/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(siteUrl)) throw new BillingError(503, "Billing is not configured correctly.");
  return {
    auth: db.auth, db, stripe: new Stripe(env.STRIPE_SECRET_KEY), siteUrl,
    priceId: env.STRIPE_PRICE_ID || "price_1UNgFTKNIrCbezemGWSdGvD9",
    productId: "prod_VOTBaUBOvF2QP1",
  };
}

export function hasPaidAccess(subscription, priceId) {
  return subscription.status === "active" && !subscription.pause_collection &&
    subscription.items.data.some(item => item.price.id === priceId) &&
    subscription.latest_invoice?.status === "paid";
}

async function customerIdFor(user, services, create = false) {
  const { db, stripe } = services;
  const { data, error } = await db.from("billing_customers").select("stripe_customer_id").eq("user_id", user.id).eq("livemode", false).maybeSingle();
  if (error) throw error;
  if (data) return data.stripe_customer_id;
  if (!create) return null;
  const customer = await stripe.customers.create({ email: user.email, metadata: { supabase_user_id: user.id } }, { idempotencyKey: `customer:test:${user.id}` });
  const inserted = await db.from("billing_customers").upsert({ user_id: user.id, livemode: false, stripe_customer_id: customer.id }, { onConflict: "user_id,livemode", ignoreDuplicates: true });
  if (inserted.error) throw inserted.error;
  // A concurrent request may already have saved the mapping; always use that row.
  return customerIdFor(user, services);
}

async function subscriptionsFor(customer, stripe) {
  const subscriptions = [];
  for await (const subscription of stripe.subscriptions.list({ customer, status: "all", limit: 100, expand: ["data.latest_invoice"] })) subscriptions.push(subscription);
  return subscriptions;
}

export async function handleBilling({ method, action, token }, services) {
  if (!["status", "checkout", "portal"].includes(action)) throw new BillingError(404, "Not found.");
  if (method !== (action === "status" ? "GET" : "POST")) throw new BillingError(405, "Method not allowed.");
  if (!token) throw new BillingError(401, "Please log in to continue.");
  const { data, error } = await services.auth.getUser(token);
  if (error || !data.user?.email_confirmed_at) throw new BillingError(401, "Please log in with a verified account.");
  const user = data.user;
  const { stripe, priceId, productId, siteUrl } = services;
  let customer = await customerIdFor(user, services);
  if (action === "portal") {
    if (!customer) throw new BillingError(409, "Subscribe before managing billing.");
    const portal = await stripe.billingPortal.sessions.create({ customer, return_url: `${siteUrl}/billing` });
    return { url: portal.url };
  }
  const subscriptions = customer ? await subscriptionsFor(customer, stripe) : [];
  const active = subscriptions.find(subscription => hasPaidAccess(subscription, priceId));
  const current = active || subscriptions.find(subscription => subscription.items.data.some(item => item.price.id === priceId) && !["canceled", "incomplete_expired"].includes(subscription.status));
  if (action === "status") return { active: Boolean(active), status: current?.status || "none", hasCustomer: Boolean(customer), sandbox: true };
  if (active) return { url: `${siteUrl}/app/dashboard` };
  if (current) throw new BillingError(409, "Your subscription needs attention. Use Manage billing to finish payment or update your card.");
  const price = await stripe.prices.retrieve(priceId);
  if (!price.active || price.livemode || price.product !== productId || price.unit_amount !== 600 || price.currency !== "usd" || price.recurring?.interval !== "month" || price.recurring.interval_count !== 1) throw new BillingError(503, "The $6 monthly plan is not configured correctly.");
  customer ||= await customerIdFor(user, services, true);
  const open = await stripe.checkout.sessions.list({ customer, status: "open", limit: 100 });
  const existing = open.data.find(session => session.mode === "subscription" && session.metadata?.price_id === priceId && session.url);
  if (existing) return { url: existing.url };
  const session = await stripe.checkout.sessions.create({
    mode: "subscription", customer, client_reference_id: user.id,
    payment_method_types: ["card"], line_items: [{ price: priceId, quantity: 1 }],
    metadata: { supabase_user_id: user.id, price_id: priceId },
    subscription_data: { metadata: { supabase_user_id: user.id } },
    success_url: `${siteUrl}/billing?checkout=success`, cancel_url: `${siteUrl}/billing?checkout=canceled`,
  }, { idempotencyKey: `checkout:test:${customer}:${priceId}:${Math.floor(Date.now() / 300000)}` });
  return { url: session.url };
}
