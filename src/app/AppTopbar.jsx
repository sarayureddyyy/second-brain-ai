import { Plus } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import { supabase } from "../auth/supabase.js";
import { billingRequest } from "../billing/api.js";
import { useAppData } from "./AppDataContext.jsx";
import SearchAndFilters from "./SearchAndFilters.jsx";

export default function AppTopbar({ title = "Dashboard" }) {
  const { user } = useAuth();
  const [signingOut, setSigningOut] = useState(false);
  const [authError, setAuthError] = useState("");
  const signOut = async () => {
    setSigningOut(true); setAuthError("");
    try {
      const { error } = await supabase.auth.signOut({ scope: "local" });
      if (error) throw error;
    } catch (error) { setAuthError(error.message || "Could not log out. Please try again."); }
    finally { setSigningOut(false); }
  };
  const { setNewTaskDefaults } = useAppData();
  const manageBilling = async () => {
    setAuthError("");
    try { const { url } = await billingRequest("portal"); window.location.assign(url); }
    catch (error) { setAuthError(error.message); }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/90 px-4 py-4 backdrop-blur-xl sm:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral">
            Second Brain AI
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {title}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="max-w-48 truncate text-sm text-ink/60" title={user.email}>{user.email}</span>
          <button type="button" onClick={manageBilling} className="rounded-full border border-ink/20 px-4 py-2 text-sm font-bold">Manage billing</button>
          <button type="button" onClick={signOut} disabled={signingOut} className="rounded-full border border-ink/20 px-4 py-2 text-sm font-bold">{signingOut ? "Logging out…" : "Log out"}</button>
          {authError && <p role="alert" className="text-sm text-red-700">{authError}</p>}
          {title === "Dashboard" ? <SearchAndFilters /> : null}
          <button
            type="button"
            onClick={() => setNewTaskDefaults({})}
            className="inline-flex items-center gap-2 rounded-2xl bg-coral px-4 py-2.5 text-sm font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-ink"
          >
            <Plus size={17} />
            New Task
          </button>
        </div>
      </div>
    </header>
  );
}
