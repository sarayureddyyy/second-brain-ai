import { useState } from "react";
import { Folder, MoreHorizontal, Plus } from "lucide-react";
import { useAppData } from "./AppDataContext.jsx";
import ConfirmDialog from "./ConfirmDialog.jsx";

export default function FolderManager({ collapsed }) {
  const { folders, taskCounts, addFolder, renameFolder, deleteFolder } = useAppData();
  const [editingId, setEditingId] = useState("");
  const [draftName, setDraftName] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const startRename = (folder) => {
    setEditingId(folder.id);
    setDraftName(folder.name);
  };

  const submitRename = (folderId) => {
    renameFolder(folderId, draftName);
    setEditingId("");
    setDraftName("");
  };

  return (
    <>
      <div className="mt-8 min-h-0 flex-1 overflow-hidden">
        <div className="flex items-center justify-between px-3">
          {!collapsed ? (
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink/35">
              Folders
            </p>
          ) : null}
          <button
            type="button"
            onClick={() => {
              const name = window.prompt("New folder name");
              if (name) addFolder(name);
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-mist text-ink/55 transition hover:text-coral"
          >
            <Plus size={14} />
          </button>
        </div>
        <div className="mt-3 grid gap-1">
          {folders.map((folder) => (
            <div
              key={folder.id}
              className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold text-ink/62 transition hover:bg-mist hover:text-ink"
            >
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${folder.color} text-white`}>
                <Folder size={15} />
              </span>
              {!collapsed ? (
                <>
                  {editingId === folder.id ? (
                    <input
                      value={draftName}
                      onChange={(event) => setDraftName(event.target.value)}
                      onBlur={() => submitRename(folder.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") submitRename(folder.id);
                        if (event.key === "Escape") setEditingId("");
                      }}
                      autoFocus
                      className="min-w-0 flex-1 rounded-lg border border-coral/40 bg-white px-2 py-1 text-sm outline-none"
                    />
                  ) : (
                    <span className="min-w-0 flex-1 truncate">{folder.name}</span>
                  )}
                  <span className="rounded-full bg-mist px-2 py-0.5 text-xs text-ink/50">
                    {taskCounts[folder.id] || 0}
                  </span>
                  {folder.id !== "inbox" ? (
                    <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => startRename(folder)}
                        className="rounded-full p-1 text-ink/45 hover:text-coral"
                      >
                        <MoreHorizontal size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(folder)}
                        className="rounded-full px-1 text-xs font-bold text-ink/35 hover:text-coral"
                      >
                        Del
                      </button>
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <ConfirmDialog
        title={deleteTarget ? `Delete ${deleteTarget.name}?` : ""}
        message="Tasks in this folder will move to Inbox. This cannot be undone locally."
        confirmLabel="Delete folder"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          deleteFolder(deleteTarget.id);
          setDeleteTarget(null);
        }}
      />
    </>
  );
}
