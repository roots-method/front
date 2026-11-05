import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import AppointmentFlow from "@/components/AppointmentFlow";
import SubmissionFlow from "@/components/SubmissionFlow";
import CaseNav from "@/components/CaseNav";
import { CASE_STUDY_ORDER, CASE_STUDIES, getPublishedCaseStudy, type CaseBarChart, type CaseScenarioTable, type CaseStudy } from "@/lib/case-studies";
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
  const study = slug ? getPublishedCaseStudy(slug) : undefined;

  if (!study) {
    return { title: "Case study not found", robots: { index: false, follow: true } };
  }

  const title = `${study.title} — Case Work`;
  return {
    title,
    description: study.summary,
    alternates: { canonical: pageUrl(study.slug) },
    openGraph: {
      url: pageUrl(study.slug),
      title,
      description: study.summary,
      images: [{ url: "/assets/arka-social-card.png", width: 1200, height: 630, alt: `${study.title} — Arka case work` }],
    },
    twitter: { card: "summary_large_image", title, description: study.summary, images: ["/assets/arka-social-card.png"] },
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
    <section className="case-notes-related">
      <div>
        <p>More Case Work</p>
        <h2>Keep exploring.</h2>
      </div>
      <div className="case-notes-related__list">
        {related.map((item) => (
          <Link
            className="case-notes-related__item"
            key={item.slug}
            href={`/case-study?slug=${encodeURIComponent(item.slug)}`}
          >
            <div>
              <p>{item.label}</p>
              <h3>{item.title}</h3>
            </div>
            {item.metrics[0] ? (
              <div className="case-notes-related__metric">
                <strong>{item.metrics[0].value}</strong>
                <span>{item.metrics[0].label}</span>
              </div>
            ) : null}
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function EffortChart({ chart }: { chart: CaseBarChart }) {
  return (
    <figure className="case-effort-chart" aria-labelledby="effort-chart-title">
      <figcaption>
        <strong id="effort-chart-title">{chart.title}</strong>
        <span>{chart.description}</span>
      </figcaption>
      <div className="case-effort-chart__legend" aria-hidden="true">
        <span><i className="case-effort-chart__swatch case-effort-chart__swatch--estimate" />Estimated</span>
        <span><i className="case-effort-chart__swatch case-effort-chart__swatch--actual" />Actual</span>
      </div>
      <div className="case-effort-chart__plot" role="img" aria-label={`${chart.title}. Estimated effort ranged from ${chart.rows[0]?.estimated} to ${chart.max - 2.5} working days; actual effort was 2 working days in each release.`}>
        {chart.rows.map((row) => (
          <div className="case-effort-chart__group" key={row.label}>
            <div className="case-effort-chart__bars" aria-hidden="true">
              <span className="case-effort-chart__bar case-effort-chart__bar--estimate" style={{ height: `${(row.estimated / chart.max) * 100}%` }}>
                <b>{row.estimated}</b>
              </span>
              <span className="case-effort-chart__bar case-effort-chart__bar--actual" style={{ height: `${(row.actual / chart.max) * 100}%` }}>
                <b>{row.actual}</b>
              </span>
            </div>
            <span className="case-effort-chart__label">{row.label}</span>
          </div>
        ))}
      </div>
      <table className="sr-only">
        <caption>{chart.title}</caption>
        <thead><tr><th>Release</th><th>Estimated working days</th><th>Actual working days</th></tr></thead>
        <tbody>{chart.rows.map((row) => <tr key={row.label}><th>{row.label}</th><td>{row.estimated}</td><td>{row.actual}</td></tr>)}</tbody>
      </table>
    </figure>
  );
}

function ScenarioTable({ table }: { table: CaseScenarioTable }) {
  return (
    <div className="case-scenario-table" role="region" aria-label={table.caption} tabIndex={0}>
      <table>
        <caption>{table.caption}</caption>
        <thead>
          <tr>{table.headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={cell} scope="row">{cell}</th> : <td key={cell}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
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
    <div className="case-article case-notes-detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="case-article__backbar">
        <Link className="case-article__back" href="/results">
          <span aria-hidden="true">&#8592;</span> Back to Case Work
        </Link>
      </div>

      <header className="case-article__header">
        <p className="case-article__label">{study.label}</p>
        <h1>{study.title}</h1>
        <p className="case-article__summary">{study.summary}</p>
        <div className="case-article__meta">
          <span>{study.readTime}</span>
          <span>{study.engagement}</span>
        </div>
      </header>

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

      <div className="case-article__reading-layout">
        <div className="case-article__body">
            {study.sections.map((section, i) => (
              <section className="case-article__section" id={`cs-section-${i}`} key={section.heading}>
                <h2>{section.heading}</h2>
                <div className="case-article__section-content">
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
                  {section.chart ? <EffortChart chart={section.chart} /> : null}
                  {section.flow === "appointment-operations" ? <AppointmentFlow /> : null}
                  {section.flow === "insurance-submission" ? <SubmissionFlow /> : null}
                  {section.scenarioTable ? <ScenarioTable table={section.scenarioTable} /> : null}
                </div>
              </section>
            ))}
        </div>
        <aside className="case-article__sidebar" aria-label="Case study index">
          <p>On this page</p>
          <CaseNav headings={study.sections.map((section) => section.heading)} />
        </aside>
      </div>

      <RelatedCases currentSlug={study.slug} />
      <section className="case-notes-detail__closing">
        <p>Start with your workflow.</p>
        <Link href="/contact">Discuss your operation <span aria-hidden="true">↗</span></Link>
      </section>
    </div>
  );
}

export default async function CaseStudyPage({ searchParams }: Props) {
  const { slug } = await searchParams;
  const study = slug ? getPublishedCaseStudy(slug) : undefined;
  return study ? <Article study={study} /> : <NotFound />;
}
