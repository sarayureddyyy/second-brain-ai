import { useEffect, useState } from "react";
import useModal from "./useModal.js";
import { X } from "lucide-react";
import { useAppData } from "./AppDataContext.jsx";
import TaskFormFields from "./TaskFormFields.jsx";

function blankTask(folderId = "inbox") {
  return {
    title: "",
    description: "",
    folderId,
    priority: "Medium",
    dueDate: "",
    estimate: "30m",
    storyPoints: 1,
    notes: "",
  };
}

export default function NewTaskModal() {
  const { folders, newTaskDefaults, setNewTaskDefaults, addTask } = useAppData();
  const [draft, setDraft] = useState(blankTask());

  useEffect(() => {
    if (newTaskDefaults) {
      setDraft(blankTask(newTaskDefaults.folderId || "inbox"));
    }
  }, [newTaskDefaults]);

  const modalRef = useModal(Boolean(newTaskDefaults), () => setNewTaskDefaults(null));

  if (!newTaskDefaults) return null;

  const submit = (event) => {
    event.preventDefault();
    if (!draft.title.trim()) return;
    addTask(draft);
    setNewTaskDefaults(null);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/30 p-4 backdrop-blur-sm">
      <form
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="New task"
        tabIndex={-1}
        onSubmit={submit}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-ink/10 bg-paper p-6 shadow-soft"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">New task</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Add work to your board.</h2>
          </div>
          <button
            type="button"
            aria-label="Close new task"
            onClick={() => setNewTaskDefaults(null)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-sm"
          >
            <X size={18} />
          </button>
        </div>
        <TaskFormFields value={draft} onChange={setDraft} folders={folders} />
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setNewTaskDefaults(null)}
            className="rounded-full border border-ink/10 bg-white px-5 py-2.5 text-sm font-bold text-ink"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-full bg-coral px-5 py-2.5 text-sm font-bold text-white shadow-card"
          >
            Save Task
          </button>
        </div>
      </form>
    </div>
  );
}
