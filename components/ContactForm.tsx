"use client";

import { useRef, useState } from "react";

// No backend: FormSubmit relays to the inbox. The honeypot field below
// (`_gotcha`) is what filters the bots.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/build@arkaflow.co";

type Status = { message: string; type: "success" | "error" } | null;

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>(null);
  const [sending, setSending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus(null);

    // novalidate on the form, so the browser's own messages only appear when
    // we ask for them — after the submit attempt, not while typing.
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const payload = new FormData(form);
    payload.append("_subject", "New inquiry from Arka website");
    payload.append("_template", "table");
    payload.append("_captcha", "false");

    setSending(true);
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });
      if (!response.ok) throw new Error("Request failed");
      await response.json();
      form.reset();
      setStatus({
        message: "Thanks — your inquiry was sent. We will get back to you soon.",
        type: "success",
      });
    } catch {
      setStatus({
        message: "Something went wrong. Please email us directly at build@arkaflow.co.",
        type: "error",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-form" id="contact-form" noValidate ref={formRef} onSubmit={onSubmit}>
      <p
        className={`contact-form__status field-full${
          status ? ` contact-form__status--${status.type}` : ""
        }`}
        id="contact-form-status"
        role="status"
        aria-live="polite"
        hidden={!status}
      >
        {status?.message}
      </p>

      <label className="contact-form__honeypot" aria-hidden="true">
        Leave blank
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </label>

      <label>
        First name
        <input type="text" name="first-name" placeholder="Your first name" required />
      </label>
      <label>
        Last name
        <input type="text" name="last-name" placeholder="Your last name" required />
      </label>
      <label>
        Work email
        <input type="email" name="email" placeholder="you@company.com" required />
      </label>
      <label>
        Company
        <input type="text" name="company" placeholder="Company name" />
      </label>
      <label className="field-full">
        What should improve?
        <textarea
          name="message"
          rows={5}
          placeholder="Share the workflow, bottleneck, or opportunity you want to explore."
          required
        />
      </label>

      <div className="contact-form__footer field-full">
        <button className="btn btn--primary" type="submit" disabled={sending}>
          <span className="btn__label">{sending ? "Sending..." : "Send inquiry"}</span>
          <span className="nav__arrow" aria-hidden="true">
            &#8599;
          </span>
        </button>
        <p className="contact-form__note">We respond within one business day.</p>
      </div>
    </form>
  );
}
