import { localDateKey } from "./dates.js";

export function addDays(date, count) {
  const next = new Date(date);
  next.setDate(next.getDate() + count);
  return next;
}

export function startOfWeek(date) {
  return addDays(date, -(date.getDay() + 6) % 7);
}

export function monthDays(date) {
  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  const start = startOfWeek(first);
  return Array.from({ length: 42 }, (_, index) => addDays(start, index));
}

export function moveDate(date, view, direction) {
  if (view !== "month") return addDays(date, direction * (view === "week" ? 7 : 1));
  const next = new Date(date.getFullYear(), date.getMonth() + direction, 1);
  const last = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate();
  next.setDate(Math.min(date.getDate(), last));
  return next;
}

export function minutes(time) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

export function timeLabel(time) {
  const [hour, minute] = time.split(":").map(Number);
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;
}

// Assign simultaneous events separate lanes; touching endpoints do not overlap.
export function layoutEvents(events) {
  const sorted = [...events].sort((a, b) => minutes(a.start) - minutes(b.start) || minutes(b.end) - minutes(a.end));
  const result = [];
  let group = [];
  let end = -1;
  const flush = () => {
    const lanes = [];
    const placed = group.map(event => {
      let lane = lanes.findIndex(until => until <= minutes(event.start));
      if (lane < 0) lane = lanes.length;
      lanes[lane] = minutes(event.end);
      return { ...event, lane };
    });
    result.push(...placed.map(event => ({ ...event, lanes: lanes.length })));
    group = [];
  };
  for (const event of sorted) {
    if (minutes(event.start) >= end) flush();
    group.push(event);
    end = Math.max(minutes(event.end), group.length === 1 ? -1 : end);
  }
  flush();
  return result;
}

export function validEvent(event) {
  return event && typeof event.id === "string" && typeof event.title === "string" && event.title.trim()
    && /^\d{4}-\d{2}-\d{2}$/.test(event.date)
    && /^([01]\d|2[0-3]):[0-5]\d$/.test(event.start)
    && /^([01]\d|2[0-3]):[0-5]\d$/.test(event.end)
    && minutes(event.end) > minutes(event.start);
}

export const dateFromKey = key => new Date(`${key}T12:00:00`);
export { localDateKey };
