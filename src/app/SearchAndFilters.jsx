import { Search, X } from "lucide-react";
import { useAppData } from "./AppDataContext.jsx";

export default function SearchAndFilters() {
  const { filters, folders, updateFilters, clearFilters } = useAppData();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <label className="relative w-full min-w-0 sm:w-72">
        <Search
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/35"
        />
        <input
          aria-label="Search tasks"
          value={filters.search}
          onChange={(event) => updateFilters({ search: event.target.value })}
          placeholder="Search tasks, folders, notes"
          className="w-full rounded-2xl border border-ink/10 bg-white py-2.5 pl-10 pr-4 text-sm font-semibold outline-none transition focus:border-coral focus:ring-4 focus:ring-coral/15"
        />
      </label>
      <select
        aria-label="Filter by priority"
        value={filters.priority}
        onChange={(event) => updateFilters({ priority: event.target.value })}
        className="rounded-2xl border border-ink/10 bg-white px-3 py-2.5 text-sm font-bold text-ink shadow-sm outline-none"
      >
        <option>All</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <select
        aria-label="Filter by folder"
        value={filters.folderId}
        onChange={(event) => updateFilters({ folderId: event.target.value })}
        className="rounded-2xl border border-ink/10 bg-white px-3 py-2.5 text-sm font-bold text-ink shadow-sm outline-none"
      >
        <option value="All">All folders</option>
        {folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            {folder.name}
          </option>
        ))}
      </select>
      <select
        aria-label="Filter by status"
        value={filters.status}
        onChange={(event) => updateFilters({ status: event.target.value })}
        className="rounded-2xl border border-ink/10 bg-white px-3 py-2.5 text-sm font-bold text-ink shadow-sm outline-none"
      >
        <option>All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
      <button
        type="button"
        onClick={clearFilters}
        className="inline-flex items-center gap-2 rounded-2xl border border-ink/10 bg-white px-3 py-2.5 text-sm font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-coral"
      >
        <X size={16} />
        Clear
      </button>
    </div>
  );
}
