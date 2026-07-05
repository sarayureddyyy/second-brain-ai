import { useEffect, useState } from "react";
import {
  Bot,
  CalendarDays,
  CheckCircle2,
  Folder,
  MousePointer2,
  Plus,
  Smartphone,
} from "lucide-react";

const demoSteps = [
  {
    title: "Add Your Classes",
    popupTitle: "Folders reduce clutter",
    popup:
      "Folders reduce mental clutter by giving every part of your life a clear place.",
  },
  {
    title: "Capture Tasks",
    popupTitle: "Quick capture",
    popup: "Quick capture prevents forgotten deadlines and keeps tasks out of your head.",
  },
  {
    title: "AI Prioritizes",
    popupTitle: "One next move",
    popup:
      "Instead of choosing from 30 tasks, the AI tells you what matters most right now.",
  },
  {
    title: "Auto-Schedule",
    popupTitle: "Time blocking",
    popup: "Time blocking turns vague intentions into specific moments on your calendar.",
  },
  {
    title: "Mobile Check-In",
    popupTitle: "Lower the effort to start",
    popup: "Reminders are designed to lower the effort needed to start, not just nag you.",
  },
  {
    title: "Complete & Adapt",
    popupTitle: "Recover when plans change",
    popup: "Progress tracking and adaptive planning help you recover when life changes.",
  },
];

const folders = ["Computer Science", "Spanish", "Internship", "Business", "Personal"];
const tasks = [
  "Finish Systems Lab",
  "Study Spanish vocab",
  "Apply to Amazon internship",
  "Build landing page",
  "Pay credit card",
];
const calendarBlocks = [
  ["9:00 AM", "Class"],
  ["11:00 AM", "Systems Lab"],
  ["2:00 PM", "Spanish Review"],
  ["5:30 PM", "Internship Work"],
  ["8:00 PM", "Business Sprint"],
];

const cursorPositions = [
  { left: "10%", top: "28%", label: "Open CS folder" },
  { left: "34%", top: "20%", label: "Add task" },
  { left: "47%", top: "40%", label: "Prioritize" },
  { left: "80%", top: "54%", label: "Schedule" },
  { left: "90%", top: "70%", label: "Start Focus" },
  { left: "55%", top: "57%", label: "Complete" },
];

const phoneMessages = [
  {
    label: "Workspace ready",
    text: "Computer Science folder is set. Add tasks whenever they come up.",
  },
  {
    label: "Task captured",
    text: "New task saved: Read chapter 8. I will place it in your plan.",
  },
  {
    label: "Priority alert",
    text: "Finish Systems Lab first. It is due soon and needs your longest block.",
  },
  {
    label: "Schedule update",
    text: "I blocked 11:00 AM for Systems Lab and moved Spanish review to 2:00 PM.",
  },
  {
    label: "Focus reminder",
    text: "Start Systems Lab now - 45 min focus block.",
  },
  {
    label: "Plan adapted",
    text: "Systems Lab complete. Your evening calendar has been adjusted.",
  },
];

function activeClass(active, base = "") {
  return `${base} ${active ? "opacity-100 translate-y-0 scale-100" : "opacity-35 translate-y-1 scale-[0.98]"}`;
}

