export default function ConfirmDialog({ title, message, confirmLabel = "Delete", onConfirm, onCancel }) {
  if (!title) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-[1.5rem] border border-ink/10 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-bold text-ink">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-ink/65">{message}</p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-bold text-ink"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-coral px-4 py-2 text-sm font-bold text-white"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
