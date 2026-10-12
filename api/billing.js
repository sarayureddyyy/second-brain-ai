import { BillingError, billingServices, handleBilling } from "../server/billing.js";

export function billingDiagnostic(error) {
  const clean = value => typeof value === "string" ? value
    .replace(/\b(?:sk|rk|pk)_(?:test|live)_[A-Za-z0-9_-]+\b/g, "[redacted]")
    .replace(/Bearer\s+\S+/gi, "Bearer [redacted]")
    .replace(/\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g, "[redacted]")
    .slice(0, 1000) : undefined;
  return { name: clean(error.name), code: clean(error.code), type: clean(error.type),
    message: clean(error.message), status: error.statusCode || error.status,
    requestId: clean(error.requestId) };
}

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
    console.error("Billing request failed:", billingDiagnostic(error));
    send(error.status || 503, { error: error instanceof BillingError ? error.message : "Could not check billing. Please try again shortly." });
  }
}
