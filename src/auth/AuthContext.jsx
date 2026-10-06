import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "./supabase.js";
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recovering, setRecovering] = useState(false);
  useEffect(() => {
    let active = true;
    let revision = 0;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const current = ++revision;
      if (event === "PASSWORD_RECOVERY") setRecovering(true);
      if (event === "SIGNED_OUT") { setUser(null); setRecovering(false); }
      // Run outside the auth callback lock.
      setTimeout(async () => {
        try {
          const result = session ? await supabase.auth.getUser() : { data: { user: null } };
          if (active && current === revision) { setUser(result.error ? null : result.data.user); setLoading(false); }
        } catch {
          if (active && current === revision) { setUser(null); setLoading(false); }
        }
      }, 0);
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);
  return <AuthContext.Provider value={{ user, loading, recovering, setRecovering }}>{children}</AuthContext.Provider>;
}
export function RequireAuth({ children }) {
  const { user, loading, recovering } = useAuth();
  const location = useLocation();
  if (loading) return <p role="status" className="p-10 text-center">Checking your account…</p>;
  if (recovering) return <Navigate to="/reset-password" replace />;
  if (!user?.email_confirmed_at) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return children;
}
