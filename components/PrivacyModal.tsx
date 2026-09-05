"use client";

import { useEffect, useState } from "react";

/**
 * Opened by any `[data-privacy-modal]` button anywhere on the page — the footer
 * link and the cookie banner both use one. Delegating on document keeps that
 * contract from the old build without threading a callback through every
 * component that wants to offer the link.
 */
export default function PrivacyModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-privacy-modal]")) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="privacy-modal" role="dialog" aria-modal="true" aria-label="Privacy Policy">
      <div className="privacy-modal__backdrop" onClick={() => setOpen(false)} />
      <div className="privacy-modal__panel">
        <button
          className="privacy-modal__close"
          type="button"
          aria-label="Close Privacy Policy"
          autoFocus
          onClick={() => setOpen(false)}
        >
          &times;
        </button>
        <div className="privacy-modal__body">
          <p className="eyebrow">Legal</p>
          <h2>Privacy Policy</h2>
          <p className="privacy-modal__meta">Last updated: 1 September 2026</p>

          <h3>Who we are</h3>
          <p>
            Arka (<a href="https://www.arkaflow.co">arkaflow.co</a>) builds intelligent software for
            enterprise operations. Contact:{" "}
            <a href="mailto:build@arkaflow.co">build@arkaflow.co</a>.
          </p>

          <h3>What we collect</h3>
          <p>
            <strong>Contact form</strong>: name, work email, company, and message you submit. Used
            solely to respond to your enquiry (legal basis: legitimate interest, Art. 6(1)(f) GDPR).
          </p>
          <p>
            <strong>Browser storage</strong>: we store your consent choice in{" "}
            <code>localStorage</code> only. No personal data, never transmitted to our servers.
          </p>
          <p>
            <strong>Server logs</strong>: this site is hosted on GitHub Pages. GitHub may log IP
            addresses and browser agents under their own{" "}
            <a
              href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
              target="_blank"
              rel="noopener"
            >
              Privacy Statement
            </a>
            .
          </p>

          <h3>Third parties</h3>
          <p>
            Contact form submissions are routed through <strong>FormSubmit</strong> (formsubmit.co)
            before reaching our inbox. We do not use Google Analytics, advertising cookies, or
            tracking pixels.
          </p>

          <h3>Cookies</h3>
          <p>
            This site sets <strong>no cookies</strong>. We use <code>localStorage</code> for consent
            preferences only, stored locally in your browser and never shared.
          </p>

          <h3>Data retention</h3>
          <p>
            Contact enquiries are kept for up to 2 years or until the matter is resolved, whichever
            comes first.
          </p>

          <h3>Your rights (GDPR / UK GDPR)</h3>
          <p>
            You have the right to access, correct, erase, restrict, or port your personal data, and
            to object to processing. Email <a href="mailto:build@arkaflow.co">build@arkaflow.co</a>{" "}
            to exercise any right, and we respond within 30 days. You may also lodge a complaint with
            your local data protection authority.
          </p>

          <h3>International transfers</h3>
          <p>
            GitHub Pages and FormSubmit may process data outside the EEA (including the US). GitHub
            relies on Standard Contractual Clauses for such transfers.
          </p>

          <h3>Changes</h3>
          <p>We may update this policy. The date above will reflect any changes.</p>
        </div>
      </div>
    </div>
  );
}
