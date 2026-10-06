import { supabase } from "../auth/supabase.js";

export async function billingRequest(action) {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) throw new Error("Please log in to continue.");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(`/api/billing?action=${action}`, {
      method: action === "status" ? "GET" : "POST",
      headers: { Authorization: `Bearer ${data.session.access_token}` },
      signal: controller.signal,
    });
    let result;
    try { result = await response.json(); }
    catch { throw new Error("Billing is being set up. Please try again later."); }
    if (!response.ok) throw new Error(result.error || "Could not connect to billing.");
    return result;
  } catch (error) {
    if (error.name === "AbortError") throw new Error("Billing took too long to respond. Please try again.");
    throw error;
  } finally { clearTimeout(timeout); }
}
