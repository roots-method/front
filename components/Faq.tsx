"use client";

import { useEffect, useRef, useState } from "react";

export type FaqItem = { q: string; a: string };

/**
 * One open at a time. The body animates on max-height, which needs a real pixel
 * value rather than `auto` — so the open panel is measured from its own
 * scrollHeight on toggle. The chevron is a CSS mask over
 * assets/icons-ai-ibm/chevron--right.svg, rotated per state.
 */
export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Measured after commit rather than read during render: max-height needs a
  // real pixel value to animate to, and the element has to exist to be
  // measured. Closed panels go back to 0 so the transition runs both ways.
  useEffect(() => {
    bodyRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.maxHeight = open === i ? `${el.scrollHeight}px` : "0px";
    });
  }, [open]);

  return (
    <section className="faq" aria-label="Frequently asked questions">
      <div className="faq__header">
        <p className="eyebrow">Common questions</p>
        <h2>What teams ask us</h2>
      </div>
      <ul className="faq__list">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li className={`faq__item${isOpen ? " is-open" : ""}`} key={item.q}>
              <button
                className="faq__btn"
                aria-expanded={isOpen}
                aria-controls={`faq-${i + 1}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {item.q}
                <span className="faq__chevron" aria-hidden="true" />
              </button>
              <div
                className="faq__body"
                id={`faq-${i + 1}`}
                role="region"
                ref={(el) => {
                  bodyRefs.current[i] = el;
                }}
              >
                <p className="faq__body-inner">{item.a}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
