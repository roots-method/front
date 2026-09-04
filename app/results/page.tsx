import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/CtaPanel";
import { orderedCaseStudies, type CaseStudy } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Case Work — systems built for clarity, speed and compounding returns",
  description:
    "A sample of the outcomes Arka pursues with clients — reducing manual drag, tightening workflows, and making execution easier to measure.",
  alternates: { canonical: "/results" },
  openGraph: {
    url: "/results",
    title: "Case Work — Arka",
    description:
      "Systems built for clarity, speed, and compounding returns. A sample of our client work.",
  },
};

/** The label is "Industry · Function"; the card filters on the first half. */
function primaryIndustry(label: string): string {
  return label.split("·")[0].trim();
}

function caseHref(study: CaseStudy) {
  return `/case-study?slug=${encodeURIComponent(study.slug)}`;
}

export default function ResultsPage() {
  const studies = orderedCaseStudies();
  const [featured, ...rest] = studies;

  return (
    <>
      <section className="page-hero page-hero--cases">
        <p className="eyebrow">
          <img className="icon-sm" src="/assets/icons-ai-ibm/data-analytics.svg" alt="" />
          Case Work
        </p>
        <h1>
          Systems built for <em>clarity, speed,</em> and{" "}
          <span className="accent">compounding returns.</span>
        </h1>
        <p className="page-hero__sub">
          A sample of the kinds of outcomes we pursue with clients — reducing manual drag,
          tightening workflows, and making <span className="highlight">execution easier to measure</span>.
        </p>
      </section>

      <div className="case-work-layout">
        {featured ? (
          <Link
            className="case-featured reveal"
            data-industry={primaryIndustry(featured.label)}
            href={caseHref(featured)}
            style={{ "--case-accent": featured.accent } as React.CSSProperties}
          >
            <div className="case-featured__visual">
              {featured.metrics[0] ? (
                <div className="case-featured__stat">
                  <span className="case-featured__stat-value">{featured.metrics[0].value}</span>
                  <span className="case-featured__stat-label">{featured.metrics[0].label}</span>
                </div>
              ) : null}
            </div>
            <div className="case-featured__body">
              <div className="case-featured__meta">
                <span className="case-card__label">{featured.label}</span>
                {featured.engagement ? (
                  <span className="case-card__duration">{featured.engagement}</span>
                ) : null}
              </div>
              <h2 className="case-featured__title">{featured.title}</h2>
              <p className="case-featured__excerpt">{featured.teaser || featured.summary}</p>
              <div className="case-featured__footer">
                <span className="case-card__cta">Read case study</span>
                {featured.readTime ? (
                  <span className="case-card__read-time">{featured.readTime}</span>
                ) : null}
              </div>
            </div>
          </Link>
        ) : null}

        <div className="case-grid">
          {rest.map((study) => (
            <Link
              className="case-card reveal"
              key={study.slug}
              data-industry={primaryIndustry(study.label)}
              href={caseHref(study)}
              style={{ "--case-accent": study.accent } as React.CSSProperties}
            >
              <div className="case-card__visual" />
              <div className="case-card__body">
                <div className="case-card__header">
                  <span className="case-card__label">{study.label}</span>
                  {study.engagement ? (
                    <span className="case-card__duration">{study.engagement}</span>
                  ) : null}
                </div>
                <h2>{study.title}</h2>
                {study.metrics[0] ? (
                  <div className="case-card__metric">
                    <span className="case-card__metric-value">{study.metrics[0].value}</span>
                    <span className="case-card__metric-label">{study.metrics[0].label}</span>
                  </div>
                ) : null}
                <p>{study.teaser || study.summary}</p>
                <div className="case-card__footer">
                  <span className="case-card__cta">Read case study</span>
                  {study.readTime ? (
                    <span className="case-card__read-time">{study.readTime}</span>
                  ) : null}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <CtaPanel
        eyebrow="Work With Us"
        heading="Ready to find your highest-value workflow?"
        primaryLabel="Book a discovery call"
        watermark={false}
        secondary={
          <Link className="btn btn--ghost" href="/software">
            How we work
          </Link>
        }
      />
    </>
  );
}
