/**
 * Card metadata for the blog index — no body content. Each post is its own
 * route under app/blog/<slug>/page.tsx with its prose in the component, so
 * crawlers get real HTML and each post carries its own metadata and
 * BlogPosting JSON-LD.
 *
 * Adding a post: create app/blog/<slug>/page.tsx, add the slug to
 * BLOG_POST_ORDER (newest first) and its object to BLOG_POSTS, then add the URL
 * to app/sitemap.ts and public/llms.txt.
 */

export type BlogPost = {
  slug: string;
  /** Per-post tint used on the card. */
  accent: string;
  label: string;
  title: string;
  teaser: string;
  /** ISO date, used for machine-readable metadata. */
  date: string;
  /** Human date, used in the card and byline. */
  dateLabel: string;
  readTime: string;
  kicker: string;
};

export const BLOG_POST_ORDER: string[] = [
  "agents-vs-rule-engines",
  "inside-the-roi-blueprint",
  "finding-your-highest-value-workflow"
];

export const BLOG_POSTS: Record<string, BlogPost> = {
  "agents-vs-rule-engines": {
    "slug": "agents-vs-rule-engines",
    "accent": "#a8a4e0",
    "label": "AI Automation",
    "title": "When a workflow needs agents instead of another rule engine",
    "teaser": "Rule engines are excellent at binary conditions and quietly terrible at ambiguity. The dividing line is not complexity — it is whether the decision requires weighing conflicting evidence. Here is the test we apply before recommending either one.",
    "date": "2026-08-12",
    "dateLabel": "12 August 2026",
    "readTime": "7 min read",
    "kicker": "Decision framework"
  },
  "inside-the-roi-blueprint": {
    "slug": "inside-the-roi-blueprint",
    "accent": "#9dc5be",
    "label": "ROI Blueprint",
    "title": "What actually goes into an ROI Blueprint",
    "teaser": "Most automation proposals lead with the technology. A blueprint leads with the arithmetic: which workflow, how much it currently costs to run, what changes, and how you will know whether it worked. A walk through the document itself.",
    "date": "2026-07-29",
    "dateLabel": "29 July 2026",
    "readTime": "6 min read",
    "kicker": "How we work"
  },
  "finding-your-highest-value-workflow": {
    "slug": "finding-your-highest-value-workflow",
    "accent": "#c4bda5",
    "label": "Workflow Intelligence",
    "title": "Finding your highest-value workflow before you automate anything",
    "teaser": "The most expensive automation mistake is not picking the wrong tool. It is picking the wrong workflow — usually the loudest one rather than the costliest one. Four signals that separate the two.",
    "date": "2026-07-15",
    "dateLabel": "15 July 2026",
    "readTime": "6 min read",
    "kicker": "Operations"
  }
};

export function orderedPosts(): BlogPost[] {
  return BLOG_POST_ORDER.map((slug) => BLOG_POSTS[slug]).filter(Boolean);
}
