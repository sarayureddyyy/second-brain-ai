import test from "node:test";
import assert from "node:assert/strict";
import { billingServices, handleBilling, hasPaidAccess } from "../server/billing.js";
import handler, { billingDiagnostic } from "../api/billing.js";

const priceId = "price_1UNgFTKNIrCbezemGWSdGvD9";
const productId = "prod_VOTBaUBOvF2QP1";
test("billing diagnostics retain useful errors while redacting credentials", () => {
  const result = billingDiagnostic(Object.assign(new Error("Invalid API Key provided: sk_live_secret123 Bearer private-token"), { type: "StripeAuthenticationError", requestId: "req_example" }));
  assert.equal(result.type, "StripeAuthenticationError");
  assert.equal(result.requestId, "req_example");
  assert.ok(result.message.includes("Invalid API Key"));
  assert.ok(!result.message.includes("secret123"));
  assert.ok(!result.message.includes("private-token"));
});
const paid = { status: "active", pause_collection: null, latest_invoice: { status: "paid" }, items: { data: [{ price: { id: priceId } }] } };
function services(subscriptions = []) {
  const calls = [];
  const query = {
    select() { return this; },
    eq(key, value) { calls.push([key, value]); return this; },
    async maybeSingle() { return { data: { stripe_customer_id: "cus_ours" }, error: null }; },
  };
  return {
    calls, priceId, productId, livemode: false, siteUrl: "https://example.com",
    auth: { async getUser(token) { assert.equal(token, "verified-token"); return { data: { user: { id: "our-user", email: "test@example.com", email_confirmed_at: "today" } } }; } },
    db: { from(table) { assert.equal(table, "billing_customers"); return query; } },
    stripe: {
      subscriptions: { list(options) { assert.equal(options.customer, "cus_ours"); return (async function* () { yield* subscriptions; })(); } },
      prices: { async retrieve(id) { assert.equal(id, priceId); return { active: true, livemode: false, billing_scheme: "per_unit", unit_amount: 600, currency: "usd", product: productId, recurring: { interval: "month", interval_count: 1, usage_type: "licensed" } }; } },
      checkout: { sessions: {
        async list() { return { data: [] }; },
        async create(options, config) { calls.push(["checkout", options, config]); return { url: "https://checkout.stripe.com/test" }; },
      } },
      billingPortal: { sessions: { async create(options) { calls.push(["portal", options]); return { url: "https://billing.stripe.com/test" }; } } },
    },
  };
}
test("only an active, paid subscription for the configured price grants access", () => {
  assert.equal(hasPaidAccess(paid, priceId), true);
  for (const status of ["trialing", "incomplete", "past_due", "unpaid", "canceled", "paused"]) assert.equal(hasPaidAccess({ ...paid, status }, priceId), false);
  assert.equal(hasPaidAccess({ ...paid, latest_invoice: { status: "open" } }, priceId), false);
  assert.equal(hasPaidAccess({ ...paid, latest_invoice: null }, priceId), false);
  assert.equal(hasPaidAccess({ ...paid, pause_collection: { behavior: "void" } }, priceId), false);
  assert.equal(hasPaidAccess(paid, "price_other"), false);
  assert.equal(hasPaidAccess({ ...paid, cancel_at_period_end: true }, priceId), true);
});
test("anonymous requests are rejected before billing credentials are used", async () => {
  const res = { setHeader() {}, end(value) { this.body = JSON.parse(value); } };
  await handler({ url: "/api/billing?action=status", headers: {}, method: "GET" }, res);
  assert.equal(res.statusCode, 401);
});
test("unverified accounts and unsupported methods cannot create checkout", async () => {
  const svc = services();
  svc.auth.getUser = async () => ({ data: { user: { id: "unverified" } } });
  await assert.rejects(handleBilling({ action: "checkout", method: "POST", token: "token" }, svc), error => error.status === 401);
  await assert.rejects(handleBilling({ action: "checkout", method: "GET", token: "token" }, svc), error => error.status === 405);
});
test("status uses the authenticated user's database mapping", async () => {
  const svc = services([paid]);
  const result = await handleBilling({ method: "GET", action: "status", token: "verified-token" }, svc);
  assert.equal(result.active, true);
  assert.ok(svc.calls.some(([key, value]) => key === "user_id" && value === "our-user"));
  assert.ok(svc.calls.some(([key, value]) => key === "livemode" && value === false));
});
test("payment failures and canceled subscriptions revoke access on the next check", async () => {
  for (const status of ["past_due", "canceled", "incomplete"]) {
    const result = await handleBilling({ method: "GET", action: "status", token: "verified-token" }, services([{ ...paid, status }]));
    assert.equal(result.active, false);
  }
});
test("active users never create a second subscription", async () => {
  const svc = services([paid]);
  const result = await handleBilling({ method: "POST", action: "checkout", token: "verified-token" }, svc);
  assert.equal(result.url, "https://example.com/app/dashboard");
  assert.equal(svc.calls.some(([type]) => type === "checkout"), false);
});
test("existing unpaid subscriptions must be resolved instead of duplicated", async () => {
  await assert.rejects(handleBilling({ method: "POST", action: "checkout", token: "verified-token" }, services([{ ...paid, status: "past_due" }])), error => error.status === 409);
});
test("checkout pins the $6 price, customer, account identity and trusted return URLs", async () => {
  const svc = services();
  await handleBilling({ method: "POST", action: "checkout", token: "verified-token" }, svc);
  const [, options, config] = svc.calls.find(([type]) => type === "checkout");
  assert.deepEqual(options.line_items, [{ price: priceId, quantity: 1 }]);
  assert.equal(Object.hasOwn(options, "payment_method_types"), false);
  assert.equal(options.customer, "cus_ours");
  assert.equal(options.client_reference_id, "our-user");
  assert.equal(options.success_url, "https://example.com/billing?checkout=success");
  assert.ok(config.idempotencyKey);
});
test("an open checkout is reused", async () => {
  const svc = services();
  svc.stripe.checkout.sessions.list = async () => ({ data: [{ mode: "subscription", metadata: { price_id: priceId }, url: "https://checkout.stripe.com/existing" }] });
  const result = await handleBilling({ method: "POST", action: "checkout", token: "verified-token" }, svc);
  assert.equal(result.url, "https://checkout.stripe.com/existing");
  assert.equal(svc.calls.some(([type]) => type === "checkout"), false);
});
test("a price from the wrong billing mode is never charged", async () => {
  const svc = services();
  svc.stripe.prices.retrieve = async () => ({ active: true, livemode: true });
  await assert.rejects(handleBilling({ method: "POST", action: "checkout", token: "verified-token" }, svc), error => error.status === 503);
});
test("portal uses only the authenticated customer's billing account", async () => {
  const svc = services();
  await handleBilling({ method: "POST", action: "portal", token: "verified-token" }, svc);
  assert.deepEqual(svc.calls.find(([type]) => type === "portal")[1], { customer: "cus_ours", return_url: "https://example.com/billing" });
});
test("configuration rejects missing credentials or a missing price", () => {
  assert.throws(() => billingServices({}), error => error.status === 503);
  assert.throws(() => billingServices({ STRIPE_SECRET_KEY: "sk_live_wrong", SUPABASE_SERVICE_ROLE_KEY: "server-only", APP_URL: "https://example.com" }), error => error.status === 503);
});

