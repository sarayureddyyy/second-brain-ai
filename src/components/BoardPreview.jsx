import { Check, Clock3, FolderPlus, GripVertical, Plus, Sparkles } from "lucide-react";

const folders = ["CS Classes", "Applications", "Extracurriculars", "Personal", "Finance"];

const columns = [
  {
    title: "To Do",
    tone: "bg-coral/12 text-coral",
    cards: [
      { title: "Finish Systems Lab", meta: "CS 2200", priority: "High" },
      { title: "Apply to internship", meta: "Summer 2027", priority: "AI pick" },
    ],
  },
  {
    title: "In Progress",
    tone: "bg-clay/18 text-amber-700",
    cards: [
      { title: "Build club website", meta: "Product club", priority: "2h block" },
      { title: "Study Spanish vocab", meta: "SPAN 2001", priority: "Tonight" },
    ],
  },
  {
    title: "Completed",
    tone: "bg-sage/25 text-emerald-800",
    cards: [{ title: "Pay credit card", meta: "Personal finance", priority: "Done", completed: true }],
  },
];

function TaskCard({ card }) {
  return (
    <article
      className={`group rounded-2xl border bg-white p-4 shadow-card transition duration-300 hover:-translate-y-1 hover:rotate-[0.4deg] hover:border-sage ${
        card.completed ? "border-sage/70 bg-mist/55" : "border-ink/10"
      }`}
    >
      <div className="flex items-start gap-3">
        <GripVertical size={17} className="mt-0.5 shrink-0 text-ink/25 transition group-hover:text-ink/40" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h4 className={`text-sm font-bold text-ink ${card.completed ? "line-through decoration-sage" : ""}`}>
              {card.title}
            </h4>
            {card.completed ? (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage text-white">
                <Check size={14} />
              </span>
            ) : null}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-mist px-2.5 py-1 font-semibold text-ink/60">{card.meta}</span>
            <span className="rounded-full bg-ink px-2.5 py-1 font-semibold text-white">{card.priority}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function BoardPreview() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-soft">
      <div className="flex flex-col border-b border-ink/10 bg-white/80 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-white">
            <Sparkles size={18} />
          </span>
          <div>
            <h3 className="font-bold text-ink">Semester Command Center</h3>
            <p className="text-sm text-ink/50">AI suggests the next move as work changes state.</p>
          </div>
        </div>
        <span className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-coral sm:mt-0">
          <Plus size={16} /> New Task
        </span>
      </div>
      <div className="grid lg:grid-cols-[15rem_1fr]">
        <aside className="border-b border-ink/10 bg-mist/55 p-5 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink/40">Folders</p>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink shadow-card transition hover:-translate-y-0.5">
              <FolderPlus size={15} />
            </span>
          </div>
          <div className="mt-4 space-y-2">
            {folders.map((folder, index) => (
              <span
                key={folder}
                className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-white ${
                  index === 0 ? "bg-white text-ink shadow-card" : "text-ink/60"
                }`}
              >
                {folder}
                <span className="h-2 w-2 rounded-full bg-sage" />
              </span>
            ))}
          </div>
          <span className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-dashed border-ink/20 bg-white/60 px-3 py-2.5 text-sm font-bold text-ink/60 transition hover:border-sage hover:text-ink">
            <Plus size={15} /> New Folder
          </span>
        </aside>
        <div className="bg-[#fbfaf7] p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-ink/60 shadow-card">
              <Clock3 size={15} className="text-coral" />
              Recommended next: Finish Systems Lab
            </div>
            <div className="rounded-full bg-sage/20 px-3 py-2 text-sm font-bold text-emerald-800">
              1 task moved to Completed
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {columns.map((column) => (
              <section key={column.title} className="min-h-[22rem] rounded-[1.5rem] border border-ink/10 bg-white/75 p-3">
                <div className="mb-3 flex items-center justify-between px-1">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${column.tone}`}>{column.title}</span>
                  <span className="text-xs font-bold text-ink/30">{column.cards.length}</span>
                </div>
                <div className="space-y-3">
                  {column.cards.map((card) => (
                    <TaskCard key={card.title} card={card} />
                  ))}
                  {column.title === "Completed" ? (
                    <div className="rounded-2xl border border-dashed border-sage/70 bg-sage/10 p-4 text-center text-sm font-semibold text-emerald-800">
                      Drop tasks here when done
                    </div>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
