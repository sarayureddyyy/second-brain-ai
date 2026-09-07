import { Plus, Trash2 } from "lucide-react";

export default function SubtaskList({ subtasks = [], onChange }) {
  const addSubtask = () => {
    onChange([
      ...subtasks,
      {
        id: `subtask-${Date.now()}`,
        title: "",
        completed: false,
      },
    ]);
  };

  const updateSubtask = (id, patch) => {
    onChange(subtasks.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const deleteSubtask = (id) => {
    onChange(subtasks.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-bold text-ink/70">Subtasks</p>
        <button
          type="button"
          onClick={addSubtask}
          className="inline-flex items-center gap-1 rounded-full bg-mist px-3 py-1.5 text-xs font-bold text-ink/60 hover:text-coral"
        >
          <Plus size={13} />
          Add
        </button>
      </div>
      <div className="grid gap-2">
        {subtasks.length === 0 ? (
          <p className="rounded-2xl bg-mist px-3 py-3 text-sm font-semibold text-ink/45">
            No subtasks yet.
          </p>
        ) : null}
        {subtasks.map((subtask) => (
          <div key={subtask.id} className="flex items-center gap-2 rounded-2xl border border-ink/10 bg-white p-2">
            <input
              type="checkbox"
              aria-label={`Complete subtask ${subtask.title || "Untitled"}`}
              checked={subtask.completed}
              onChange={(event) => updateSubtask(subtask.id, { completed: event.target.checked })}
              className="h-4 w-4 accent-coral"
            />
            <input
              aria-label="Subtask title"
              value={subtask.title}
              onChange={(event) => updateSubtask(subtask.id, { title: event.target.value })}
              placeholder="Subtask"
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none"
            />
            <button
              type="button"
              aria-label={`Delete subtask ${subtask.title || "Untitled"}`}
              onClick={() => deleteSubtask(subtask.id)}
              className="text-ink/35 hover:text-coral"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
