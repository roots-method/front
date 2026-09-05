import type { MetadataRoute } from "next";
import { BLOG_POST_ORDER, BLOG_POSTS } from "@/lib/blog-posts";
import { CASE_STUDY_ORDER } from "@/lib/case-studies";
import { SITE_URL } from "@/lib/site";

/**
 * Generated rather than hand-maintained: adding a case study or post to its
 * data module is now enough to get it listed. The old sitemap.xml had to be
 * edited by hand, which is how entries went stale.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [
    ["/", 1.0],
    ["/software", 0.9],
    ["/products", 0.9],
    ["/about", 0.8],
    ["/our-flow", 0.8],
    ["/results", 0.8],
    ["/blog", 0.7],
    ["/contact", 0.7],
  ];

  return [
    ...pages.map(([path, priority]) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      priority,
    })),
    ...CASE_STUDY_ORDER.map((slug) => ({
      url: `${SITE_URL}/case-study?slug=${encodeURIComponent(slug)}`,
      lastModified: new Date(),
      priority: 0.6,
    })),
    ...BLOG_POST_ORDER.map((slug) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: new Date(BLOG_POSTS[slug].date),
      priority: 0.6,
    })),
  ];
}
