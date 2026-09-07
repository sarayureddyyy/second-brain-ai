import test from "node:test";
import assert from "node:assert/strict";
import { monthDays, moveDate, layoutEvents, validEvent, localDateKey, startOfWeek } from "../src/utils/calendar.js";

test("month grid includes leap day and all six weeks", () => {
  const days = monthDays(new Date(2024, 1, 1));
  assert.equal(days.length, 42);
  assert.equal(days[0].getDay(), 1);
  assert.ok(days.some(day => localDateKey(day) === "2024-02-29"));
  assert.equal(localDateKey(startOfWeek(new Date(2026, 8, 6))), "2026-08-31");
});
test("navigation clamps month ends and crosses years", () => {
  assert.equal(localDateKey(moveDate(new Date(2026, 0, 31), "month", 1)), "2026-02-28");
  assert.equal(localDateKey(moveDate(new Date(2026, 11, 31), "day", 1)), "2027-01-01");
  assert.equal(localDateKey(moveDate(new Date(2026, 0, 1), "week", -1)), "2025-12-25");
});
test("overlapping blocks get separate lanes; adjacent blocks reuse space", () => {
  const events = layoutEvents([{ id: "a", start: "09:00", end: "10:00" }, { id: "b", start: "09:30", end: "11:00" }, { id: "c", start: "11:00", end: "12:00" }]);
  assert.equal(events[0].lanes, 2);
  assert.notEqual(events[0].lane, events[1].lane);
  assert.equal(events[2].lanes, 1);
});
test("invalid saved blocks cannot break hourly positioning", () => {
  const event = { id: "a", title: "Study", date: "2026-09-07", start: "09:00", end: "10:00" };
  assert.ok(validEvent(event));
  assert.ok(!validEvent({ ...event, end: "08:00" }));
  assert.ok(!validEvent({ ...event, start: "27:00" }));
  assert.ok(!validEvent(null));
});
