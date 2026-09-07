import TaskBoard from "../app/TaskBoard.jsx";
import FolderManager from "../app/FolderManager.jsx";

export default function DashboardPage() {
  return (
    <section>
      <div className="mb-6">
        <p className="eyebrow">Academic operating system</p>
        <h2 className="section-title">Your active workspace.</h2>
        <p className="section-copy mt-3 max-w-3xl">
          Organize classes, applications, research, and personal work in one board.
          Tasks are saved in this browser on this device.
        </p>
      </div>
      <details className="mb-5 rounded-2xl border border-ink/10 bg-white p-4 lg:hidden">
        <summary className="cursor-pointer text-sm font-bold">Manage folders</summary>
        <FolderManager collapsed={false} />
      </details>
      <TaskBoard />
    </section>
  );
}
