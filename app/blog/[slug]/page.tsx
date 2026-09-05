import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseNav from "@/components/CaseNav";
import { BLOG_POSTS, BLOG_POST_ORDER } from "@/lib/blog-posts";
import { getPostContent } from "@/lib/blog-content";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

// Every post is known at build time, so all three are statically generated.
export function generateStaticParams() {
  return BLOG_POST_ORDER.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];
  if (!post) return { title: "Post not found", robots: { index: false, follow: true } };

  const content = await getPostContent(slug);
  const description = content?.summary ?? post.teaser;

  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${slug}`,
      title: post.title,
      description,
      publishedTime: post.date,
    },
    twitter: { title: post.title, description },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];
  const content = await getPostContent(slug);
  if (!post || !content) notFound();

  const url = `${SITE_URL}/blog/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    url,
    headline: post.title,
    description: content.summary,
    datePublished: post.date,
    articleSection: post.label,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    author: { "@id": `${SITE_URL}/#org` },
    publisher: { "@id": `${SITE_URL}/#org` },
  };

  return (
    <article
      className="case-article post-article"
      style={{ "--case-accent": post.accent } as React.CSSProperties}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="case-article__header">
        <span className="case-article__label">{post.label}</span>
        <h1>{post.title}</h1>
        <p className="case-article__summary">{content.summary}</p>
        <div className="case-article__meta">
          {content.meta.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>

      <div className="case-article__wrap">
        <aside className="case-article__sidebar">
          <Link className="case-article__back" href="/blog">
            Back to blog
          </Link>
          <CaseNav headings={content.sections.map((s) => s.heading)} />
        </aside>

        <div className="case-article__body">
          {/* The heading goes in with the prose rather than as a JSX child:
              `.case-article__section p + p` and `.check-list + p` are sibling
              selectors, so a wrapper element around the prose would change what
              they match. This keeps the DOM identical to the old static file. */}
          {content.sections.map((section, i) => (
            <section
              className="case-article__section"
              id={`cs-section-${i}`}
              key={section.heading}
              dangerouslySetInnerHTML={{
                __html: `<h2>${section.heading}</h2>${section.html}`,
              }}
            />
          ))}
          {content.tail ? <div dangerouslySetInnerHTML={{ __html: content.tail }} /> : null}
        </div>
      </div>
    </article>
  );
}
