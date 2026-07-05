import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, GraduationCap } from "lucide-react";

const waitlistUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSejWYEeODBE0gQe-dpaemBbTqjJF4OrKRfp23SkW63mmdutQw/viewform?usp=header";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Replace this private-beta placeholder with real authentication.
    navigate("/app/dashboard");
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_20%_10%,rgba(223,143,125,0.22),transparent_28rem),radial-gradient(circle_at_85%_18%,rgba(175,200,173,0.28),transparent_30rem),linear-gradient(180deg,#FAF9F6_0%,#F4EFE7_100%)] px-4 py-10 text-ink">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-[2rem] border border-ink/10 bg-white/78 shadow-soft backdrop-blur lg:grid-cols-[0.92fr_1.08fr]">
          <div className="hidden bg-ink p-10 text-white lg:block">
            <Link to="/" className="inline-flex items-center gap-2 font-bold">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-ink">
                <GraduationCap size={21} />
              </span>
              Second Brain AI
            </Link>
            <div className="mt-20 max-w-md">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-coral">
                Private beta
              </p>
              <h1 className="mt-4 text-5xl font-semibold tracking-tight">
                Your semester command center is almost ready.
              </h1>
              <p className="mt-5 text-base leading-7 text-white/65">
                Classes, tasks, schedules, and AI planning will come together in
                one calm workspace.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <Link to="/" className="inline-flex items-center gap-2 font-bold text-ink lg:hidden">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-white">
                <GraduationCap size={21} />
              </span>
              Second Brain AI
            </Link>
            <div className="mx-auto mt-8 max-w-md lg:mt-10">
              <p className="eyebrow">Second Brain AI</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight">
                Welcome back
              </h2>
              <p className="mt-3 text-base leading-7 text-ink/65">
                Second Brain AI is currently in private beta.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <label className="block">
                  <span className="text-sm font-bold text-ink/70">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@school.edu"
                    className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-coral focus:ring-4 focus:ring-coral/15"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-bold text-ink/70">Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="********"
                    className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-coral focus:ring-4 focus:ring-coral/15"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-5 py-3.5 text-sm font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-coral"
                >
                  Log In <ArrowRight size={17} />
                </button>
              </form>

              <button className="mt-3 w-full rounded-2xl border border-ink/10 bg-white px-5 py-3.5 text-sm font-bold text-ink shadow-card transition hover:-translate-y-0.5 hover:border-sage">
                Continue with Google
              </button>

              <p className="mt-6 text-center text-sm font-semibold text-ink/58">
                Don&apos;t have access yet?{" "}
                <a
                  href={waitlistUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-coral hover:text-ink"
                >
                  Join the waitlist.
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
