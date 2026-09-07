import { useEffect, useRef } from "react";

// Only the topmost dialog owns Escape and Tab while nested dialogs are open.
const stack = [];
export default function useModal(open, onClose) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!open || !ref.current) return;
    const element = ref.current;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    const focusable = () => [...element.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]')].filter(node => node.getClientRects().length);
    stack.push(element);
    document.body.style.overflow = "hidden";
    (element.querySelector('[data-initial-focus]') || focusable()[0] || element).focus();
    const handleKey = event => {
      if (stack.at(-1) !== element) return;
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        closeRef.current();
      }
      if (event.key === "Tab") {
        const items = focusable();
        const first = items[0] || element;
        const last = items.at(-1) || element;
        if (event.shiftKey && (document.activeElement === first || !element.contains(document.activeElement))) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !element.contains(document.activeElement))) {
          event.preventDefault(); first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey, true);
    return () => {
      stack.splice(stack.indexOf(element), 1);
      document.removeEventListener("keydown", handleKey, true);
      document.body.style.overflow = overflow;
      if (previous?.isConnected) previous.focus();
    };
  }, [open]);
  return ref;
}
