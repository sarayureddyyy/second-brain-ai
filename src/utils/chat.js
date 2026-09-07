import { addDays, localDateKey, timeLabel, validEvent } from "./calendar.js";

export function chatReply(message, { tasks = [], events = [], now = new Date() } = {}) {
  const query = message.trim().toLowerCase();
  const active = tasks.filter(task => task && typeof task.title === "string" && task.status !== "completed");
  const tomorrow = /\btomorrow\b/.test(query);
  const day = localDateKey(tomorrow ? addDays(now, 1) : now);
  const dayLabel = tomorrow ? "tomorrow" : "today";
  const board = { label: "Open task board", href: "/app/dashboard" };
  const calendar = { label: "Open calendar", href: "/app/calendar" };
  if (/\b(add|create|delete|remove|move|reschedule|edit|complete)\b/.test(query)) {
    const isCalendar = /\b(calendar|block|schedule|meeting|event)\b/.test(query);
    return { text: isCalendar ? "Open the calendar and choose Add time block, or select an existing block to edit it. I haven’t changed your schedule." : "Open your task board and choose New Task, or select an existing task to edit it. I haven’t changed your tasks.", action: isCalendar ? calendar : board };
  }
  if (/\b(schedule|calendar|blocks|time blocks)\b/.test(query)) {
    const blocks = events.filter(validEvent).filter(event => event.date === day).sort((a, b) => a.start.localeCompare(b.start));
    return { text: blocks.length ? `Here are your time blocks for ${dayLabel}:\n\n${blocks.map(event => `${timeLabel(event.start)}–${timeLabel(event.end)} · ${event.title}`).join("\n")}` : `You have no time blocks saved for ${dayLabel}. Choose an empty hour in the calendar to plan some time.`, action: calendar };
  }
  if (/\b(due|deadline|deadlines|today|tomorrow|overdue)\b/.test(query)) {
    const overdue = /\boverdue\b/.test(query);
    const matches = active.filter(task => overdue ? task.dueDate && task.dueDate < day : task.dueDate === day);
    return { text: matches.length ? `${overdue ? "Overdue tasks" : `Tasks due ${dayLabel}`}:\n\n${matches.map(task => `• ${task.title}${overdue ? ` (${task.dueDate})` : ""}`).join("\n")}` : `No active tasks ${overdue ? "are overdue" : `are due ${dayLabel}`} in this browser.`, action: board };
  }
  if (/\b(priority|priorities|first|next|focus|tasks|task)\b/.test(query)) {
    const rank = { High: 0, Medium: 1, Low: 2 };
    const sorted = [...active].sort((a, b) => (a.dueDate || "9999").localeCompare(b.dueDate || "9999") || (rank[a.priority] ?? 3) - (rank[b.priority] ?? 3));
    return { text: sorted.length ? `Here are up to three tasks to consider, sorted by due date, then priority:\n\n${sorted.slice(0, 3).map((task, index) => `${index + 1}. ${task.title} · ${task.priority || "No priority"}${task.dueDate ? ` · due ${task.dueDate}` : ""}`).join("\n")}` : "Your task board is clear! Add a task whenever you’re ready.", action: board };
  }
  if (/^(hi|hello|hey|thanks|thank you)[!.\s]*$/.test(query)) return { text: "Hi! I’m here to help you find your next step. Ask what’s due today, what to focus on, or what’s on your schedule." };
  return { text: "I’m a local workspace helper, so I can show task deadlines, suggest a next task using due dates and priority, and list today’s or tomorrow’s time blocks. Try one of the suggestions below. Open-ended AI chat isn’t connected yet." };
}
