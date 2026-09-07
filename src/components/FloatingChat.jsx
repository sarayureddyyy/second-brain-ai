import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Bot, MessageCircle, Minus, Sparkles } from "lucide-react";
import { defaultTasks } from "../app/defaultData.js";
import { readStorage } from "../utils/storage.js";
import { chatReply } from "../utils/chat.js";
import "./floating-chat.css";

const welcome = { role: "assistant", text: "Hey, I’m Sprout 🌱\nA little help for your busy brain. What would you like to work on?" };
const suggestions = ["What’s due today?", "What should I focus on?", "Show my schedule"];

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([welcome]);
  const input = useRef(null);
  const launcher = useRef(null);
  const history = useRef(null);
  const close = () => { setOpen(false); launcher.current?.focus(); };
  useEffect(() => { if (open) input.current?.focus(); }, [open]);
  useEffect(() => {
    if (open && history.current) history.current.scrollTop = history.current.scrollHeight;
  }, [messages, open]);

  const send = text => {
    const content = text.trim();
    if (!content) return;
    const reply = chatReply(content, {
      tasks: readStorage("second-brain-ai.tasks.v2", defaultTasks),
      events: readStorage("second-brain-ai.calendar.v1", []),
    });
    setMessages(current => [...current, { role: "user", text: content }, { role: "assistant", ...reply }]);
    setDraft("");
    input.current?.focus();
  };

  return <div className="sprout-widget">
    {open && <section id="sprout-chat" className="sprout-panel" role="dialog" aria-modal="false" aria-labelledby="sprout-title" onKeyDown={event => {
      if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); close(); }
    }}>
      <header className="sprout-header">
        <span className="sprout-avatar" aria-hidden="true"><Bot size={27} strokeWidth={1.8} /></span>
        <div><h2 id="sprout-title">Sprout <Sparkles size={13} aria-hidden="true" /></h2><p>Your workspace buddy</p></div>
        <button className="sprout-minimize" type="button" onClick={close} aria-label="Minimize chat"><Minus size={20} /></button>
      </header>
      <div className="sprout-local">Local helper · AI chat coming soon</div>
      <div className="sprout-messages" ref={history} role="log" aria-label="Chat messages" aria-live="polite" aria-relevant="additions" tabIndex={0}>
        {messages.map((message, index) => <div className={`sprout-message sprout-${message.role}`} key={index}>
          <span className="sr-only">{message.role === "user" ? "You" : "Sprout"}: </span>
          <p>{message.text}</p>
          {message.action && <Link className="sprout-action" to={message.action.href} onClick={close}>{message.action.label} <span aria-hidden="true">↗</span></Link>}
        </div>)}
      </div>
      <div className="sprout-suggestions" aria-label="Suggested questions">{suggestions.map(text => <button type="button" onClick={() => send(text)} key={text}>{text}</button>)}</div>
      <form className="sprout-composer" onSubmit={event => { event.preventDefault(); send(draft); }}>
        <label className="sr-only" htmlFor="sprout-input">Message Sprout</label>
        <textarea ref={input} id="sprout-input" value={draft} maxLength={2000} rows={2} placeholder="Ask about your day…" onChange={event => setDraft(event.target.value)} onKeyDown={event => {
          if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); send(draft); }
        }} />
        <button type="submit" disabled={!draft.trim()} aria-label="Send message"><ArrowUp size={20} /></button>
      </form>
      <p className="sprout-privacy">Uses this browser’s tasks and calendar. No messages sent to a server.</p>
    </section>}
    <button ref={launcher} className={`sprout-launcher ${open ? "sprout-is-open" : ""}`} type="button" onClick={() => open ? close() : setOpen(true)} aria-label={open ? "Close Sprout chat" : "Chat with Sprout"} aria-expanded={open} aria-controls="sprout-chat">
      <span className="sprout-launcher-icon" aria-hidden="true">{open ? <MessageCircle size={28} /> : <Bot size={32} strokeWidth={1.8} />}</span>
      {!open && <span className="sprout-spark" aria-hidden="true"><Sparkles size={12} /></span>}
    </button>
  </div>;
}
