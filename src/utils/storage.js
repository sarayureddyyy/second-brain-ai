export function readStorage(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    if (!value) return fallback;
    const parsed = JSON.parse(value);
    if (parsed === null || typeof parsed !== typeof fallback) return fallback;
    if (Array.isArray(fallback)) return Array.isArray(parsed) ? parsed : fallback;
    if (typeof fallback === "object") {
      if (Array.isArray(parsed)) return fallback;
      return Object.fromEntries(Object.entries(fallback).map(([field, defaultValue]) => [
        field, typeof parsed[field] === typeof defaultValue ? parsed[field] : defaultValue,
      ]));
    }
    return parsed;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // TODO: Replace local persistence with database writes, likely Supabase.
  }
}
