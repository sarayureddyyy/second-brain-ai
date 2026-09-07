import { Plus } from "lucide-react";
import EmptyColumnState from "./EmptyColumnState.jsx";
import TaskCard from "./TaskCard.jsx";

export default function TaskColumn({
  title,
  color,
  tasks,
  folder,
  folderMap,
  completed,
  onAddTask,
  onOpenTask,
  onCompleteTask,
  onReopenTask,
}) {
  return (
    <section className="flex min-h-[34rem] w-80 shrink-0 flex-col rounded-[1.5rem] border border-ink/10 bg-white/72 p-3 shadow-card backdrop-blur">
      <div className="flex items-center justify-between gap-3 px-1 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className={`h-3 w-3 shrink-0 rounded-full ${color}`} />
          <h2 className="truncate text-sm font-bold text-ink">{title}</h2>
        </div>
        <span className="rounded-full bg-mist px-2 py-0.5 text-xs font-bold text-ink/50">
          {tasks.length}
        </span>
      </div>
      <div className="mt-2 grid flex-1 content-start gap-3">
        {tasks.length === 0 ? (
          completed ? <p className="p-4 text-sm text-ink/65">No completed tasks yet.</p> : <EmptyColumnState onAddTask={onAddTask} />
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              folder={folderMap?.[task.folderId] || folder}
              onOpen={onOpenTask}
              onComplete={onCompleteTask}
              onReopen={onReopenTask}
            />
          ))
        )}
      </div>
      {!completed ? (
        <button
          type="button"
          onClick={onAddTask}
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/15 bg-white/60 px-4 py-3 text-sm font-bold text-ink/55 transition hover:border-coral hover:text-coral"
        >
          <Plus size={16} />
          New task
        </button>
      ) : null}
    </section>
  );
}
