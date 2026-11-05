import type { Metadata } from "next";
import Link from "next/link";
import { orderedCaseStudies, type CaseStudy } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Case Work: systems built for clarity, speed and compounding returns",
  description:
    "A sample of the outcomes Arka pursues with clients, reducing manual drag, tightening workflows, and making execution easier to measure.",
  alternates: { canonical: "/results" },
  openGraph: {
    url: "/results",
    title: "Case Work | Arka",
    description:
      "Systems built for clarity, speed, and compounding returns. A sample of our client work.",
    images: [{ url: "/assets/arka-social-card.png", width: 1200, height: 630, alt: "Arka case work" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Work | Arka",
    description: "Systems built for clarity, speed, and compounding returns. A sample of our client work.",
    images: ["/assets/arka-social-card.png"],
  },
};

function caseHref(study: CaseStudy) {
  return `/case-study?slug=${encodeURIComponent(study.slug)}`;
}

export default function ResultsPage() {
  const studies = orderedCaseStudies();
  const [featured, ...rest] = studies;

  return (
    <div className="case-notes">
      <section className="case-notes__hero">
        <p className="case-notes__eyebrow">Case Work</p>
        <div className="case-notes__intro">
          <h1>Systems that make work move.</h1>
          <p>Short notes on the operational problems we help teams untangle.</p>
        </div>
        <span>{String(studies.length).padStart(2, "0")} case notes</span>
      </section>

      {featured ? (
        <section className="case-notes__featured" aria-labelledby="featured-case-title">
          <p className="case-notes__eyebrow">Featured note · {featured.label}</p>
          <Link className="case-notes__featured-link" href={caseHref(featured)}>
            <div>
              <h2 id="featured-case-title">{featured.title}</h2>
              <p>{featured.teaser || featured.summary}</p>
              <span>Open case note <b aria-hidden="true">↗</b></span>
            </div>
            <div className="case-notes__metrics" aria-label="Key outcomes">
              {featured.metrics.slice(0, 3).map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </Link>
        </section>
      ) : null}

      <section className="case-notes__archive" aria-labelledby="case-index-title">
        <div className="case-notes__archive-heading">
          <h2 id="case-index-title">More notes from the field.</h2>
          <p>Each begins with one operational problem and a practical way through it.</p>
        </div>
        <div className="case-notes__grid">
          {rest.map((study, index) => (
            <Link className="case-notes__card" key={study.slug} href={caseHref(study)}>
              <div className="case-notes__card-top">
                <span>{String(index + 2).padStart(2, "0")}</span>
                <p>{study.label}</p>
              </div>
              <h3>{study.title}</h3>
              {study.metrics[0] ? (
                <div className="case-notes__card-metric">
                  <strong>{study.metrics[0].value}</strong>
                  <span>{study.metrics[0].label}</span>
                </div>
              ) : null}
              <span className="case-notes__arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="case-notes__closing">
        <p>Have a workflow in mind?</p>
        <Link href="/contact">Start with a 40-minute scoping call <span aria-hidden="true">↗</span></Link>
      </section>
    </div>
  );
}