test("configuration supports live and test keys with an explicit price", () => {
  for (const mode of ["live", "test"]) {
    const svc = billingServices({ STRIPE_SECRET_KEY: `sk_${mode}_example`, STRIPE_PRICE_ID: priceId, SUPABASE_SERVICE_ROLE_KEY: "server-only", APP_URL: "https://second-brain-ai-nine-rho.vercel.app/" });
    assert.equal(svc.livemode, mode === "live");
    assert.equal(svc.priceId, priceId);
    assert.equal(svc.productId, null);
  }
});

test("live checkout uses the live customer mapping and accepts a live price", async () => {
  const svc = services();
  svc.livemode = true;
  const retrieve = svc.stripe.prices.retrieve;
  svc.stripe.prices.retrieve = async id => ({ ...await retrieve(id), livemode: true });
  await handleBilling({ method: "POST", action: "checkout", token: "verified-token" }, svc);
  assert.ok(svc.calls.some(([key, value]) => key === "livemode" && value === true));
  assert.match(svc.calls.find(([key]) => key === "checkout")[2].idempotencyKey, /^checkout:live:/);
  const status = await handleBilling({ method: "GET", action: "status", token: "verified-token" }, svc);
  assert.equal(status.sandbox, false);
  svc.stripe.prices.retrieve = retrieve;
  await assert.rejects(handleBilling({ method: "POST", action: "checkout", token: "verified-token" }, svc), error => error.status === 503);
});

test("new live customers are stored separately from sandbox customers", async () => {
  const svc = services();
  svc.livemode = true;
  let mapping = null;
  const query = { select() { return this; }, eq() { return this; }, async maybeSingle() { return { data: mapping, error: null }; } };
  svc.db.from = () => ({ ...query, async upsert(row) { assert.equal(row.livemode, true); mapping = row; return { error: null }; } });
  svc.stripe.customers = { async create(options, config) { assert.equal(config.idempotencyKey, "customer:live:our-user"); return { id: "cus_ours" }; } };
  const retrieve = svc.stripe.prices.retrieve;
  svc.stripe.prices.retrieve = async id => ({ ...await retrieve(id), livemode: true });
  await handleBilling({ method: "POST", action: "checkout", token: "verified-token" }, svc);
  assert.equal(mapping.stripe_customer_id, "cus_ours");
});
