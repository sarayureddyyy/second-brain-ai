import { NavLink, Outlet, useLocation } from "react-router-dom";
import { CalendarDays, Home, Settings, Sparkles } from "lucide-react";
import { AppDataProvider, useAppData } from "./AppDataContext.jsx";
import AppSidebar from "./AppSidebar.jsx";
import AppTopbar from "./AppTopbar.jsx";
import NewTaskModal from "./NewTaskModal.jsx";
import TaskDrawer from "./TaskDrawer.jsx";

const titles = {
  "/app": "Dashboard",
  "/app/dashboard": "Dashboard",
  "/app/calendar": "Calendar",
  "/app/ai-planner": "AI Planner",
  "/app/settings": "Settings",
};

const mobileNav = [
  { label: "Dashboard", href: "/app/dashboard", icon: Home },
  { label: "Calendar", href: "/app/calendar", icon: CalendarDays },
  { label: "AI Planner", href: "/app/ai-planner", icon: Sparkles },
  { label: "Settings", href: "/app/settings", icon: Settings },
];

function AppLayoutContent() {
  const { sidebarCollapsed, setSidebarCollapsed, feedback } = useAppData();
  const location = useLocation();
  const title = titles[location.pathname] || "Dashboard";

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="flex">
        <AppSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <div className="min-w-0 flex-1">
          <AppTopbar title={title} />
          <nav className="flex gap-2 overflow-x-auto border-b border-ink/10 bg-white/70 px-4 py-3 lg:hidden">
            {mobileNav.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
                    isActive ? "bg-coral text-white" : "bg-mist text-ink/65"
                  }`
                }
              >
                <item.icon size={16} />
                {item.label}
              </NavLink>
            ))}
          </nav>
          <main className="p-4 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
      <NewTaskModal />
      <TaskDrawer />
      {feedback ? (
        <div role="status" className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white shadow-soft">
          {feedback}
        </div>
      ) : null}
    </div>
  );
}

export default function AppLayout() {
  return (
    <AppDataProvider>
      <AppLayoutContent />
    </AppDataProvider>
  );
}
