import TaskBoard from "../app/TaskBoard.jsx";

export default function DashboardPage() {
  return (
    <section>
      <div className="mb-6">
        <p className="eyebrow">Academic operating system</p>
        <h2 className="section-title">Your active workspace.</h2>
        <p className="section-copy mt-3 max-w-3xl">
          Organize classes, applications, research, business ideas, and personal
          work in one board. This is the foundation for the logged-in platform.
        </p>
      </div>
      <TaskBoard />
    </section>
  );
}
