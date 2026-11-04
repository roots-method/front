"use client";

import { useState } from "react";

const STEPS = [
  {
    title: "Record appointment",
    system: "The shared dashboard records the clinic, provider, appointment time, intake status, and current owner.",
    staff: "The front desk creates or updates the appointment from one location or provider view.",
  },
  {
    title: "Confirm and remind",
    system: "A configured rule sends the SMS reminder through Twilio and records its delivery state.",
    staff: "Staff handle replies or follow up where a reminder cannot be delivered.",
  },
  {
    title: "Record the outcome",
    system: "Once the appointment time passes, the dashboard exposes the outstanding outcome and any follow-up task.",
    staff: "The desk records checked in, cancelled, rescheduled, no-show, or needs follow-up.",
  },
  {
    title: "Fill an opening",
    system: "When a slot opens, rules filter the waitlist by clinic, provider, and availability.",
    staff: "The desk calls the suggested patient and completes the booking. The system never auto-books.",
  },
] as const;

export default function AppointmentFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const active = STEPS[activeStep];

  return (
    <section className="appointment-flow" aria-labelledby="appointment-flow-title">
      <div className="appointment-flow__heading">
        <p>How the workflow moves</p>
        <h3 id="appointment-flow-title">A simple rules-driven loop.</h3>
      </div>
      <div className="appointment-flow__steps" role="tablist" aria-label="Appointment operations sequence">
        {STEPS.map((step, index) => (
          <button
            aria-controls="appointment-flow-detail"
            aria-selected={activeStep === index}
            className={activeStep === index ? "is-active" : undefined}
            id={`appointment-flow-step-${index}`}
            key={step.title}
            onClick={() => setActiveStep(index)}
            role="tab"
            type="button"
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {step.title}
          </button>
        ))}
      </div>
      <div
        aria-labelledby={`appointment-flow-step-${activeStep}`}
        className="appointment-flow__detail"
        id="appointment-flow-detail"
        role="tabpanel"
      >
        <div><span>System rule</span><p>{active.system}</p></div>
        <div><span>Front desk action</span><p>{active.staff}</p></div>
      </div>
    </section>
  );
}
