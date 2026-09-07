import SubtaskList from "./SubtaskList.jsx";

export default function TaskFormFields({ value, onChange, folders, includeStatus = false, includeSubtasks = false }) {
  const update = (patch) => onChange({ ...value, ...patch });

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm font-bold text-ink/70">Task title</span>
        <input
          required
          pattern=".*\S.*"
          title="Enter a task title, not just spaces."
          data-initial-focus
          value={value.title || ""}
          onChange={(event) => update({ title: event.target.value })}
          className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-coral focus:ring-4 focus:ring-coral/15"
        />
      </label>
      <label className="block">
        <span className="text-sm font-bold text-ink/70">Description</span>
        <textarea
          value={value.description || ""}
          onChange={(event) => update({ description: event.target.value })}
          rows={3}
          className="mt-2 w-full resize-none rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-coral focus:ring-4 focus:ring-coral/15"
        />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold text-ink/70">Folder / class</span>
          <select
            value={value.folderId || "inbox"}
            onChange={(event) => update({ folderId: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-bold outline-none"
          >
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </label>
        {includeStatus ? (
          <label className="block">
            <span className="text-sm font-bold text-ink/70">Status</span>
            <select
              value={value.status || "active"}
              onChange={(event) => update({ status: event.target.value })}
              className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-bold outline-none"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </label>
        ) : null}
        <label className="block">
          <span className="text-sm font-bold text-ink/70">Priority</span>
          <select
            value={value.priority || "Medium"}
            onChange={(event) => update({ priority: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-bold outline-none"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-bold text-ink/70">Due date</span>
          <input
            type="date"
            value={value.dueDate || ""}
            onChange={(event) => update({ dueDate: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-bold outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-bold text-ink/70">Estimated time</span>
          <input
            value={value.estimate || ""}
            onChange={(event) => update({ estimate: event.target.value })}
            placeholder="30m"
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-bold outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-bold text-ink/70">Story points</span>
          <input
            type="number"
            min="0"
            value={value.storyPoints ?? 1}
            onChange={(event) => update({ storyPoints: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-bold outline-none"
          />
        </label>
      </div>
      {includeSubtasks ? (
        <SubtaskList
          subtasks={value.subtasks || []}
          onChange={(subtasks) => update({ subtasks })}
        />
      ) : null}
      <label className="block">
        <span className="text-sm font-bold text-ink/70">Notes</span>
        <textarea
          value={value.notes || ""}
          onChange={(event) => update({ notes: event.target.value })}
          rows={3}
          className="mt-2 w-full resize-none rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-coral focus:ring-4 focus:ring-coral/15"
        />
      </label>
    </div>
  );
}
