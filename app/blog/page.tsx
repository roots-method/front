import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/CtaPanel";
import { orderedPosts } from "@/lib/blog-posts";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — notes on building systems that actually get used",
  description:
    "What Arka has learned scoping, building, and measuring automation work — written for the people who have to live with the result.",
  alternates: { canonical: "/blog" },
  openGraph: {
    url: "/blog",
    title: "Blog — Arka",
    description: "Notes on building systems that actually get used.",
  },
};

export default function BlogIndexPage() {
  const posts = orderedPosts();
  const [featured, ...rest] = posts;

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />

      <section className="page-hero page-hero--cases">
        <p className="eyebrow">
          <img className="icon-sm" src="/assets/icons-ai-ibm/data-analytics.svg" alt="" />
          Blog
        </p>
        <h1>
          Notes on <em>building systems</em> that{" "}
          <span className="accent">actually get used.</span>
        </h1>
        <p className="page-hero__sub">
          What we&rsquo;ve learned scoping, building, and measuring automation work — written for
          the people who have to <span className="highlight">live with the result</span>.
        </p>
      </section>

      <div className="case-work-layout">
        {featured ? (
          <Link
            className="case-featured reveal"
            href={`/blog/${featured.slug}`}
            style={{ "--case-accent": featured.accent } as React.CSSProperties}
          >
            <div className="case-featured__visual">
              <div className="case-featured__stat post-featured__stat">
                <span className="post-featured__kicker">{featured.kicker || "Latest"}</span>
                <span className="case-featured__stat-label">{featured.dateLabel}</span>
              </div>
            </div>
            <div className="case-featured__body">
              <div className="case-featured__meta">
                <span className="case-card__label">{featured.label}</span>
                <span className="case-card__duration">Latest</span>
              </div>
              <h2 className="case-featured__title">{featured.title}</h2>
              <p className="case-featured__excerpt">{featured.teaser}</p>
              <div className="case-featured__footer">
                <span className="case-card__cta">Read post</span>
                <span className="case-card__read-time">{featured.readTime}</span>
              </div>
            </div>
          </Link>
        ) : null}

        <div className="case-grid">
          {rest.map((post) => (
            <Link
              className="case-card reveal"
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ "--case-accent": post.accent } as React.CSSProperties}
            >
              <div className="case-card__visual" />
              <div className="case-card__body">
                <div className="case-card__header">
                  <span className="case-card__label">{post.label}</span>
                  <span className="case-card__duration">{post.dateLabel}</span>
                </div>
                <h2>{post.title}</h2>
                <p>{post.teaser}</p>
                <div className="case-card__footer">
                  <span className="case-card__cta">Read post</span>
                  <span className="case-card__read-time">{post.readTime}</span>
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