function DesktopMockup({ step }) {
  const showFolders = step >= 0;
  const showTasks = step >= 1;
  const showPriority = step >= 2;
  const showCalendar = step >= 3;
  const showCompleted = step >= 5;

  const columns = showPriority
    ? {
        Today: ["Finish Systems Lab", "Study Spanish vocab"],
        "This Week": ["Apply to Amazon internship", "Build landing page"],
        Later: ["Pay credit card"],
      }
    : {
        Inbox: tasks,
        Planning: [],
        Completed: [],
      };

  return (
    <div className="relative rounded-[2rem] border border-white/10 bg-white/92 p-4 text-ink shadow-soft backdrop-blur">
      <div className="mb-4 flex items-center justify-between border-b border-ink/10 pb-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-coral">
            Second Brain AI
          </p>
          <h3 className="font-bold">Semester workspace</h3>
        </div>
        <button
          type="button"
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition duration-500 ${
            step === 1
              ? "bg-coral text-white ring-4 ring-coral/20"
              : "bg-mist text-ink/60"
          }`}
        >
          <Plus size={13} />
          New Task
        </button>
      </div>

      <div className="grid gap-3 lg:grid-cols-[11rem_1fr_12rem]">
        <aside className="rounded-[1.25rem] bg-mist p-3">
          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ink/40">
            <Folder size={14} /> Folders
          </div>
          <div className="space-y-2">
            {folders.map((folder, index) => (
              <div
                key={folder}
                className={activeClass(
                  showFolders,
                  "rounded-xl bg-white px-3 py-2 text-xs font-bold shadow-sm transition duration-500",
                )}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                {folder}
              </div>
            ))}
          </div>
        </aside>

        <div className="rounded-[1.25rem] bg-[#fbfaf7] p-3">
          <div className="grid gap-3 md:grid-cols-3">
            {Object.entries(columns).map(([column, columnTasks]) => (
              <section key={column} className="min-h-64 rounded-2xl bg-white/75 p-3">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-bold text-ink/55">{column}</p>
                  <span className="h-2 w-2 rounded-full bg-sage" />
                </div>
                <div className="space-y-2">
                  {column === "Inbox" && step === 1 ? (
                    <article className="rounded-xl border border-coral bg-coral/12 p-3 text-xs font-bold shadow-sm ring-4 ring-coral/10">
                      Read chapter 8
                      <p className="mt-2 text-[11px] font-semibold text-coral">
                        Added just now
                      </p>
                    </article>
                  ) : null}
                  {columnTasks.map((task, index) => {
                    const isTop = showPriority && task === "Finish Systems Lab";
                    const isDone = showCompleted && task === "Finish Systems Lab";
                    return (
                      <article
                        key={task}
                        className={`rounded-xl border p-3 text-xs font-bold shadow-sm transition duration-700 ${
                          isTop ? "border-coral bg-coral/12 ring-4 ring-coral/10" : "border-ink/10 bg-white"
                        } ${isDone ? "translate-x-1 bg-sage/25 line-through" : ""} ${
                          showTasks ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span>{task}</span>
                          {isDone ? <CheckCircle2 size={15} className="text-emerald-700" /> : null}
                        </div>
                        <p className="mt-2 text-[11px] font-semibold text-ink/45">
                          {isTop ? "Top priority" : "Captured"}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-[1.25rem] border border-ink/10 bg-white p-3 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold">
              <Bot size={15} className="text-coral" /> AI Assistant
            </div>
            <p className="text-xs leading-5 text-ink/65">
              {showPriority
                ? "Systems Lab moved to the top because it is due soon."
                : "Waiting for tasks to prioritize."}
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-ink/10 bg-white p-3 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold">
              <CalendarDays size={15} className="text-coral" /> Calendar
            </div>
            <div className="space-y-2">
              {calendarBlocks.map(([time, label], index) => (
                <div
                  key={label}
                  className={`rounded-xl px-3 py-2 text-[11px] font-bold transition duration-700 ${
                    showCalendar ? "translate-x-0 bg-mist opacity-100" : "translate-x-3 bg-ink/5 opacity-30"
                  } ${step === 5 && index > 1 ? "translate-y-1" : ""}`}
                >
                  {time} {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMockup({ step }) {
  const mobileFocus = step >= 4;
  const done = step >= 5;
  const visibleMessages = phoneMessages.slice(Math.max(0, step - 2), step + 1);

  return (
    <div
      className={`relative w-full max-w-[16rem] rounded-[2.25rem] border border-white/15 bg-ink p-3 text-white shadow-soft transition duration-700 ${
        mobileFocus ? "scale-105 ring-8 ring-coral/20" : "scale-100"
      }`}
    >
      <div className="rounded-[1.75rem] bg-[#f7f7f4] p-4 text-ink">
        <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-ink/20" />
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold">Today</p>
          <Smartphone size={16} className="text-coral" />
        </div>
        <div className="mt-4 rounded-2xl bg-ink p-4 text-white">
          <p className="text-xs text-white/60">Current focus</p>
          <p className="mt-2 font-bold">{done ? "Systems Lab complete" : "Systems Lab"}</p>
          <p className="mt-1 text-xs text-white/60">{done ? "Calendar adjusted" : "45 min focus block"}</p>
        </div>
        <div className="mt-3 rounded-2xl border border-coral/20 bg-white p-3 shadow-sm">
          <p className="text-xs font-bold text-coral">Text reminders</p>
          <div className="mt-3 space-y-2">
            {visibleMessages.map((message, index) => {
              const isLatest = index === visibleMessages.length - 1;
              return (
                <div
                  key={`${step}-${message.label}`}
                  className={`animate-fade-up rounded-2xl px-3 py-2 text-xs leading-5 transition ${
                    isLatest
                      ? "ml-4 bg-coral text-white shadow-card"
                      : "mr-4 bg-mist text-ink/70"
                  }`}
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <span className="block text-[10px] font-bold uppercase tracking-[0.12em] opacity-70">
                    {message.label}
                  </span>
                  {message.text}
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-3 grid gap-2">
          {["Start Focus", "Snooze 15 min", "Reschedule"].map((action, index) => (
            <button
              key={action}
              type="button"
              className={`rounded-full px-3 py-2 text-xs font-bold transition ${
                step === 4 && index === 0
                  ? "bg-coral text-white ring-4 ring-coral/15"
                  : "bg-mist"
              }`}
            >
              {action}
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-sage/25 px-3 py-2 text-xs font-bold text-emerald-800">
          <CheckCircle2 size={15} />
          {done ? "Completed" : step === 4 ? "Focus timer started" : "Ready when you are"}
        </div>
      </div>
    </div>
  );
}

function DemoCursor({ step }) {
  const position = cursorPositions[step] || cursorPositions[0];

  return (
    <div
      className="pointer-events-none absolute z-30 hidden transition-all duration-700 ease-out lg:block"
      style={{ left: position.left, top: position.top }}
    >
      <div className="relative">
        <span className="absolute -left-3 -top-3 h-8 w-8 rounded-full bg-coral/25 opacity-0 animate-[click-ping_1.2s_ease-out_infinite]" />
        <MousePointer2
          size={30}
          className="drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)]"
          fill="white"
          stroke="#1F2933"
        />
        <span className="absolute left-7 top-6 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-[11px] font-bold text-white shadow-card">
          {position.label}
        </span>
      </div>
    </div>
  );
}

function DemoPopup({ step }) {
  const current = demoSteps[step];
  return (
    <div className="absolute left-4 top-4 max-w-xs rounded-2xl border border-white/15 bg-ink/92 p-4 text-white shadow-soft backdrop-blur md:left-8 md:top-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-coral">
        Why it matters
      </p>
      <h3 className="mt-2 font-bold">{current.popupTitle}</h3>
      <p className="mt-2 text-sm leading-5 text-white/70">{current.popup}</p>
    </div>
  );
}

function ProgressBar({ step }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <div
        key={step}
        className="h-2 rounded-full bg-coral"
        style={{
          animation: "demo-progress 3600ms linear both",
        }}
      />
    </div>
  );
}

function StepIndicator({ currentStep }) {
  return (
    <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
      {demoSteps.map((step, index) => (
        <div
          key={step.title}
          className={`rounded-2xl px-3 py-2 text-left text-xs font-bold transition ${
            currentStep === index ? "bg-coral text-white" : "bg-white/10 text-white/65"
          }`}
        >
          <span className="block text-[10px] uppercase tracking-[0.12em] opacity-70">
            Step {index + 1}
          </span>
          {step.title}
        </div>
      ))}
    </div>
  );
}

function DemoStage({ step }) {
  return (
    <div className="relative mx-auto mt-8 max-w-6xl rounded-[2.25rem] border border-white/10 bg-white/8 p-4 shadow-soft backdrop-blur">
      <DemoPopup step={step} />
      <DemoCursor step={step} />
      <div className="grid gap-4 pt-36 lg:grid-cols-[1fr_16rem] lg:items-end lg:pt-20">
        <DesktopMockup step={step} />
        <MobileMockup step={step} />
      </div>
    </div>
  );
}

export default function DemoPage() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setStep((current) => (current + 1) % demoSteps.length);
    }, 3600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="live-demo"
      className="relative overflow-hidden bg-ink px-4 py-12 text-white sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(223,143,125,0.28),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(175,200,173,0.18),transparent_32%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-coral">
            Live Demo
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Watch your school life organize itself.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/65">
            A guided walkthrough of how Second Brain AI turns scattered tasks into a clear plan.
          </p>
        </div>

        <div className="relative">
          <DemoStage step={step} />
        </div>

        <div className="mx-auto mt-5 max-w-6xl space-y-4">
          <ProgressBar step={step} />
          <StepIndicator currentStep={step} />
        </div>
      </div>
    </section>
  );
}
