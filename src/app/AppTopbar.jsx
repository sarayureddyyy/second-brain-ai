import { Bell, Plus } from "lucide-react";
import { useAppData } from "./AppDataContext.jsx";
import SearchAndFilters from "./SearchAndFilters.jsx";

export default function AppTopbar({ title = "Dashboard" }) {
  const { setNewTaskDefaults } = useAppData();

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/90 px-4 py-4 backdrop-blur-xl sm:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral">
            Second Brain AI
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {title}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SearchAndFilters />
          <button className="flex h-10 w-10 items-center justify-center rounded-2xl border border-ink/10 bg-white text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-coral">
            <Bell size={17} />
          </button>
          <button
            type="button"
            onClick={() => setNewTaskDefaults({})}
            className="inline-flex items-center gap-2 rounded-2xl bg-coral px-4 py-2.5 text-sm font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-ink"
          >
            <Plus size={17} />
            New Task
          </button>
        </div>
      </div>
    </header>
  );
}
