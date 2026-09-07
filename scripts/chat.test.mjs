import test from "node:test";
import assert from "node:assert/strict";
import { chatReply } from "../src/utils/chat.js";

const context = {
  now: new Date(2026, 8, 6, 12),
  tasks: [
    { title: "Write essay", status: "active", dueDate: "2026-09-06", priority: "High" },
    { title: "Done task", status: "completed", dueDate: "2026-09-06", priority: "High" },
    { title: "Read chapter", status: "active", dueDate: "2026-09-07", priority: "Medium" },
  ],
  events: [{ id: "study", title: "Spanish review", date: "2026-09-07", start: "10:00", end: "11:00" }],
};
test("deadline replies use local dates and exclude completed tasks", () => {
  const reply = chatReply("What’s due today?", context);
  assert.match(reply.text, /Write essay/);
  assert.doesNotMatch(reply.text, /Done task|Read chapter/);
});
test("schedule replies support tomorrow and actual stored time blocks", () => {
  assert.match(chatReply("Show my schedule tomorrow", context).text, /10:00 AM–11:00 AM · Spanish review/);
  assert.match(chatReply("Show my schedule", context).text, /no time blocks/);
});
test("requests to change data are routed without claiming a mutation", () => {
  const before = JSON.stringify(context);
  const reply = chatReply("Delete my task", context);
  assert.match(reply.text, /haven’t changed/);
  assert.equal(JSON.stringify(context), before);
});
test("unsupported questions disclose the local helper limitation", () => {
  assert.match(chatReply("What is the weather?", context).text, /AI chat isn’t connected/);
});
