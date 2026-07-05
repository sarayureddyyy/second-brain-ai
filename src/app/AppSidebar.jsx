import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Home,
  Inbox,
  Settings,
  Sparkles,
} from "lucide-react";
import FolderManager from "./FolderManager.jsx";

const navItems = [
  { label: "Dashboard", href: "/app/dashboard", icon: Home, active: "/app/dashboard" },
  { label: "Inbox", href: "/app/dashboard", icon: Inbox },
  { label: "Calendar", href: "/app/calendar", icon: CalendarDays },
  { label: "AI Planner", href: "/app/ai-planner", icon: Sparkles },
  { label: "Analytics", href: "/app/dashboard", icon: BarChart3 },
  { label: "Settings", href: "/app/settings", icon: Settings },
];

export default function AppSidebar({ collapsed, setCollapsed }) {
  const location = useLocation();

  return (
    <aside
      className={`sticky top-0 hidden h-screen shrink-0 border-r border-ink/10 bg-white/86 p-4 backdrop-blur-xl transition-all duration-300 lg:flex lg:flex-col ${
        collapsed ? "w-24" : "w-72"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-ink text-white">
            <GraduationCap size={21} />
          </span>
          {!collapsed ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-ink">Second Brain AI</p>
              <p className="text-xs font-semibold text-ink/45">Private beta</p>
            </div>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-mist text-ink transition hover:border-coral hover:text-coral"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
        </button>
      </div>

      <nav className="mt-8 grid gap-1">
        {navItems.map((item) => {
          const isActive = item.active
            ? location.pathname === item.active
            : location.pathname === item.href && item.href !== "/app/dashboard";

          return (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold transition ${
                isActive
                  ? "bg-coral text-white shadow-card"
                  : "text-ink/58 hover:bg-mist hover:text-ink"
              }`}
            >
              <item.icon size={18} className="shrink-0" />
              {!collapsed ? <span>{item.label}</span> : null}
            </Link>
          );
        })}
      </nav>

      <FolderManager collapsed={collapsed} />

      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-ink/10 bg-mist p-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
          SR
        </span>
        {!collapsed ? (
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-ink">Sarayu Reddy</p>
            <p className="text-xs font-semibold text-ink/50">Private Beta</p>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
