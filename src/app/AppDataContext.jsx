import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { defaultFilters, defaultFolders } from "./defaultData.js";
import { readStorage, writeStorage } from "../utils/storage.js";

const baseKeys = {
  tasks: "second-brain-ai.tasks.v2",
  folders: "second-brain-ai.folders.v2",
  filters: "second-brain-ai.filters.v2",
  sidebarCollapsed: "second-brain-ai.sidebar-collapsed.v2",
};

const AppDataContext = createContext(null);

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function AppDataProvider({ children, userId }) {
  const keys = useMemo(() => Object.fromEntries(Object.entries(baseKeys).map(([name, key]) => [name, `${key}.${userId}`])), [userId]);
  const [tasks, setTasks] = useState(() => readStorage(keys.tasks, []));
  const [folders, setFolders] = useState(() => readStorage(keys.folders, [defaultFolders[0]]));
  const [filters, setFilters] = useState(() => readStorage(keys.filters, defaultFilters));
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() =>
    readStorage(keys.sidebarCollapsed, false),
  );
  const [newTaskDefaults, setNewTaskDefaults] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [feedback, setFeedback] = useState("");
  const feedbackTimer = useRef(null);
  useEffect(() => () => window.clearTimeout(feedbackTimer.current), []);

  useEffect(() => writeStorage(keys.tasks, tasks), [tasks]);
  useEffect(() => writeStorage(keys.folders, folders), [folders]);
  useEffect(() => writeStorage(keys.filters, filters), [filters]);
  useEffect(() => writeStorage(keys.sidebarCollapsed, sidebarCollapsed), [sidebarCollapsed]);

  const showFeedback = (message) => {
    setFeedback(message);
    window.clearTimeout(feedbackTimer.current);
    feedbackTimer.current = window.setTimeout(() => setFeedback(""), 3000);
  };

  const folderMap = useMemo(
    () => Object.fromEntries(folders.map((folder) => [folder.id, folder])),
    [folders],
  );

  const selectedTask = tasks.find((task) => task.id === selectedTaskId) || null;

  const updateFilters = (patch) => setFilters((current) => ({ ...current, ...patch }));
  const clearFilters = () => setFilters(defaultFilters);

  const addTask = (taskInput) => {
    if (!taskInput.title?.trim()) return;
    const folderId = taskInput.folderId || "inbox";
    const nextTask = {
      id: makeId("task"),
      title: taskInput.title.trim(),
      description: taskInput.description || "",
      folderId,
      status: "active",
      priority: taskInput.priority || "Medium",
      dueDate: taskInput.dueDate || "",
      estimate: taskInput.estimate || "30m",
      storyPoints: Number(taskInput.storyPoints ?? 1),
      notes: taskInput.notes || "",
      subtasks: taskInput.subtasks || [],
      createdAt: new Date().toISOString(),
    };
    // TODO: Replace local mutation with database insert.
    setTasks((current) => [nextTask, ...current]);
    showFeedback("Task added");
  };

  const updateTask = (taskId, patch) => {
    // TODO: Replace local mutation with database update.
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, ...patch } : task)),
    );
    showFeedback("Task updated");
  };

  const deleteTask = (taskId) => {
    // TODO: Replace local mutation with database delete.
    setTasks((current) => current.filter((task) => task.id !== taskId));
    setSelectedTaskId(null);
    showFeedback("Task deleted");
  };

  const completeTask = (taskId) => {
    updateTask(taskId, {
      status: "completed",
      completedAt: new Date().toISOString(),
    });
  };

  const reopenTask = (taskId) => {
    updateTask(taskId, {
      status: "active",
      completedAt: undefined,
    });
  };

  const addFolder = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setFolders((current) => [
      ...current,
      {
        id: makeId("folder"),
        name: trimmed,
        color: "bg-violet-400",
      },
    ]);
    showFeedback("Folder added");
  };

  const renameFolder = (folderId, name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setFolders((current) =>
      current.map((folder) =>
        folder.id === folderId ? { ...folder, name: trimmed } : folder,
      ),
    );
    showFeedback("Folder renamed");
  };

  const deleteFolder = (folderId) => {
    if (folderId === "inbox") return;
    setFilters(current => current.folderId === folderId ? { ...current, folderId: "All" } : current);
    setFolders((current) => current.filter((folder) => folder.id !== folderId));
    setTasks((current) =>
      current.map((task) =>
        task.folderId === folderId ? { ...task, folderId: "inbox" } : task,
      ),
    );
    showFeedback("Folder deleted; tasks moved to Inbox");
  };

  const taskCounts = useMemo(() => {
    return tasks.reduce((counts, task) => {
      if (task.status !== "completed") {
        counts[task.folderId] = (counts[task.folderId] || 0) + 1;
      }
      return counts;
    }, {});
  }, [tasks]);

  const value = {
    tasks,
    folders,
    folderMap,
    filters,
    feedback,
    selectedTask,
    newTaskDefaults,
    sidebarCollapsed,
    taskCounts,
    setSidebarCollapsed,
    setSelectedTaskId,
    setNewTaskDefaults,
    updateFilters,
    clearFilters,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
    reopenTask,
    addFolder,
    renameFolder,
    deleteFolder,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within AppDataProvider");
  }
  return context;
}
