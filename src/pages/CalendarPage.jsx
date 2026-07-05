const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const blocks = [
  { day: "Mon", time: "9:00", title: "Operating Systems", tone: "bg-coral/20 text-coral" },
  { day: "Mon", time: "11:00", title: "Systems Lab", tone: "bg-ink text-white" },
  { day: "Tue", time: "10:30", title: "Spanish class", tone: "bg-sage/35 text-emerald-800" },
  { day: "Wed", time: "2:00", title: "Research block", tone: "bg-clay/30 text-amber-800" },
  { day: "Thu", time: "4:00", title: "Internship apps", tone: "bg-coral/20 text-coral" },
  { day: "Fri", time: "1:00", title: "Review + plan", tone: "bg-mist text-ink" },
];

export default function CalendarPage() {
  return (
    <section>
      <div className="mb-6">
        <p className="eyebrow">Calendar</p>
        <h2 className="section-title">Calendar</h2>
        <p className="section-copy mt-3">
          Your AI-generated schedule will live here.
        </p>
      </div>
      <div className="rounded-[1.75rem] border border-ink/10 bg-white p-4 shadow-card">
        <div className="grid min-w-[52rem] grid-cols-5 gap-3 overflow-x-auto">
          {days.map((day) => (
            <div key={day} className="rounded-2xl bg-mist p-3">
              <p className="mb-3 text-sm font-bold text-ink">{day}</p>
              <div className="space-y-3">
                {blocks
                  .filter((block) => block.day === day)
                  .map((block) => (
                    <div key={block.title} className={`rounded-2xl p-3 text-sm font-bold ${block.tone}`}>
                      <p className="text-xs opacity-70">{block.time}</p>
                      {block.title}
                    </div>
                  ))}
                <div className="rounded-2xl border border-dashed border-ink/10 bg-white/60 p-3 text-xs font-bold text-ink/35">
                  Open study window
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 rounded-[1.5rem] border border-coral/20 bg-white p-5 shadow-card">
        <p className="text-sm font-bold text-coral">Future integration</p>
        <p className="mt-2 text-sm leading-6 text-ink/65">
          Google Calendar and school calendar sync will be connected here later.
        </p>
      </div>
    </section>
  );
}
