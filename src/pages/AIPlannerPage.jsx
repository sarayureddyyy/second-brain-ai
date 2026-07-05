import { CalendarClock, ListChecks, Puzzle, Sparkles } from "lucide-react";

const features = [
  { title: "Prioritize my day", icon: ListChecks },
  { title: "Build my weekly plan", icon: CalendarClock },
  { title: "Break down assignments", icon: Puzzle },
  { title: "Reschedule missed tasks", icon: Sparkles },
];

export default function AIPlannerPage() {
  return (
    <section>
      <div className="rounded-[2rem] bg-ink p-8 text-white shadow-soft">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-coral">
          AI Planner
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight">
          AI Planner coming soon
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/65">
          This will become the planning layer that turns classes, deadlines, and
          available time into realistic next actions.
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-[1.5rem] border border-ink/10 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-coral/40"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-coral">
              <feature.icon size={23} />
            </span>
            <h3 className="mt-5 text-lg font-bold text-ink">{feature.title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/60">
              Placeholder for the private-beta AI workflow.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
