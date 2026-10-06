import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { billingRequest } from "./api.js";

const BillingContext = createContext(null);
export const useBilling = () => useContext(BillingContext);
export function BillingProvider({ children }) {
  const { user } = useAuth();
  // Remount to prevent a previous account's subscription granting access.
  return <BillingState key={user?.id || "guest"} user={user}>{children}</BillingState>;
}
function BillingState({ user, children }) {
  const [billing, setBilling] = useState(null);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const revision = useRef(0);
  const mounted = useRef(false);
  const refresh = useCallback(async () => {
    if (!user?.email_confirmed_at) return;
    const current = ++revision.current;
    setChecking(true);
    try {
      const result = await billingRequest("status");
      if (mounted.current && current === revision.current) { setBilling(result); setError(""); }
    } catch (err) {
      if (mounted.current && current === revision.current) { setBilling({ active: false }); setError(err.message); }
    } finally {
      if (mounted.current && current === revision.current) setChecking(false);
    }
  }, [user?.id, user?.email_confirmed_at]);
  useEffect(() => {
    mounted.current = true;
    refresh();
    const interval = setInterval(refresh, 60000);
    const focus = () => refresh();
    window.addEventListener("focus", focus);
    return () => { mounted.current = false; ++revision.current; clearInterval(interval); window.removeEventListener("focus", focus); };
  }, [refresh]);
  return <BillingContext.Provider value={{ billing, loading: !billing, error, checking, refresh }}>{children}</BillingContext.Provider>;
}
export function RequireSubscription({ children }) {
  const { billing, loading } = useBilling();
  const location = useLocation();
  if (loading) return <p role="status" className="p-10 text-center">Checking your subscription…</p>;
  if (!billing?.active) return <Navigate to="/billing" state={{ from: location.pathname }} replace />;
  return children;
}
