import { localDateKey } from "../utils/dates.js";
import { useMemo } from "react";
import { useAppData } from "./AppDataContext.jsx";
import TaskColumn from "./TaskColumn.jsx";

function taskMatchesFilters(task, folder, filters) {
  if (filters.priority !== "All" && task.priority !== filters.priority) return false;
  if (filters.folderId !== "All" && task.folderId !== filters.folderId) return false;
  if (filters.status !== "All" && task.status !== filters.status) return false;

  const query = filters.search.trim().toLowerCase();
  if (!query) return true;

  return [task.title, task.description, folder?.name, task.notes]
    .filter(Boolean)
    .some((value) => value.toLowerCase().includes(query));
}

export default function TaskBoard() {
  const {
    tasks,
    folders,
    folderMap,
    filters,
    clearFilters,
    setNewTaskDefaults,
    setSelectedTaskId,
    completeTask,
    reopenTask,
  } = useAppData();

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => taskMatchesFilters(task, folderMap[task.folderId], filters)),
    [tasks, folderMap, filters],
  );

  const activeTaskCount = tasks.filter((task) => task.status !== "completed").length;
  const completedCount = tasks.filter((task) => task.status === "completed").length;
  const dueTodayCount = tasks.filter(
    (task) => task.status !== "completed" && task.dueDate === localDateKey(),
  ).length;

  const visibleFolders = folders.filter((folder) => {
    if (filters.status === "completed") return false;
    if (filters.folderId !== "All") return folder.id === filters.folderId;
    if (folder.id === "inbox") {
      return filteredTasks.some((task) => task.folderId === "inbox");
    }
    return true;
  });

  return (
    <div>
      <div className="mb-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-card">
          <p className="text-sm font-bold text-ink/45">Active tasks</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">{activeTaskCount}</p>
        </div>
        <div className="rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-card">
          <p className="text-sm font-bold text-ink/45">Due today</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">{dueTodayCount}</p>
        </div>
        <div className="rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-card">
          <p className="text-sm font-bold text-ink/45">Completed</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">{completedCount}</p>
        </div>
      </div>

      {filteredTasks.length === 0 && (filters.search || filters.priority !== "All" || filters.folderId !== "All" || filters.status !== "All") ? (
        <div role="status" className="mb-4 rounded-2xl border border-ink/10 bg-white p-5">
          <p className="text-sm font-semibold">No tasks match your filters.</p>
          <button type="button" onClick={clearFilters} className="mt-3 text-sm font-bold underline">Clear filters</button>
        </div>
      ) : null}
      <div className="overflow-x-auto pb-4">
        <div className="flex min-w-max gap-4">
          {visibleFolders.map((folder) => (
            <TaskColumn
              key={folder.id}
              title={folder.name}
              color={folder.color}
              folder={folder}
              tasks={filteredTasks.filter(
                (task) => task.folderId === folder.id && task.status !== "completed",
              )}
              onAddTask={() => setNewTaskDefaults({ folderId: folder.id })}
              onOpenTask={setSelectedTaskId}
              onCompleteTask={completeTask}
              onReopenTask={reopenTask}
            />
          ))}
          {filters.status !== "active" && <TaskColumn
            title="Completed"
            color="bg-emerald-500"
            completed
            folder={{ name: "Completed" }}
            folderMap={folderMap}
            tasks={filteredTasks.filter((task) => task.status === "completed")}
            onAddTask={() => setNewTaskDefaults({})}
            onOpenTask={setSelectedTaskId}
            onCompleteTask={completeTask}
            onReopenTask={reopenTask}
          />}
        </div>
      </div>
    </div>
  );
}
