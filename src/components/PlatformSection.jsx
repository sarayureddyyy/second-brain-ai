import {
  ArrowRight,
  Bot,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Folder,
  Plus,
  Sparkles,
} from "lucide-react";
import BoardPreview from "./BoardPreview.jsx";

const folders = [
  "Computer Science",
  "Spanish",
  "Research",
  "Internship",
  "Personal",
  "Business",
  "Finance",
];

const folderItems = ["Assignments", "Projects", "Notes", "Upcoming Exams", "Resources"];

const priorityColumns = [
  {
    title: "Today",
    tasks: [
      {
        title: "Operating Systems project",
        color: "bg-coral",
        duration: "4h",
        deadline: "Due tomorrow",
        course: "CS 3210",
        confidence: "94%",
      },
      {
        title: "Research summary",
        color: "bg-clay",
        duration: "45m",
        deadline: "Due Fri",
        course: "Research",
        confidence: "82%",
      },
    ],
  },
  {
    title: "This Week",
    tasks: [
      {
        title: "Spanish homework",
        color: "bg-sage",
        duration: "35m",
        deadline: "Due Thu",
        course: "Spanish",
        confidence: "88%",
      },
      {
        title: "Internship cover letter",
        color: "bg-ink",
        duration: "1h",
        deadline: "Due Sun",
        course: "Internship",
        confidence: "79%",
      },
    ],
  },
  {
    title: "Upcoming",
    tasks: [
      {
        title: "Finance club deck",
        color: "bg-clay",
        duration: "2h",
        deadline: "Next week",
        course: "Business",
        confidence: "74%",
      },
    ],
  },
  {
    title: "Completed",
    tasks: [
      {
        title: "Pay credit card",
        color: "bg-sage",
        duration: "10m",
        deadline: "Done",
        course: "Finance",
        confidence: "99%",
        completed: true,
      },
    ],
  },
];

