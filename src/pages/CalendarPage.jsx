import { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, Plus, X } from "lucide-react";
import { useAppData } from "../app/AppDataContext.jsx";
import useModal from "../app/useModal.js";
import ConfirmDialog from "../app/ConfirmDialog.jsx";
import { readStorage, writeStorage } from "../utils/storage.js";
import { addDays, startOfWeek, monthDays, moveDate, minutes, timeLabel, layoutEvents, validEvent, dateFromKey, localDateKey } from "../utils/calendar.js";
import "./calendar.css";

const storageKey = "second-brain-ai.calendar.v1";
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const categories = { study: "Study", class: "Class", personal: "Personal" };
const longDate = date => date.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
const rangeLabel = date => date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
const eventLabel = event => `${event.title}, ${timeLabel(event.start)} to ${timeLabel(event.end)}`;

function EventEditor({ initial, onClose, onSave, onDelete }) {
  const [draft, setDraft] = useState(initial);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const ref = useModal(true, onClose);
  const update = patch => { setDraft(current => ({ ...current, ...patch })); setError(""); };
  return (
    <>
      <div className="cal-overlay">
        <form ref={ref} role="dialog" aria-modal="true" aria-label={initial.id ? "Edit time block" : "Add time block"} tabIndex={-1} className="cal-editor" onSubmit={event => {
          event.preventDefault();
          if (!draft.title.trim()) return setError("Give this time block a title.");
          if (minutes(draft.end) <= minutes(draft.start)) return setError("End time must be later than start time on the same day.");
          onSave({ ...draft, title: draft.title.trim(), id: draft.id || crypto.randomUUID() });
        }}>
          <div className="cal-editor-heading"><h2>{initial.id ? "Edit time block" : "Make time for it."}</h2><button type="button" className="cal-icon" aria-label="Close time block" onClick={onClose}><X size={20} /></button></div>
          <label>Title<input data-initial-focus required maxLength={160} value={draft.title} onChange={event => update({ title: event.target.value })} placeholder="Study session, class, or a break" /></label>
          <label>Date<input type="date" required value={draft.date} onChange={event => update({ date: event.target.value })} /></label>
          <div className="cal-form-row"><label>Start time<input type="time" required value={draft.start} onChange={event => update({ start: event.target.value })} /></label><label>End time<input type="time" required value={draft.end} onChange={event => update({ end: event.target.value })} /></label></div>
          <label>Category<select value={draft.category} onChange={event => update({ category: event.target.value })}>{Object.entries(categories).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
          {error && <p role="alert" className="cal-error">{error}</p>}
          <div className="cal-editor-actions">{initial.id && <button type="button" className="cal-delete" onClick={() => setConfirm(true)}>Delete block</button>}<button type="button" className="cal-button" onClick={onClose}>Cancel</button><button className="cal-primary" type="submit">Save block</button></div>
        </form>
      </div>
      <ConfirmDialog title={confirm ? "Delete this time block?" : ""} message="This removes the block from your calendar. Your tasks will stay on your board." confirmLabel="Delete block" onCancel={() => setConfirm(false)} onConfirm={() => onDelete(initial.id)} />
    </>
  );
}

function Agenda({ date, events, tasks, onEdit, onTask, onAdd }) {
  const total = events.reduce((sum, event) => sum + minutes(event.end) - minutes(event.start), 0);
  return <section className="cal-agenda" aria-label="Selected day schedule">
    <div className="cal-agenda-heading"><div><p className="cal-kicker">Daily schedule</p><h3>{longDate(date)}</h3><p>{events.length} {events.length === 1 ? "block" : "blocks"} · {Math.floor(total / 60)}h {total % 60}m planned</p></div><button className="cal-button" onClick={() => onAdd(date)}><Plus size={16} /> Add time block</button></div>
    {tasks.length > 0 && <div className="cal-deadlines"><span>Due this day</span>{tasks.map(task => <button key={task.id} onClick={() => onTask(task.id)}>{task.title}</button>)}</div>}
    {events.length ? <div className="cal-agenda-list">{events.map(event => <button key={event.id} onClick={() => onEdit(event)} className="cal-agenda-event"><span className="cal-agenda-time">{timeLabel(event.start)}<small>{timeLabel(event.end)}</small></span><span className={`cal-event-detail cal-tone-${event.category}`}><strong>{event.title}</strong><small>{categories[event.category] || "Study"} · {minutes(event.end) - minutes(event.start)} min</small></span></button>)}</div> : <div className="cal-empty"><Clock3 size={23} /><div><strong>A little room to breathe.</strong><p>No time blocks yet. Add one to plan your day.</p></div></div>}
  </section>;
}

export default function CalendarPage() {
  const { tasks, setSelectedTaskId } = useAppData();
  const [view, setView] = useState("month");
  const [selected, setSelected] = useState(() => new Date());
  const [events, setEvents] = useState(() => readStorage(storageKey, []).filter(validEvent).map(event => ({ ...event, category: categories[event.category] ? event.category : "study" })));
  const [editor, setEditor] = useState(null);
  const [notice, setNotice] = useState("");
  const [now, setNow] = useState(() => new Date());
  const timeline = useRef(null);
  useEffect(() => { writeStorage(storageKey, events); }, [events]);
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(id); }, []);
  useEffect(() => { if (timeline.current && view !== "month") timeline.current.scrollTop = 7 * 64; }, [view]);
  const today = localDateKey(now);
  const selectedKey = localDateKey(selected);
  const forDay = date => events.filter(event => event.date === localDateKey(date)).sort((a, b) => a.start.localeCompare(b.start));
  const dueOn = date => tasks.filter(task => task.dueDate === localDateKey(date) && task.status !== "completed");
  const dates = view === "month" ? monthDays(selected) : view === "week" ? Array.from({ length: 7 }, (_, index) => addDays(startOfWeek(selected), index)) : [selected];
  const heading = view === "month" ? selected.toLocaleDateString(undefined, { month: "long", year: "numeric" }) : view === "day" ? longDate(selected) : `${rangeLabel(dates[0])} – ${rangeLabel(dates[6])}, ${dates[6].getFullYear()}`;
  const add = (date, hour = 9) => {
    setEditor({ title: "", date: localDateKey(date), start: `${String(hour).padStart(2, "0")}:00`, end: hour === 23 ? "23:59" : `${String(hour + 1).padStart(2, "0")}:00`, category: "study" });
  };
  const openDay = date => { setSelected(date); setView("day"); };
  return (
    <section className="calendar-page" aria-label="Calendar planner">
      <div className="cal-intro"><div><p className="cal-kicker">Your time, thoughtfully planned</p><p className="cal-subtitle">See the big picture. Make space for each day.</p></div><button className="cal-primary" onClick={() => add(selected)}><Plus size={18} /> Add time block</button></div>
      <div className="cal-shell">
        <div className="cal-toolbar">
          <div className="cal-navigation"><button className="cal-icon" aria-label={`Previous ${view}`} onClick={() => setSelected(current => moveDate(current, view, -1))}><ChevronLeft size={20} /></button><button className="cal-icon" aria-label={`Next ${view}`} onClick={() => setSelected(current => moveDate(current, view, 1))}><ChevronRight size={20} /></button><h2 aria-live="polite">{heading}</h2><button className="cal-button" onClick={() => setSelected(new Date())}>Today</button></div>
          <div className="cal-views" role="group" aria-label="Calendar view">{["month", "week", "day"].map(mode => <button key={mode} aria-pressed={view === mode} onClick={() => setView(mode)}>{mode[0].toUpperCase() + mode.slice(1)}</button>)}</div>
        </div>
        <div className="cal-legend">{Object.entries(categories).map(([key, label]) => <span key={key}><i className={`cal-dot cal-tone-${key}`} />{label}</span>)}<span className="cal-local">Saved on this device · All times local</span></div>
        {view === "month" ? <div className="cal-month-scroll"><div className="cal-month">
          {weekdays.map(day => <div className="cal-weekday" key={day}>{day}</div>)}
          {dates.map(date => { const key = localDateKey(date); const blocks = forDay(date); const deadlines = dueOn(date); return <div key={key} className={`cal-cell ${date.getMonth() !== selected.getMonth() ? "cal-outside" : ""} ${key === selectedKey ? "cal-selected" : ""}`}>
            <button className={`cal-date ${key === today ? "cal-today" : ""}`} aria-label={`View ${longDate(date)}`} aria-current={key === today ? "date" : undefined} onClick={() => openDay(date)}>{date.getDate()}</button>
            {blocks.slice(0, 3).map(event => <button key={event.id} className={`cal-month-event cal-tone-${event.category}`} title={eventLabel(event)} onClick={() => { setSelected(date); setEditor(event); }}><span>{timeLabel(event.start)}</span><strong>{event.title}</strong></button>)}
            {blocks.length > 3 && <button className="cal-more" onClick={() => openDay(date)}>+{blocks.length - 3} more</button>}
            {deadlines.length > 0 && <button className="cal-due" onClick={() => openDay(date)}>{deadlines.length} task{deadlines.length === 1 ? "" : "s"} due</button>}
          </div>; })}
        </div></div> : <div className="cal-time-scroll" ref={timeline}>
          <div className={`cal-time-grid ${view === "week" ? "cal-week-grid" : "cal-day-grid"}`} style={{ "--days": dates.length }}>
            <div className="cal-time-corner">Local time</div>
            {dates.map(date => <button className={`cal-day-heading ${localDateKey(date) === today ? "cal-heading-today" : ""}`} key={localDateKey(date)} onClick={() => openDay(date)}><span>{date.toLocaleDateString(undefined, { weekday: "short" })}</span><strong>{date.getDate()}</strong></button>)}
            <div className="cal-due-label">Due</div>{dates.map(date => <div key={localDateKey(date)} className="cal-day-due">{dueOn(date).length ? dueOn(date).map(task => <button key={task.id} onClick={() => setSelectedTaskId(task.id)} title={task.title}>{task.title}</button>) : <span>—</span>}</div>)}
            <div className="cal-hours">{Array.from({ length: 24 }, (_, hour) => <div key={hour}>{timeLabel(`${hour}:00`)}</div>)}</div>
            {dates.map(date => <div key={localDateKey(date)} className="cal-day-track">
              {Array.from({ length: 24 }, (_, hour) => <button key={hour} className="cal-hour-slot" aria-label={`Add time block on ${longDate(date)} at ${timeLabel(`${hour}:00`)}`} onClick={() => add(date, hour)}><span><Plus size={14} /> Add block</span></button>)}
              {layoutEvents(forDay(date)).map(event => <button key={event.id} onClick={() => setEditor(event)} title={eventLabel(event)} aria-label={eventLabel(event)} className={`cal-timed-event cal-tone-${event.category}`} style={{ top: minutes(event.start) / 60 * 64, height: Math.max(18, (minutes(event.end) - minutes(event.start)) / 60 * 64 - 2), left: `calc(${event.lane / event.lanes * 100}% + 3px)`, width: `calc(${100 / event.lanes}% - 6px)` }}><strong>{event.title}</strong><span>{timeLabel(event.start)} – {timeLabel(event.end)}</span></button>)}
              {localDateKey(date) === today && <div className="cal-now" style={{ top: (now.getHours() + now.getMinutes() / 60) * 64 }} aria-label="Current time" />}
            </div>)}
          </div>
        </div>}
        <div className="cal-footer"><CalendarDays size={16} />{view === "month" ? "Select a date to open its hourly schedule." : "Select an empty hour to schedule a block. Select a block to edit it."}</div>
      </div>
      <Agenda date={selected} events={forDay(selected)} tasks={dueOn(selected)} onEdit={setEditor} onTask={setSelectedTaskId} onAdd={add} />
      {notice && <p className="cal-notice" role="status">{notice}</p>}
      {editor && <EventEditor key={editor.id || `${editor.date}-${editor.start}`} initial={editor} onClose={() => setEditor(null)} onSave={event => { setEvents(current => [...current.filter(item => item.id !== event.id), event]); setSelected(dateFromKey(event.date)); setEditor(null); setNotice("Time block saved."); }} onDelete={id => { setEvents(current => current.filter(event => event.id !== id)); setEditor(null); setNotice("Time block deleted."); }} />}
    </section>
  );
}
