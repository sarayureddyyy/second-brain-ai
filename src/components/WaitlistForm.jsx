import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const waitlistUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSejWYEeODBE0gQe-dpaemBbTqjJF4OrKRfp23SkW63mmdutQw/viewform?usp=header";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    // Backend integration can later prefill or submit to a first-party waitlist API.
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      window.open(waitlistUrl, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[1.5rem] bg-white p-4 text-ink shadow-card sm:p-5">
      <label htmlFor="email" className="text-sm font-bold text-ink">
        Email address
      </label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@college.edu"
          className="min-h-12 flex-1 rounded-full border border-ink/10 bg-paper px-4 text-sm font-medium outline-none transition placeholder:text-ink/30 focus:border-sage focus:ring-4 focus:ring-sage/20"
        />
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-coral px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-ink"
        >
          Join Waitlist <ArrowRight size={16} />
        </button>
      </div>
      {submitted ? (
        <p className="mt-4 flex items-center gap-2 rounded-2xl bg-sage/20 px-4 py-3 text-sm font-semibold text-emerald-800">
          <CheckCircle2 size={17} />
          You&apos;re on the list. We&apos;ll send early access updates soon.
        </p>
      ) : null}
    </form>
  );
}
