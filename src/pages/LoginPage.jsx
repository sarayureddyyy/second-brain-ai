import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-paper px-4 py-10 text-ink">
      <section className="w-full max-w-lg rounded-[2rem] border border-ink/10 bg-white p-6 shadow-soft sm:p-10">
        <Link to="/" className="inline-flex items-center gap-2 font-bold">
          <GraduationCap size={24} /> Second Brain AI
        </Link>
        <p className="eyebrow mt-10">Workspace preview</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Try your task board.</h1>
        <p className="mt-4 text-base leading-7 text-ink/70">
          Explore the board with sample tasks, or add your own. Changes are saved
          only in this browser on this device. Account sign-in and sync are coming soon.
        </p>
        <Link to="/app/dashboard" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-5 py-3.5 text-sm font-bold text-white hover:bg-coral">
          Open workspace <ArrowRight size={17} />
        </Link>
        <p className="mt-6 text-center text-sm text-ink/70">
          Want beta access? <Link to="/waitlist" className="font-bold underline">Join the waitlist</Link>
        </p>
      </section>
    </main>
  );
}
