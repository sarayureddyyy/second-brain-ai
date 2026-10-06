import { BillingError, billingServices, handleBilling } from "../server/billing.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json");
  const send = (status, data) => { res.statusCode = status; res.end(JSON.stringify(data)); };
  try {
    const action = new URL(req.url, "http://localhost").searchParams.get("action");
    const token = req.headers.authorization?.match(/^Bearer (.+)$/)?.[1];
    // Reject anonymous calls before requiring any billing configuration.
    if (!token) throw new BillingError(401, "Please log in to continue.");
    const result = await handleBilling({ method: req.method, action, token }, billingServices());
    send(200, result);
  } catch (error) {
    if (!(error instanceof BillingError)) console.error("Billing request failed:", error.code || error.name);
    send(error.status || 503, { error: error instanceof BillingError ? error.message : "Could not check billing. Please try again shortly." });
  }
}
