import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  ArrowRight,
  BrainCircuit,
  CalendarClock,
  Check,
  CheckCircle2,
  ClipboardList,
  Compass,
  FolderKanban,
  FolderPlus,
  LineChart,
  Puzzle,
  Sparkles,
} from "lucide-react";
import FeatureCard from "./components/FeatureCard.jsx";
import DemoPage from "./components/demo/DemoPage.jsx";
import Hero from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import PlatformSection from "./components/PlatformSection.jsx";
import AppLayout from "./app/AppLayout.jsx";
import AIPlannerPage from "./pages/AIPlannerPage.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import FloatingChat from "./components/FloatingChat.jsx";
import { AuthProvider, RequireAuth } from "./auth/AuthContext.jsx";
import { BillingProvider, RequireSubscription } from "./billing/BillingContext.jsx";
import BillingPage from "./pages/BillingPage.jsx";

const features = [
  {
    icon: Sparkles,
    title: "AI task prioritization",
    description:
      "Turn scattered deadlines into a realistic next-action list based on due dates, effort, and your available time.",
  },
  {
    icon: CalendarClock,
    title: "Calendar time blocking",
    description:
      "Convert plans into focused study blocks, application sessions, and recovery time that fit your week.",
  },
  {
    icon: FolderKanban,
    title: "Class folder organization",
    description:
      "Keep syllabi, labs, assignments, clubs, applications, and life admin neatly grouped by context.",
  },
  {
    icon: LineChart,
    title: "Completion tracking",
    description:
      "See what is moving, what is stuck, and where your attention should go before things pile up.",
  },
];

const scatteredTools = [
  "Canvas/eLC",
  "Notion",
  "Emails",
  "Calendars",
  "Clubs",
  "Internships",
  "Personal life",
];

function ProblemSection() {
  return (
    <section id="problem" className="section-shell">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow">The student context problem</p>
          <h2 className="section-title">
            College work does not live in one tidy place.
          </h2>
          <p className="section-copy mt-5">
            Students are expected to keep up with class portals, planning apps,
            inboxes, calendars, club messages, internship deadlines, finances,
            and personal tasks. Second Brain AI brings those moving pieces into
            one calm workspace so the next priority is easier to see.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {scatteredTools.map((tool) => (
            <div
              key={tool}
              className="rounded-2xl border border-ink/10 bg-white/80 px-4 py-5 text-sm font-semibold text-ink shadow-card transition duration-300 hover:-translate-y-1 hover:border-sage/70"
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="section-shell">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Built for busy semesters</p>
        <h2 className="section-title">AI support that fits student life.</h2>
        <p className="section-copy mt-4">
          Keep planning lightweight while still getting the structure you need
          for classes, applications, clubs, and everything outside school.
        </p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: FolderPlus,
      title: "Add Everything",
      items: ["Classes", "Assignments", "Projects", "Personal tasks"],
      copy: "Bring everything into one organized workspace.",
    },
    {
      icon: BrainCircuit,
      title: "AI Builds Your Plan",
      items: ["Deadlines", "Workload", "Available time"],
      copy: "The AI prioritizes your work based on deadlines, workload, and available time.",
    },
    {
      icon: CalendarClock,
      title: "Follow Your Schedule",
      items: ["Study blocks", "Classes", "Breaks"],
      copy: "Your tasks are scheduled into realistic time blocks that adapt when plans change.",
    },
    {
      icon: CheckCircle2,
      title: "Get Things Done",
      items: ["To Do", "In Progress", "Completed"],
      copy: "Stay focused, track your progress, and keep moving forward.",
    },
  ];
  const benefits = [
    "Less planning",
    "Better focus",
    "Smarter scheduling",
    "More completed work",
  ];

  return (
    <section id="how-it-works" className="section-shell">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">How it works</p>
        <h2 className="section-title mx-auto">From overwhelmed to organized.</h2>
        <p className="section-copy mt-4">
          Second Brain AI turns your tasks into a clear, personalized plan - so
          you always know what to do next.
        </p>
      </div>
      <div className="mt-10">
        <p className="eyebrow text-center">The Process</p>
        <div className="relative mt-6 grid gap-5 md:grid-cols-4">
          <div className="absolute left-1/2 top-0 hidden h-0.5 w-[76%] -translate-x-1/2 bg-ink/10 md:block" />
          <div className="absolute bottom-0 left-6 top-0 w-0.5 bg-ink/10 md:hidden" />
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="relative animate-fade-up rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft"
            style={{ animationDelay: `${index * 110}ms` }}
          >
            <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
              {index + 1}
            </div>
            <div className="mt-5 rounded-2xl bg-mist p-4">
              <step.icon className="text-coral" size={24} />
              <div className="mt-4 grid gap-2">
                {step.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-ink/65"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <h3 className="mt-5 text-lg font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/70">{step.copy}</p>
          </div>
        ))}
        </div>
      </div>
      <div className="mt-10">
        <p className="eyebrow text-center">Quick Benefits</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white px-4 py-4 font-bold text-ink shadow-card"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage/30 text-emerald-800">
                <Check size={17} />
              </span>
              {benefit}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 rounded-[2rem] bg-ink px-6 py-10 text-center text-white shadow-soft">
        <ClipboardList className="mx-auto text-coral" size={30} />
        <h3 className="mt-4 text-3xl font-semibold tracking-tight">
          Your next study session already has a plan.
        </h3>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="/demo"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-white/10"
          >
            See the Demo
          </a>
        </div>
      </div>
    </section>
  );
}

