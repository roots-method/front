import Link from "next/link";
import type { ReactNode } from "react";

/** Booking links leave the site; internal routes must stay <Link> for
 *  client-side navigation. */
function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

const DEFAULT_HEADING =
  "The gap between where you are and where you want to be is a systems problem. Let’s close it.";

/* Two step lists while the 40-minute offer is rolled out page by page.
   BLUEPRINT_CTA_STEPS is the current copy and is what /, /software and /about
   render; /products builds its own list from the same first step. DEFAULT_STEPS
   is the old 30-minute wording, still rendered by /our-flow, /results, /blog and
   the case studies because those pages have not been migrated yet.

   When they are, delete DEFAULT_STEPS and make BLUEPRINT_CTA_STEPS the default.
   /contact carries its own 30-minute line too — grep for "30-min". */
export const SCOPING_CALL_STEP =
  "Book a 40-mins scoping call. No commitment required.";

export const BLUEPRINT_CTA_STEPS = [
  SCOPING_CALL_STEP,
  "We map your highest-value workflow opportunity",
  "You receive a tailored ROI Blueprint within 5 business days",
];

const DEFAULT_STEPS = [
  "Book a 30-min scoping call. No commitment required",
  "We map your highest-value workflow opportunity",
  "You receive a tailored ROI Blueprint within 5 business days",
];

/**
 * The closing panel on Home, Software, Products, About and Our Flow. It was
 * copy-pasted into each page in the old build; one component keeps the shape
 * and the promise from drifting apart. Products overrides the heading and the
 * three steps because its offer is a migration audit rather than a blueprint.
 *
 * The watermark is `filter: saturate(0) brightness(0)` at 0.045 opacity, so it
 * is a black ghost whatever colour the source file is.
 */
export default function CtaPanel({
  eyebrow = "Ready When You Are",
  heading = DEFAULT_HEADING,
  steps = DEFAULT_STEPS,
  primaryLabel = "Speak with our team",
  primaryHref = "/contact",
  secondary,
  watermark = true,
  className,
}: {
  eyebrow?: string;
  heading?: ReactNode;
  steps?: string[];
  primaryLabel?: string;
  /** An absolute URL opens in a new tab; anything else routes internally. */
  primaryHref?: string;
  secondary?: ReactNode;
  /** About drops it; every other page carries it. */
  watermark?: boolean;
  /** Extra class on the section itself — the case article styles
   *  `.cta-panel.case-article__cta`, so it cannot be a wrapper. */
  className?: string;
}) {
  return (
    <section className={className ? `cta-panel ${className}` : "cta-panel"}>
      {watermark ? (
        <img
          className="cta-panel__watermark"
          src="/assets/arkaflow-newlogo.svg"
          alt=""
          aria-hidden="true"
        />
      ) : null}
      <div className="cta-panel__header">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{heading}</h2>
      </div>
      <ol className="cta-panel__steps">
        {steps.map((step, i) => (
          <li key={step}>
            <span className="cta-panel__step-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="cta-panel__step-text">{step}</span>
          </li>
        ))}
      </ol>
      <div className="cta-panel__action">
        {isExternal(primaryHref) ? (
          <a
            className="btn btn--primary"
            href={primaryHref}
            target="_blank"
            rel="noopener"
          >
            {primaryLabel}
            <span className="nav__arrow" aria-hidden="true">
              &#8599;
            </span>
          </a>
        ) : (
          <Link className="btn btn--primary" href={primaryHref}>
            {primaryLabel}
            <span className="nav__arrow" aria-hidden="true">
              &#8599;
            </span>
          </Link>
        )}
        {secondary}
        <p className="cta-panel__note">We respond within one business day.</p>
      </div>
    </section>
  );
}
