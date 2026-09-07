import { localDateKey } from "../utils/dates.js";
import { CheckCircle2, Clock3 } from "lucide-react";

const priorityStyles = {
  High: "bg-coral/15 text-coral",
  Medium: "bg-clay/20 text-amber-800",
  Low: "bg-sage/30 text-emerald-800",
};

function isToday(dateValue) {
  if (!dateValue) return false;
  return dateValue === localDateKey();
}

function isOverdue(dateValue, status) {
  if (!dateValue || status === "completed") return false;
  return dateValue < localDateKey();
}

export default function TaskCard({ task, folder, onOpen, onComplete, onReopen }) {
  const completed = task.status === "completed";
  const totalSubtasks = task.subtasks?.length || 0;
  const completedSubtasks = task.subtasks?.filter((subtask) => subtask.completed).length || 0;
  const urgent = !completed && (isToday(task.dueDate) || isOverdue(task.dueDate, task.status));

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpen(task.id)}
      onKeyDown={(event) => {
        if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onOpen(task.id);
        }
      }}
      className={`group rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:border-coral/40 hover:shadow-card ${
        urgent ? "border-coral/40 ring-4 ring-coral/10" : "border-ink/10"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className={`break-words text-sm font-bold leading-5 text-ink ${completed ? "line-through opacity-60" : ""}`}>
          {task.title}
        </h3>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            completed ? onReopen(task.id) : onComplete(task.id);
          }}
          className={`rounded-full transition ${
            completed ? "text-emerald-600" : "text-ink/25 hover:text-emerald-600"
          }`}
          aria-label={completed ? `Reopen ${task.title}` : `Mark ${task.title} complete`}
        >
          <CheckCircle2 size={18} />
        </button>
      </div>
      {task.description ? (
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-ink/55">
          {task.description}
        </p>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-ink/45 ring-1 ring-ink/10">
          {folder?.name || "Inbox"}
        </span>
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${priorityStyles[task.priority] || priorityStyles.Low}`}>
          {task.priority}
        </span>
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
          urgent ? "bg-coral text-white" : "bg-mist text-ink/55"
        }`}>
          {task.dueDate || "No date"}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-mist px-2.5 py-1 text-xs font-bold text-ink/55">
          <Clock3 size={12} />
          {task.estimate}
        </span>
      </div>
      {totalSubtasks > 0 ? (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-bold text-ink/45">
            <span>Subtasks</span>
            <span>{completedSubtasks}/{totalSubtasks}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-mist">
            <div
              className="h-full rounded-full bg-sage"
              style={{ width: `${(completedSubtasks / totalSubtasks) * 100}%` }}
            />
          </div>
        </div>
      ) : null}
    </article>
  );
}
