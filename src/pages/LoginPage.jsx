import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { supabase } from "../auth/supabase.js";
import { useAuth } from "../auth/AuthContext.jsx";

export default function LoginPage() {
  const { user, loading, recovering, setRecovering } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const reset = location.pathname === "/reset-password" || recovering;
  const target = location.state?.from?.startsWith("/app/") ? location.state.from : "/app/dashboard";
  if (loading) return <p role="status" className="p-10 text-center">Checking your account…</p>;
  if (user?.email_confirmed_at && !reset) return <Navigate to={target} replace />;
  const changeMode = next => { setMode(next); setError(""); setMessage(""); setPassword(""); };
  const submit = async event => {
    event.preventDefault();
    setBusy(true); setError(""); setMessage("");
    try {
      let result;
      if (reset) {
        if (!user) throw new Error("Open the reset link in your email before choosing a new password.");
        result = await supabase.auth.updateUser({ password });
      } else if (mode === "signup") {
        result = await supabase.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: `${window.location.origin}/login` } });
      } else if (mode === "forgot") {
        result = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/reset-password` });
      } else {
        result = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      }
      if (result.error) throw result.error;
      setPassword("");
      if (reset) { setRecovering(false); navigate("/app/dashboard", { replace: true }); }
      else if (mode === "signup") setMessage("Check your email for a confirmation link. If you already have an account, log in or reset your password.");
      else if (mode === "forgot") setMessage("If an account exists for that email, you’ll receive a reset link.");
    } catch (err) { setError(err.message || "Could not connect. Please try again."); }
    finally { setBusy(false); }
  };
  const title = reset ? "Choose a new password." : mode === "signup" ? "Create your account." : mode === "forgot" ? "Reset your password." : "Welcome back.";
  const action = reset ? "Save password" : mode === "signup" ? "Create account" : mode === "forgot" ? "Send reset link" : "Log in";
  return (
    <main className="grid min-h-screen place-items-center bg-paper px-4 py-10 text-ink">
      <section className="w-full max-w-lg rounded-[2rem] border border-ink/10 bg-white p-6 shadow-soft sm:p-10">
        <Link to="/" className="inline-flex items-center gap-2 font-bold"><GraduationCap size={24} /> Second Brain AI</Link>
        <p className="eyebrow mt-10">Your workspace</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-4 leading-7 text-ink/70">{reset ? "Use at least 8 characters." : mode === "signup" ? "Sign up and verify your email to open your workspace." : mode === "forgot" ? "We’ll email you a link to choose a new password." : "Log in to organize your classes, tasks, and plans."}</p>
        {!reset && mode !== "forgot" && <div className="mt-6 flex gap-2" aria-label="Account options">
          {["login", "signup"].map(next => <button key={next} type="button" disabled={busy} aria-pressed={mode === next} onClick={() => changeMode(next)} className={`flex-1 rounded-full px-4 py-2.5 font-bold ${mode === next ? "bg-ink text-white" : "bg-mist text-ink"}`}>{next === "login" ? "Log in" : "Create account"}</button>)}
        </div>}
        <form onSubmit={submit} className="mt-6 space-y-4">
          {!reset && <label className="block text-sm font-bold">Email<input type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} disabled={busy} className="mt-2 w-full rounded-xl border border-ink/20 px-4 py-3" /></label>}
          {(reset || mode !== "forgot") && <label className="block text-sm font-bold">{reset ? "New password" : "Password"}<input type="password" required minLength={reset || mode === "signup" ? 8 : undefined} autoComplete={reset || mode === "signup" ? "new-password" : "current-password"} value={password} onChange={e => setPassword(e.target.value)} disabled={busy} className="mt-2 w-full rounded-xl border border-ink/20 px-4 py-3" /></label>}
          {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}</p>}
          {message && <p role="status" className="rounded-xl bg-mist p-3 text-sm">{message}</p>}
          <button disabled={busy} className="w-full rounded-2xl bg-coral px-5 py-3.5 font-bold text-white hover:bg-ink disabled:opacity-50">{busy ? "Please wait…" : action}</button>
        </form>
        {!reset && <button type="button" disabled={busy} onClick={() => changeMode(mode === "forgot" ? "login" : "forgot")} className="mt-5 text-sm font-bold underline">{mode === "forgot" ? "Back to log in" : "Forgot password?"}</button>}
        <p className="mt-6 text-sm text-ink/60">Tasks are saved on this browser for your account. Device sync is coming soon.</p>
      </section>
    </main>
  );
}
