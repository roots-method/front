"use client";

import { useEffect, useRef, useState } from "react";

export type SplitStep = {
  num: string;
  title: string;
  body: string;
};

export type SplitPanel = {
  icon: string;
  tag: string;
  heading: string;
  points: string[];
};

/**
 * Sticky split-scroll: the steps column scrolls while the visual column stays
 * pinned, and the panel matching the step in view is the one shown.
 *
 * Steps and panels are paired by index here rather than by a data-step number,
 * so the two arrays cannot silently drift out of sync the way the old
 * `data-step="N"` / `data-panel="N"` attributes could.
 *
 * Below 860px there is nothing to be sticky against, so CSS shows every panel
 * in order after the steps instead of one that would swap off-screen.
 */
export default function ProcessSplit({
  steps,
  panels,
  label = "Our process",
}: {
  steps: SplitStep[];
  panels: SplitPanel[];
  label?: string;
}) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = stepRefs.current.indexOf(entry.target as HTMLDivElement);
          if (i >= 0) setActive(i);
        }
      },
      { threshold: 0.45, rootMargin: "-5% 0px -45% 0px" },
    );

    for (const el of stepRefs.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <section className="process-split" aria-label={label}>
      <div className="process-split__steps">
        {steps.map((step, i) => (
          <div
            className="process-split__step"
            key={step.title}
            data-step={i + 1}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
          >
            <span className="process-split__num">{step.num}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        ))}
      </div>

      <div className="process-split__sticky">
        <div className="process-visual">
          {panels.map((panel, i) => (
            <div
              className={`process-visual__panel${i === active ? " is-active" : ""}`}
              key={panel.heading}
              data-panel={i + 1}
            >
              <span
                className="process-visual__icon"
                style={
                  { "--menu-icon": `url('/assets/icons-ai-ibm/${panel.icon}')` } as React.CSSProperties
                }
                aria-hidden="true"
              />
              <span className="process-visual__tag">{panel.tag}</span>
              <p className="process-visual__heading">{panel.heading}</p>
              <ul className="pv-list">
                {panel.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
