import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";

const waitlistUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSejWYEeODBE0gQe-dpaemBbTqjJF4OrKRfp23SkW63mmdutQw/viewform?usp=header";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-12 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-3 py-1.5 text-sm font-semibold text-ink/70 shadow-card">
            <Sparkles size={16} className="text-coral" />
            AI planning for full-time students
          </div>
          <h1 className="mt-7 max-w-3xl text-5xl font-semibold tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Your AI second brain for college life.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/70 sm:text-xl">
            Organize classes, assignments, applications, clubs, and personal
            tasks in one place - then let AI help you prioritize what to do next.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={waitlistUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white shadow-card transition hover:-translate-y-1 hover:bg-coral"
            >
              Join the Waitlist <ArrowRight size={17} />
            </a>
            <a
              href="/how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/12 bg-white/75 px-6 py-3.5 text-sm font-bold text-ink shadow-card transition hover:-translate-y-1 hover:border-sage"
            >
              <PlayCircle size={17} /> See How It Works
            </a>
          </div>
        </div>
        <div className="relative min-h-[24rem] overflow-hidden rounded-[2rem] border border-ink/10 bg-white p-5 shadow-soft">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(239,246,244,0.9),rgba(255,255,255,0.2))]" />
          <div className="relative grid h-full gap-4">
            <div className="rounded-3xl bg-ink p-5 text-white">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white/70">Today&apos;s plan</span>
                <span className="rounded-full bg-white/12 px-3 py-1 text-xs">AI ranked</span>
              </div>
              <div className="mt-6 space-y-3">
                {["Finish Systems Lab", "Study Spanish vocab", "Apply to internship"].map(
                  (task, index) => (
                    <div key={task} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-ink">
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium">{task}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl border border-ink/10 bg-white p-5">
                <p className="text-sm font-semibold text-ink/50">Focus time</p>
                <p className="mt-3 text-3xl font-semibold text-ink">2.5h</p>
                <div className="mt-4 h-2 rounded-full bg-mist">
                  <div className="h-2 w-3/4 rounded-full bg-sage" />
                </div>
              </div>
              <div className="rounded-3xl border border-ink/10 bg-white p-5">
                <p className="text-sm font-semibold text-ink/50">Due soon</p>
                <p className="mt-3 text-3xl font-semibold text-ink">5</p>
                <div className="mt-4 flex gap-2">
                  <span className="h-2 flex-1 rounded-full bg-coral" />
                  <span className="h-2 flex-1 rounded-full bg-clay" />
                  <span className="h-2 flex-1 rounded-full bg-sage" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