function CalendarMini() {
  return (
    <div className="rounded-[1.25rem] border border-ink/10 bg-white p-4 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold text-ink">
          <CalendarDays size={16} className="text-coral" />
          Today
        </div>
        <span className="text-xs font-semibold text-ink/45">Apr 18</span>
      </div>
      <div className="mt-4 space-y-3">
        {[
          ["9:00", "Systems Lab"],
          ["1:30", "Spanish vocab"],
          ["4:00", "Internship draft"],
        ].map(([time, event]) => (
          <div key={event} className="grid grid-cols-[2.6rem_1fr] gap-3 text-xs">
            <span className="font-semibold text-ink/45">{time}</span>
            <span className="rounded-xl bg-mist px-3 py-2 font-semibold text-ink/70">
              {event}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AiPanel({ compact = false }) {
  return (
    <div className={`rounded-[1.25rem] border border-coral/20 bg-white p-4 shadow-card ${compact ? "" : "lg:absolute lg:-right-4 lg:bottom-8 lg:w-72"}`}>
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-coral text-white">
          <Bot size={16} />
        </span>
        <div>
          <p className="text-sm font-bold text-ink">AI Assistant</p>
          <p className="text-xs text-ink/45">Planning now</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-ink/70">
        Finish the CS lab before internship work. It needs a longer focus block,
        and your calendar is open until noon.
      </p>
      <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-3 py-2 text-xs font-bold text-white">
        Apply plan <ArrowRight size={13} />
      </button>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="relative rounded-[2rem] border border-ink/10 bg-white p-4 shadow-soft">
      <div className="mb-4 flex items-center justify-between border-b border-ink/10 pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-coral">
            Second Brain AI
          </p>
          <h3 className="mt-1 font-bold text-ink">Academic OS</h3>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-2 text-xs font-bold text-white">
          <Plus size={14} /> New
        </button>
      </div>
      <div className="grid gap-4 lg:grid-cols-[12rem_1fr_13rem]">
        <aside className="rounded-[1.25rem] bg-mist p-3">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-ink/40">
            Folders
          </p>
          {folders.slice(0, 5).map((folder, index) => (
            <div
              key={folder}
              className={`mb-2 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold ${
                index === 0 ? "bg-white text-ink shadow-card" : "text-ink/60"
              }`}
            >
              <Folder size={14} />
              {folder}
            </div>
          ))}
        </aside>
        <div className="grid gap-3 sm:grid-cols-3">
          {["To Do", "In Progress", "Completed"].map((column, index) => (
            <section key={column} className="rounded-[1.25rem] bg-[#fbfaf7] p-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold text-ink/55">{column}</span>
                <span className="h-2 w-2 rounded-full bg-sage" />
              </div>
              {[
                ["Finish Systems Lab", "CS"],
                ["Spanish vocab", "30 min"],
                ["Research notes", "Paper"],
              ]
                .slice(0, index === 2 ? 1 : 2)
                .map(([task, meta]) => (
                  <article key={task} className="mb-3 rounded-xl border border-ink/10 bg-white p-3 shadow-card">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold text-ink">{task}</p>
                      {index === 2 ? <CheckCircle2 size={15} className="text-sage" /> : null}
                    </div>
                    <span className="mt-3 inline-flex rounded-full bg-mist px-2 py-1 text-[11px] font-bold text-ink/55">
                      {meta}
                    </span>
                  </article>
                ))}
            </section>
          ))}
        </div>
        <div className="space-y-4">
          <CalendarMini />
          <div className="rounded-[1.25rem] border border-ink/10 bg-white p-4 shadow-card">
            <div className="flex items-center gap-2 text-sm font-bold text-ink">
              <Sparkles size={16} className="text-coral" />
              Priority
            </div>
            <p className="mt-3 text-sm leading-6 text-ink/65">
              Best next task: Systems Lab
            </p>
          </div>
        </div>
      </div>
      <AiPanel />
    </div>
  );
}

function FolderScreenshot() {
  return (
    <div className="relative rounded-[2rem] border border-ink/10 bg-white p-4 shadow-soft">
      <div className="grid gap-4 lg:grid-cols-[15rem_1fr]">
        <aside className="rounded-[1.5rem] bg-mist p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink/40">
            Workspace folders
          </p>
          <div className="mt-4 space-y-2">
            {folders.map((folder, index) => (
              <div
                key={folder}
                className={`flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-semibold ${
                  index === 0 ? "bg-white text-ink shadow-card" : "text-ink/60"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Folder size={15} />
                  {folder}
                </span>
                <span className="h-2 w-2 rounded-full bg-coral" />
              </div>
            ))}
          </div>
        </aside>
        <section className="rounded-[1.5rem] bg-[#fbfaf7] p-4">
          <div className="flex flex-col gap-3 border-b border-ink/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-coral">
                Computer Science
              </p>
              <h3 className="mt-1 text-xl font-bold text-ink">CS workspace</h3>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-ink/60 shadow-card">
              <Clock3 size={14} /> Exam in 9 days
            </span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {folderItems.map((item) => (
              <article key={item} className="rounded-[1.25rem] border border-ink/10 bg-white p-4 shadow-card">
                <FileText size={18} className="text-coral" />
                <h4 className="mt-4 font-bold text-ink">{item}</h4>
                <p className="mt-2 text-sm leading-6 text-ink/60">
                  {item === "Assignments" && "4 active tasks"}
                  {item === "Projects" && "2 milestones"}
                  {item === "Notes" && "12 saved notes"}
                  {item === "Upcoming Exams" && "Midterm review plan"}
                  {item === "Resources" && "Links and files"}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
      <AiPanel />
    </div>
  );
}

function PriorityTask({ task }) {
  return (
    <article className="rounded-[1.25rem] border border-ink/10 bg-white p-4 shadow-card transition duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className={`mt-1 h-3 w-3 shrink-0 rounded-full ${task.color}`} />
          <div>
            <h4 className={`text-sm font-bold text-ink ${task.completed ? "line-through decoration-sage" : ""}`}>
              {task.title}
            </h4>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-bold">
              <span className="rounded-full bg-mist px-2 py-1 text-ink/60">{task.duration}</span>
              <span className="rounded-full bg-mist px-2 py-1 text-ink/60">{task.deadline}</span>
              <span className="rounded-full bg-ink px-2 py-1 text-white">{task.course}</span>
            </div>
          </div>
        </div>
        <span className="rounded-full bg-sage/20 px-2 py-1 text-[11px] font-bold text-emerald-800">
          {task.confidence}
        </span>
      </div>
    </article>
  );
}

function AiPrioritizationSection() {
  return (
    <section className="mt-20">
      <div className="mb-8 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <p className="eyebrow">AI Prioritization</p>
          <h2 className="section-title">Know what to do first, and why.</h2>
        </div>
        <div className="rounded-[1.5rem] border border-coral/20 bg-white p-5 shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-coral text-white">
              <Bot size={17} />
            </span>
            <p className="text-sm font-semibold leading-6 text-ink/75">
              "I moved your Operating Systems project before your Spanish
              homework because it's due tomorrow and requires 4 hours."
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-[2rem] border border-ink/10 bg-white p-4 shadow-soft">
        <div className="grid gap-4 lg:grid-cols-4">
          {priorityColumns.map((column) => (
            <section key={column.title} className="min-h-[22rem] rounded-[1.5rem] bg-[#fbfaf7] p-3">
              <div className="mb-3 flex items-center justify-between px-1">
                <h3 className="text-sm font-bold text-ink">{column.title}</h3>
                <span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-ink/45">
                  {column.tasks.length}
                </span>
              </div>
              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <PriorityTask key={task.title} task={task} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

const calendarBlocks = [
  { time: "7:00", title: "Sleep", type: "Recovery", className: "top-[0.5rem] h-10 bg-ink/10 text-ink/55" },
  { time: "8:30", title: "Gym", type: "Personal", className: "top-[3.6rem] h-12 bg-sage/35 text-emerald-900" },
  { time: "10:00", title: "Operating Systems", type: "Class", className: "top-[7rem] h-14 bg-coral/20 text-ink" },
  { time: "12:00", title: "Break", type: "Reset", className: "top-[11rem] h-10 bg-clay/25 text-amber-800" },
  { time: "1:00", title: "Study session", type: "Auto block", className: "top-[13.6rem] h-20 bg-coral text-white animate-calendar-shift" },
  { time: "3:30", title: "Research meeting", type: "Meeting", className: "top-[19rem] h-14 bg-white text-ink border border-ink/10" },
  { time: "5:00", title: "Spanish homework", type: "Auto block", className: "top-[22.6rem] h-14 bg-sage/45 text-emerald-900 animate-calendar-shift-delay" },
];

function SmartCalendarSection() {
  return (
    <section className="mt-20">
      <div className="mb-8 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <p className="eyebrow">Smart Calendar</p>
          <h2 className="section-title">Your day rearranges when priorities change.</h2>
          <p className="section-copy mt-5">
            Automatic time blocks place study sessions, breaks, meetings,
            classes, gym, and sleep around the work that matters most.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-sage/30 bg-white p-5 shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage text-white">
              <CalendarDays size={17} />
            </span>
            <p className="text-sm font-semibold leading-6 text-ink/75">
              Task deadline changed. AI moved the deep-work block earlier and
              protected your class, gym, break, and sleep windows.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 rounded-[2rem] border border-ink/10 bg-white p-4 shadow-soft lg:grid-cols-[1fr_17rem]">
        <div className="rounded-[1.5rem] bg-[#fbfaf7] p-4">
          <div className="mb-4 flex flex-col gap-3 border-b border-ink/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-coral">
                Thursday schedule
              </p>
              <h3 className="mt-1 text-xl font-bold text-ink">Auto-planned calendar</h3>
            </div>
            <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-ink/60 shadow-card">
              Rearranging after task update
            </span>
          </div>
          <div className="grid gap-3 md:grid-cols-[4rem_1fr]">
            <div className="hidden flex-col justify-between py-2 text-xs font-bold text-ink/35 md:flex">
              {["7 AM", "9 AM", "11 AM", "1 PM", "3 PM", "5 PM", "7 PM"].map((time) => (
                <span key={time}>{time}</span>
              ))}
            </div>
            <div className="relative min-h-[28rem] overflow-hidden rounded-[1.25rem] border border-ink/10 bg-white p-3">
              <div className="absolute inset-x-3 top-0 h-full bg-[linear-gradient(to_bottom,rgba(31,41,51,0.08)_1px,transparent_1px)] bg-[length:100%_4rem]" />
              {calendarBlocks.map((block) => (
                <article
                  key={`${block.time}-${block.title}`}
                  className={`absolute left-4 right-4 rounded-2xl px-4 py-3 shadow-card transition duration-700 ${block.className}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-sm font-bold">{block.title}</h4>
                    <span className="text-[11px] font-bold opacity-70">{block.time}</span>
                  </div>
                  <p className="mt-1 text-xs font-semibold opacity-75">{block.type}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <aside className="rounded-[1.5rem] bg-ink p-5 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-coral">
            Today's workload
          </p>
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-white/60">Focused work</p>
              <p className="mt-2 text-3xl font-semibold">5.2h</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-white/60">Estimated completion time</p>
              <p className="mt-2 text-3xl font-semibold">6:40 PM</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-white/60">Productivity score</p>
              <p className="mt-2 text-3xl font-semibold">86</p>
              <div className="mt-3 h-2 rounded-full bg-white/15">
                <div className="h-2 w-[86%] rounded-full bg-coral" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function AiAssistantSection() {
  const suggestions = [
    "Plan My Week",
    "Reschedule Today",
    "Break Down Assignment",
    "Find Free Time",
  ];

  return (
    <section className="mt-20">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow">AI Assistant</p>
          <h2 className="section-title">Ask for help the way you would text a planner.</h2>
          <p className="section-copy mt-5">
            Tell Second Brain AI what changed, what feels overwhelming, or what
            you need to finish. It turns that context into schedule changes,
            task breakdowns, and realistic next steps.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                className="rounded-full border border-ink/10 bg-white px-4 py-2.5 text-sm font-bold text-ink shadow-card transition hover:-translate-y-0.5 hover:border-coral/40"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm rounded-[2.5rem] border border-ink/12 bg-ink p-3 shadow-soft">
          <div className="rounded-[2rem] bg-[#f6f7f8] p-4">
            <div className="mx-auto mb-4 h-1.5 w-20 rounded-full bg-ink/20" />
            <div className="rounded-[1.5rem] bg-white p-4 shadow-card">
              <div className="flex items-center gap-3 border-b border-ink/10 pb-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-coral text-white">
                  <Bot size={18} />
                </span>
                <div>
                  <p className="font-bold text-ink">Second Brain AI</p>
                  <p className="text-xs font-semibold text-emerald-700">Online</p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div className="ml-auto max-w-[78%] rounded-[1.25rem] rounded-br-md bg-ink px-4 py-3 text-sm font-medium leading-6 text-white">
                  I have a Systems exam Friday.
                </div>
                <div className="max-w-[86%] rounded-[1.25rem] rounded-bl-md bg-mist px-4 py-3 text-sm font-medium leading-6 text-ink/78">
                  I recommend beginning tonight. I've scheduled three review
                  sessions and moved lower-priority tasks.
                </div>
                <div className="max-w-[82%] rounded-[1.25rem] rounded-bl-md bg-mist px-4 py-3 text-sm font-medium leading-6 text-ink/78">
                  Your first block is 7:30 PM. I also saved a 45-minute recap
                  session before class tomorrow.
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    className="rounded-full bg-white px-3 py-2 text-xs font-bold text-ink ring-1 ring-ink/10 transition hover:bg-mist"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgressDashboardSection() {
  const metrics = [
    ["Weekly completion", "78%", "bg-coral", "w-[78%]"],
    ["Hours studied", "18.5h", "bg-sage", "w-[68%]"],
    ["Current streak", "9 days", "bg-clay", "w-[86%]"],
    ["Assignments completed", "24", "bg-ink", "w-[72%]"],
    ["Upcoming deadlines", "6", "bg-coral", "w-[42%]"],
    ["Course progress", "64%", "bg-sage", "w-[64%]"],
  ];

  return (
    <section className="mt-20">
      <div className="mb-8 max-w-3xl">
        <p className="eyebrow">Progress Dashboard</p>
        <h2 className="section-title">See the semester moving forward.</h2>
        <p className="section-copy mt-5">
          Track completion, study time, streaks, assignments, deadlines, and
          course progress from one quiet dashboard.
        </p>
      </div>

      <div className="rounded-[2rem] border border-ink/10 bg-white p-4 shadow-soft">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map(([label, value, color, width], index) => (
            <article
              key={label}
              className="rounded-[1.5rem] border border-ink/10 bg-[#fbfaf7] p-5 shadow-card transition duration-300 hover:-translate-y-1"
            >
              <p className="text-sm font-bold text-ink/55">{label}</p>
              <p className="mt-3 text-3xl font-semibold text-ink">{value}</p>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-ink/10">
                <div
                  className={`h-2 rounded-full ${color} ${width} animate-graph-grow`}
                  style={{ animationDelay: `${index * 120}ms` }}
                />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[1.5rem] bg-mist p-5">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-bold text-ink">Weekly study rhythm</h3>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-ink/55">
                Live trend
              </span>
            </div>
            <div className="flex h-48 items-end gap-3">
              {[42, 64, 50, 82, 70, 92, 76].map((height, index) => (
                <div key={index} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-40 w-full items-end rounded-t-2xl bg-white/70">
                    <div
                      className="w-full rounded-t-2xl bg-coral animate-bar-rise"
                      style={{ height: `${height}%`, animationDelay: `${index * 90}ms` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-ink/45">
                    {["M", "T", "W", "T", "F", "S", "S"][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] bg-ink p-5 text-white">
            <h3 className="font-bold">Course progress</h3>
            <div className="mt-5 space-y-4">
              {[
                ["Operating Systems", "72%"],
                ["Spanish", "61%"],
                ["Research", "84%"],
                ["Finance", "46%"],
              ].map(([course, progress]) => (
                <div key={course}>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">{course}</span>
                    <span className="font-bold">{progress}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/15">
                    <div
                      className="h-2 rounded-full bg-sage animate-graph-grow"
                      style={{ width: progress }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PlatformSection() {
  return (
    <section id="platform" className="section-shell pt-6">
      <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <p className="eyebrow">The Platform</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            The AI operating system for your academic life.
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink/70">
            Second Brain AI organizes everything you need to do, prioritizes
            what matters most, and helps you actually finish your work.
          </p>
          <a
            href="/demo"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white shadow-card transition hover:-translate-y-1 hover:bg-coral"
          >
            Explore the workflow <ArrowRight size={17} />
          </a>
        </div>
        <DashboardMockup />
      </div>

      <div className="mt-20">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="eyebrow">Everything in one place</p>
          <h2 className="section-title mx-auto">Your folders, tasks, notes, and deadlines together.</h2>
          <p className="section-copy mt-5">
            No more switching between Canvas, Notion, Google Calendar, sticky
            notes, and dozens of browser tabs.
          </p>
        </div>
        <FolderScreenshot />
      </div>

      <AiPrioritizationSection />

      <SmartCalendarSection />

      <AiAssistantSection />

      <ProgressDashboardSection />

      <div className="mt-16">
        <BoardPreview />
      </div>
    </section>
  );
}
