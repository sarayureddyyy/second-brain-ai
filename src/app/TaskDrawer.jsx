import useModal from "./useModal.js";
import { useEffect, useState } from "react";
import { CheckCircle2, RotateCcw, Trash2, X } from "lucide-react";
import { useAppData } from "./AppDataContext.jsx";
import TaskFormFields from "./TaskFormFields.jsx";
import ConfirmDialog from "./ConfirmDialog.jsx";

export default function TaskDrawer() {
  const {
    folders,
    selectedTask,
    setSelectedTaskId,
    updateTask,
    deleteTask,
    completeTask,
    reopenTask,
  } = useAppData();
  const [draft, setDraft] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    setDraft(selectedTask ? { ...selectedTask } : null);
    setConfirmDelete(false);
  }, [selectedTask]);

  const modalRef = useModal(Boolean(selectedTask && draft), () => setSelectedTaskId(null));

  if (!selectedTask || !draft) return null;

  const save = (event) => {
    event.preventDefault();
    if (!draft.title.trim()) return;
    updateTask(selectedTask.id, {
      ...draft,
      title: draft.title.trim(),
      completedAt: draft.status === "completed" ? (draft.completedAt || new Date().toISOString()) : undefined,
      storyPoints: Number(draft.storyPoints || 0),
    });
    setSelectedTaskId(null);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-[2px]"
        onClick={() => setSelectedTaskId(null)}
      />
      <form onSubmit={save} ref={modalRef} role="dialog" aria-modal="true" aria-label="Edit task" tabIndex={-1} className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-xl animate-[drawer-in_220ms_ease-out] overflow-y-auto border-l border-ink/10 bg-paper p-6 shadow-soft">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Task details</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Edit task
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close task details"
            onClick={() => setSelectedTaskId(null)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-sm"
          >
            <X size={18} />
          </button>
        </div>

        <TaskFormFields
          value={draft}
          onChange={setDraft}
          folders={folders}
          includeStatus
          includeSubtasks
        />

        <div className="mt-6 grid gap-2 sm:grid-cols-3">
          <button
            type="submit"
            className="rounded-full bg-coral px-4 py-3 text-sm font-bold text-white shadow-card"
          >
            Save Changes
          </button>
          {selectedTask.status === "completed" ? (
            <button
              type="button"
              onClick={() => {
                reopenTask(selectedTask.id);
                setSelectedTaskId(null);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-3 text-sm font-bold text-ink"
            >
              <RotateCcw size={16} />
              Reopen
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                completeTask(selectedTask.id);
                setSelectedTaskId(null);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-3 text-sm font-bold text-ink"
            >
              <CheckCircle2 size={16} />
              Mark Complete
            </button>
          )}
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-coral/20 bg-white px-4 py-3 text-sm font-bold text-coral"
          >
            <Trash2 size={16} />
            Delete Task
          </button>
        </div>
      </form>

      <ConfirmDialog
        title={confirmDelete ? "Delete this task?" : ""}
        message="This task will be removed from local storage."
        confirmLabel="Delete task"
        onCancel={() => setConfirmDelete(false)}
        onConfirm={() => { setConfirmDelete(false); deleteTask(selectedTask.id); }}
      />
    </>
  );
}
