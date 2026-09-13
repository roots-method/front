"use client";

import { useEffect, useState } from "react";

/** Shared with the inline script in app/layout.tsx; change both or neither. */
export const THEME_KEY = "arka-theme";

function apply(dark: boolean) {
  const root = document.documentElement;
  if (dark) root.dataset.theme = "dark";
  else delete root.dataset.theme;
}

/**
 * The dark-mode switch in the footer.
 *
 * Light is the default for every first visit, whatever the device's own
 * setting; this only ever turns dark on by request, and remembers the answer.
 *
 * The theme itself is not applied here. An inline script in the document head
 * reads the stored choice and sets data-theme before the first paint, so a
 * returning dark-mode visitor never sees a flash of the light site. This
 * component only reads that attribute once mounted, which is why it starts
 * unpressed on the server: the server cannot know, and guessing would mismatch
 * on hydration.
 *
 * It is a toggle button with a fixed label and aria-pressed, rather than a label
 * that flips between "Dark" and "Light": a screen reader then hears one control
 * with an on/off state instead of a name that changes under it.
 */
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
    // Another tab changed the setting: follow it, so two open tabs agree.
    const onStorage = (e: StorageEvent) => {
      if (e.key !== THEME_KEY) return;
      const next = e.newValue === "dark";
      apply(next);
      setDark(next);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function toggle() {
    const next = !dark;
    apply(next);
    setDark(next);
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      // Storage blocked: the switch still works for this page view.
    }
  }

  return (
    <button type="button" className="theme-toggle" aria-pressed={dark} onClick={toggle}>
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb" />
      </span>
      Dark mode
    </button>
  );
}
