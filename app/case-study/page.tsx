import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CaseNav from "@/components/CaseNav";
import CtaPanel from "@/components/CtaPanel";
import { CASE_STUDY_ORDER, CASE_STUDIES, getCaseStudy, type CaseStudy } from "@/lib/case-studies";
import { SITE_URL } from "@/lib/site";

// The old site served these at /case-study.html?slug=<slug>. Keeping the query
// shape means every indexed link and every sitemap entry still resolves — the
// .html redirect in next.config.ts carries the query across. Metadata is still
// built on the server, so crawlers get the right title and description; the
// page is just rendered per-request rather than at build time.
type Props = { searchParams: Promise<{ slug?: string }> };

function pageUrl(slug: string) {
  return `${SITE_URL}/case-study?slug=${encodeURIComponent(slug)}`;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { slug } = await searchParams;
  const study = slug ? getCaseStudy(slug) : undefined;

  if (!study) {
    return { title: "Case study not found", robots: { index: false, follow: true } };
  }

  const title = `${study.title} — Case Work`;
  return {
    title,
    description: study.summary,
    alternates: { canonical: pageUrl(study.slug) },
    openGraph: { url: pageUrl(study.slug), title, description: study.summary },
    twitter: { title, description: study.summary },
  };
}

function NotFound() {
  return (
    <section className="page-hero">
      <p className="eyebrow">
        <img className="icon-sm" src="/assets/icons-ai-ibm/data-analytics.svg" alt="" />
        Case Work
      </p>
      <h1>We could not find that case study.</h1>
      <p>The link may be outdated or the case study may have moved.</p>
      <Link className="btn btn--ghost case-article__back" href="/results">
        Back to Case Work
      </Link>
    </section>
  );
}

function RelatedCases({ currentSlug }: { currentSlug: string }) {
  const related = CASE_STUDY_ORDER.filter((s) => s !== currentSlug)
    .slice(0, 3)
    .map((s) => CASE_STUDIES[s])
    .filter(Boolean);

  if (!related.length) return null;

  return (
    <section className="case-article__related">
      <p className="eyebrow">More Case Work</p>
      <h2>Related outcomes from the field.</h2>
      <div className="case-grid case-grid--related">
        {related.map((item) => (
          <Link
            className="case-card case-card--compact"
            key={item.slug}
            href={`/case-study?slug=${encodeURIComponent(item.slug)}`}
            style={{ "--case-accent": item.accent } as React.CSSProperties}
          >
            <div className="case-card__header">
              <span className="case-card__label">{item.label}</span>
              {item.engagement ? (
                <span className="case-card__duration">{item.engagement}</span>
              ) : null}
            </div>
            <h2>{item.title}</h2>
            {item.metrics[0] ? (
              <div className="case-card__metric">
                <span className="case-card__metric-value">{item.metrics[0].value}</span>
                <span className="case-card__metric-label">{item.metrics[0].label}</span>
              </div>
            ) : null}
            <p>{item.teaser || item.summary}</p>
            <div className="case-card__footer">
              <span className="case-card__cta">Read case study</span>
              {item.readTime ? <span className="case-card__read-time">{item.readTime}</span> : null}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Article({ study }: { study: CaseStudy }) {
  const url = pageUrl(study.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        url,
        name: study.title,
        headline: study.title,
        description: study.summary,
        articleSection: study.label,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        author: { "@id": `${SITE_URL}/#org` },
        publisher: { "@id": `${SITE_URL}/#org` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Case Work", item: `${SITE_URL}/results` },
          { "@type": "ListItem", position: 3, name: study.title, item: url },
        ],
      },
    ],
  };

  return (
    <div className="case-article" style={{ "--case-accent": study.accent } as React.CSSProperties}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="case-article__wrap">
        <aside className="case-article__sidebar">
          <Link className="case-article__back" href="/results">
            <span aria-hidden="true">&#8592;</span> Back to Case Work
          </Link>
          <CaseNav headings={study.sections.map((s) => s.heading)} />
        </aside>

        <div className="case-article__main">
          {/* No back link here — it lives in the sidebar. */}
          <header className="case-article__header">
            <p className="case-article__label">{study.label}</p>
            <h1>{study.title}</h1>
            <p className="case-article__summary">{study.summary}</p>
            <div className="case-article__meta">
              <span>{study.readTime}</span>
              <span>{study.engagement}</span>
            </div>
          </header>

          {/* Ochre values: numbers only, which is exactly what these are. */}
          <div className="cs-stat" aria-label="Case study outcomes">
            {study.metrics.map((metric, i) => (
              <Fragment key={metric.label}>
                <div className="cs-stat__item">
                  <span className="cs-stat__value">{metric.value}</span>
                  <span className="cs-stat__label">{metric.label}</span>
                </div>
                {i < study.metrics.length - 1 ? (
                  <div className="cs-stat__divider" aria-hidden="true" />
                ) : null}
              </Fragment>
            ))}
          </div>

          <div className="case-article__body">
            {study.sections.map((section, i) => (
              <section className="case-article__section" id={`cs-section-${i}`} key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
                {section.list?.length ? (
                  <ul className="check-list">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {section.diagram ? (
                  <figure className="case-article__diagram">
                    <img src={section.diagram} alt={section.diagramAlt ?? ""} loading="lazy" />
                  </figure>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </div>

      <RelatedCases currentSlug={study.slug} />

      <CtaPanel
        className="case-article__cta"
        eyebrow="Your workflow"
        heading="See what this kind of clarity could look like in your operation."
        primaryLabel="Start with an ROI blueprint"
        watermark={false}
        secondary={
          <Link className="btn btn--ghost" href="/results">
            View more case work
          </Link>
        }
      />
    </div>
  );
}

export default async function CaseStudyPage({ searchParams }: Props) {
  const { slug } = await searchParams;
  const study = slug ? getCaseStudy(slug) : undefined;
  return study ? <Article study={study} /> : <NotFound />;
}
