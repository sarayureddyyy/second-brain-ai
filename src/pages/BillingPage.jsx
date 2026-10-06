import { useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { useAuth } from "../auth/AuthContext.jsx";
import { supabase } from "../auth/supabase.js";
import { useBilling } from "../billing/BillingContext.jsx";
import { billingRequest } from "../billing/api.js";

export default function BillingPage() {
  const { user } = useAuth();
  const { billing, loading, error, checking, refresh } = useBilling();
  const [params] = useSearchParams();
  const [busy, setBusy] = useState("");
  const [actionError, setActionError] = useState("");
  if (billing?.active) return <Navigate to="/app/dashboard" replace />;
  const action = async name => {
    setBusy(name); setActionError("");
    try {
      if (name === "logout") {
        const { error: logoutError } = await supabase.auth.signOut({ scope: "local" });
        if (logoutError) throw logoutError;
      } else {
        const { url } = await billingRequest(name);
        window.location.assign(url);
      }
    } catch (err) { setActionError(err.message); }
    finally { setBusy(""); }
  };
  return <main className="grid min-h-screen place-items-center bg-paper px-4 py-10 text-ink">
    <section className="w-full max-w-lg rounded-[2rem] border border-ink/10 bg-white p-6 shadow-soft sm:p-10">
      <Link to="/" className="inline-flex items-center gap-2 font-bold"><GraduationCap size={24} /> Second Brain AI</Link>
      <p className="eyebrow mt-10">Your workspace</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">One plan. A calmer semester.</h1>
      <p className="mt-5 text-4xl font-bold">$6 <span className="text-base font-normal text-ink/60">USD / month</span></p>
      <p className="mt-4 leading-7 text-ink/70">Subscribe to enter your workspace. Your subscription renews monthly until canceled. Cancel through Manage billing.</p>
      <p className="mt-4 rounded-xl bg-mist p-3 text-sm">Sandbox checkout: test payments only. No real money is collected.</p>
      <p className="mt-4 break-all text-sm text-ink/60">Signed in as {user.email}</p>
      {params.get("checkout") === "success" && <p role="status" className="mt-4 text-sm">Checking your payment with Stripe. If access hasn’t opened yet, check again in a moment.</p>}
      {params.get("checkout") === "canceled" && <p role="status" className="mt-4 text-sm">Checkout was canceled. You can return to it when you’re ready.</p>}
      {loading && <p role="status" className="mt-4 text-sm">Checking your subscription…</p>}
      {(error || actionError) && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800">{actionError || error}</p>}
      {!loading && !error && <button type="button" onClick={() => action("checkout")} disabled={Boolean(busy) || checking} className="mt-6 w-full rounded-2xl bg-coral px-5 py-3.5 font-bold text-white hover:bg-ink disabled:opacity-50">{busy === "checkout" ? "Opening checkout…" : "Subscribe for $6/month"}</button>}
      <div className="mt-5 flex flex-wrap gap-4 text-sm font-bold">
        <button type="button" disabled={Boolean(busy) || checking} onClick={refresh} className="underline">{checking ? "Checking…" : "Check subscription"}</button>
        {billing?.hasCustomer && <button type="button" disabled={Boolean(busy)} onClick={() => action("portal")} className="underline">Manage billing</button>}
        <button type="button" disabled={Boolean(busy)} onClick={() => action("logout")} className="underline">Log out</button>
      </div>
    </section>
  </main>;
}
