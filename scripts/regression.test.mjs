import test from "node:test";
import assert from "node:assert/strict";
import { localDateKey } from "../src/utils/dates.js";
import { readStorage } from "../src/utils/storage.js";
import worker from "../worker/index.js";

test("dates use the local calendar day, including late evenings", () => {
  process.env.TZ = "America/New_York";
  assert.equal(localDateKey(new Date("2026-09-07T02:30:00Z")), "2026-09-06");
  assert.equal(localDateKey(new Date("2026-01-01T02:00:00Z")), "2025-12-31");
});

test("storage recovers from null, malformed JSON and incomplete filters", () => {
  let value = "null";
  globalThis.window = { localStorage: { getItem: () => value } };
  const fallback = { search: "", priority: "All" };
  assert.deepEqual(readStorage("filters", fallback), fallback);
  value = "{";
  assert.deepEqual(readStorage("filters", fallback), fallback);
  value = '{"search":null,"priority":"High"}';
  assert.deepEqual(readStorage("filters", fallback), { search: "", priority: "High" });
  value = '{}';
  assert.deepEqual(readStorage("tasks", []), []);
  value = 'false';
  assert.equal(readStorage("collapsed", true), false);
});

test("direct app routes serve the SPA while missing assets remain 404", async () => {
  const env = { ASSETS: { fetch: async request => new Response("asset", { status: new URL(request.url).pathname === "/" ? 200 : 404 }) } };
  assert.equal((await worker.fetch(new Request("https://example.test/app/dashboard", { headers: { accept: "text/html" } }), env)).status, 200);
  assert.equal((await worker.fetch(new Request("https://example.test/missing.js"), env)).status, 404);
});
