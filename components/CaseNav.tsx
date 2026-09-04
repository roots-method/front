"use client";

import { useEffect, useState } from "react";

const NAV_OFFSET = 100; // sticky header height + breathing room

/**
 * The vertical timeline down the left of a case study. Clicking scrolls the
 * heading clear of the sticky header rather than under it, and the active dot
 * follows whichever section top has most recently passed the threshold.
 */
export default function CaseNav({ headings }: { headings: string[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const update = () => {
      const sections = document.querySelectorAll<HTMLElement>(".case-article__section");
      if (!sections.length) return;
      const threshold = NAV_OFFSET + 16;
      let idx = 0;
      sections.forEach((sec, i) => {
        if (sec.getBoundingClientRect().top <= threshold) idx = i;
      });
      setActive(idx);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [headings.length]);

  // Fewer than two sections is not a timeline, it is a stray dot.
  if (headings.length < 2) return null;

  return (
    <nav className="cs-nav" aria-label="Jump to section">
      {headings.map((heading, i) => (
        <a
          className={`cs-nav__item${i === active ? " is-active" : ""}`}
          key={heading}
          href={`#cs-section-${i}`}
          onClick={(e) => {
            const target = document.getElementById(`cs-section-${i}`);
            if (!target) return;
            e.preventDefault();
            window.scrollTo({
              top: target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET,
              behavior: "smooth",
            });
          }}
        >
          <span className="cs-nav__dot" />
          <span className="cs-nav__label">{heading}</span>
        </a>
      ))}
    </nav>
  );
}
