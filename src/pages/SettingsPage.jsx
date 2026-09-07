const sections = [
  {
    title: "Profile",
    copy: "Name, school email, major, and academic preferences will live here.",
  },
  {
    title: "Theme",
    copy: "Light, dark, and focus modes can be configured here later.",
  },
  {
    title: "Notifications",
    copy: "Control reminders, focus nudges, and missed-task alerts.",
  },
  {
    title: "Calendar integrations",
    copy: "Connect Google Calendar, class schedules, and school calendar feeds.",
  },
  {
    title: "Account settings",
    copy: "Manage access, private-beta status, and future billing details.",
  },
];

export default function SettingsPage() {
  return (
    <section>
      <div className="mb-6">
        <p className="eyebrow">Settings</p>
        <h2 className="section-title">Workspace settings.</h2>
        <p className="section-copy mt-3">
          Private-beta account settings placeholders for the first app shell.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-[1.5rem] border border-ink/10 bg-white p-6 shadow-card"
          >
            <h3 className="text-lg font-bold text-ink">{section.title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/60">{section.copy}</p>
            <button disabled className="mt-5 rounded-full bg-mist px-4 py-2 text-sm font-bold text-ink/55">
              Coming soon
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
