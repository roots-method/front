"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "arka-cookie-consent";

export default function CookieConsent() {
  // Starts hidden and is only shown after the mount check, so the server HTML
  // and the first client render agree — reading localStorage during render
  // would hydrate a banner for people who already dismissed it.
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(CONSENT_KEY);
    } catch {
      // Private mode or blocked storage: showing the banner is the safe default.
    }
    if (stored) return;
    setShow(true);
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!show) return null;

  const dismiss = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // Nothing to persist to; dismissing for this session is still correct.
    }
    setVisible(false);
    window.setTimeout(() => setShow(false), 400);
  };

  return (
    <div
      className={`cookie-banner${visible ? " cookie-banner--visible" : ""}`}
      role="region"
      aria-label="Cookie consent"
    >
      <div className="cookie-banner__inner">
        <p className="cookie-banner__text">
          We use essential browser storage (no tracking cookies) to remember your preferences. Read
          our{" "}
          <button className="cookie-banner__policy" type="button" data-privacy-modal>
            Privacy Policy
          </button>
          .
        </p>
        <div className="cookie-banner__actions">
          <button
            className="btn btn--primary cookie-banner__accept"
            type="button"
            onClick={() => dismiss("accepted")}
          >
            <span className="btn__label">Accept</span>
          </button>
          <button
            className="cookie-banner__decline"
            type="button"
            onClick={() => dismiss("declined")}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