function ScienceSection() {
  const principles = [
    {
      icon: BrainCircuit,
      label: "Reduce Cognitive Load",
      title: "Remember Less",
      copy: "Your brain was not designed to remember every assignment, meeting, deadline, and idea. Store it once, then focus on doing the work.",
      visual: ["Brain", "Second Brain AI", "Organized tasks"],
    },
    {
      icon: Compass,
      label: "Reduce Decision Fatigue",
      title: "Know What To Do Next",
      copy: "Too many choices often lead to procrastination. The AI highlights the highest-impact task so you can start immediately.",
      visual: ["Long task list", "AI", "One task"],
    },
    {
      icon: Puzzle,
      label: "Break Down Overwhelming Work",
      title: "Small Steps Beat Big Tasks",
      copy: "Large assignments feel difficult to start. Second Brain AI turns complex work into smaller actions that are easier to finish.",
      visual: ["Research", "Outline", "Draft", "Edit", "Submit"],
    },
    {
      icon: CalendarClock,
      label: "Build Consistency",
      title: "Plans That Adapt",
      copy: "Life changes. When your schedule changes, your plan adjusts so one missed day does not break the whole week.",
      visual: ["Class", "Study block", "Break", "Review"],
    },
  ];

  return (
    <section id="science" className="section-shell">
      <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <p className="eyebrow">The Science</p>
          <h2 className="section-title">
            Built Around How Your Brain Actually Works.
          </h2>
          <p className="section-copy mt-5">
            Second Brain AI is not just another task manager. Every feature is
            designed around research in attention, executive function,
            motivation, and habit formation.
          </p>
        </div>
        <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-center gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-coral/15 text-coral">
              <BrainCircuit size={42} className="animate-icon-float" />
            </div>
            <div className="h-0.5 flex-1 bg-ink/10" />
            <div className="grid gap-3">
              {["Tasks", "Calendar", "Reminders"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-ink/10 bg-mist px-4 py-3 text-sm font-bold text-ink shadow-card"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-12">
        <div className="absolute bottom-8 left-1/2 top-8 hidden w-0.5 -translate-x-1/2 bg-ink/10 lg:block" />
        <div className="grid gap-5 lg:grid-cols-2">
          {principles.map((principle, index) => (
            <article
              key={principle.title}
              className="relative animate-fade-up rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mist text-coral transition duration-300 hover:scale-105">
                  <principle.icon size={24} />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-coral">
                    {principle.label}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-ink">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-ink/68">
                    {principle.copy}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-2 rounded-2xl bg-mist p-3">
                {principle.visual.map((item, itemIndex) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-ink/65 shadow-sm">
                      {item}
                    </span>
                    {itemIndex < principle.visual.length - 1 ? (
                      <ArrowRight size={14} className="text-ink/35" />
                    ) : null}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-[2rem] border border-coral/20 bg-white p-7 shadow-card">
        <p className="eyebrow">Inspired by Research</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
          Productivity should feel easier to begin.
        </h3>
        <p className="mt-4 max-w-4xl text-base leading-7 text-ink/70">
          Our design is informed by established research in cognitive psychology,
          behavioral science, executive function, motivation, and habit
          formation. We believe productivity is not about working harder - it is
          about reducing the mental effort required to begin.
        </p>
        <details className="mt-5 rounded-2xl bg-mist px-5 py-4">
          <summary className="cursor-pointer text-sm font-bold">Learn more about our approach</summary>
          <p className="mt-3 text-sm leading-6 text-ink/70">
            Capture tasks in one place, split larger assignments into subtasks,
            and review priorities before starting work. AI planning and calendar
            integration are planned features; the workspace preview currently
            supports organizing and tracking tasks on this device.
          </p>
        </details>
      </div>

      <div className="mt-10 rounded-[2rem] bg-ink px-6 py-10 text-center text-white shadow-soft">
        <h3 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight">
          Technology should work with your brain - not against it.
        </h3>
        <a
          href="/platform"
          className="mt-6 inline-flex rounded-full bg-coral px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-white hover:text-ink"
        >
          See the Platform
        </a>
      </div>
    </section>
  );
}

function LiveDemoSection() {
  return <DemoPage />;
}

const pathToPage = {
  "/": "top",
  "/platform": "platform",
  "/how-it-works": "how-it-works",
  "/science": "science",
  "/demo": "live-demo",
};

const pageToPath = {
  top: "/",
  platform: "/platform",
  "how-it-works": "/how-it-works",
  science: "/science",
  "live-demo": "/demo",
};

function MarketingLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const activePage = pathToPage[location.pathname] || "top";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  const navigateTo = (page) => {
    navigate(pageToPath[page] || "/");
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar activePage={activePage} onNavigate={navigateTo} />
      <main>{children}</main>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <ProblemSection />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <BillingProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<LoginPage />} />
        <Route path="/billing" element={<RequireAuth><BillingPage /></RequireAuth>} />
        <Route path="/app" element={<RequireAuth><RequireSubscription><AppLayout /></RequireSubscription></RequireAuth>}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="ai-planner" element={<AIPlannerPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="/" element={<MarketingLayout><HomePage /></MarketingLayout>} />
        <Route path="/platform" element={<MarketingLayout><PlatformSection /></MarketingLayout>} />
        <Route path="/how-it-works" element={<MarketingLayout><HowItWorks /></MarketingLayout>} />
        <Route path="/science" element={<MarketingLayout><ScienceSection /></MarketingLayout>} />
        <Route path="/demo" element={<MarketingLayout><LiveDemoSection /></MarketingLayout>} />
        <Route path="/waitlist" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <FloatingChat />
      </BillingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
