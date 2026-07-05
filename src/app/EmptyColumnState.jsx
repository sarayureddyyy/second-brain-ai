import { Plus } from "lucide-react";

export default function EmptyColumnState({ onAddTask }) {
  return (
    <div className="rounded-2xl border border-dashed border-ink/12 bg-white/60 p-5 text-center">
      <p className="text-sm font-bold text-ink/55">No tasks yet</p>
      <button
        type="button"
        onClick={onAddTask}
        className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-mist px-4 py-2 text-xs font-bold text-ink/55 transition hover:text-coral"
      >
        <Plus size={14} />
        Add your first task
      </button>
    </div>
  );
}
