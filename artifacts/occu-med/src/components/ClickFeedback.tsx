import { useEffect } from "react";
export function ClickFeedback() {
  useEffect(() => {
    const timers = new Map<HTMLElement, ReturnType<typeof setTimeout>>();
    const feedback = (event: Event) => {
      if (
        event instanceof KeyboardEvent &&
        (!["Enter", " "].includes(event.key) || event.repeat)
      )
        return;
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(
              'button,a[href],[role="button"],input[type="submit"]',
            )
          : null;
      if (!target || target.matches(':disabled,[aria-disabled="true"]')) return;
      target.classList.add("is-press-lit");
      const previous = timers.get(target);
      if (previous) clearTimeout(previous);
      timers.set(
        target,
        setTimeout(() => {
          target.classList.remove("is-press-lit");
          timers.delete(target);
        }, 600),
      );
    };
    document.addEventListener("pointerdown", feedback, true);
    document.addEventListener("click", feedback, true);
    document.addEventListener("keydown", feedback, true);
    return () => {
      document.removeEventListener("pointerdown", feedback, true);
      document.removeEventListener("click", feedback, true);
      document.removeEventListener("keydown", feedback, true);
      timers.forEach((timer, element) => {
        clearTimeout(timer);
        element.classList.remove("is-press-lit");
      });
    };
  }, []);
  return null;
}
