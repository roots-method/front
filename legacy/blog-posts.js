// Card metadata for the blog index. The full text of each post lives in its own
// static file at blog/<slug>.html so crawlers get real HTML.
// Adding a post: create blog/<slug>.html, add the slug to BLOG_POST_ORDER
// (newest first) and the object to BLOG_POSTS, then add the URL to sitemap.xml.

window.BLOG_POST_ORDER = [
  "agents-vs-rule-engines",
  "inside-the-roi-blueprint",
  "finding-your-highest-value-workflow",
];

window.BLOG_POSTS = {
  "agents-vs-rule-engines": {
    slug: "agents-vs-rule-engines",
    accent: "#a8a4e0",
    label: "AI Automation",
    title: "When a workflow needs agents instead of another rule engine",
    teaser:
      "Rule engines are excellent at binary conditions and quietly terrible at ambiguity. The dividing line is not complexity — it is whether the decision requires weighing conflicting evidence. Here is the test we apply before recommending either one.",
    date: "2026-08-12",
    dateLabel: "12 August 2026",
    readTime: "7 min read",
    kicker: "Decision framework",
  },

  "inside-the-roi-blueprint": {
    slug: "inside-the-roi-blueprint",
    accent: "#9dc5be",
    label: "ROI Blueprint",
    title: "What actually goes into an ROI Blueprint",
    teaser:
      "Most automation proposals lead with the technology. A blueprint leads with the arithmetic: which workflow, how much it currently costs to run, what changes, and how you will know whether it worked. A walk through the document itself.",
    date: "2026-07-29",
    dateLabel: "29 July 2026",
    readTime: "6 min read",
    kicker: "How we work",
  },

  "finding-your-highest-value-workflow": {
    slug: "finding-your-highest-value-workflow",
    accent: "#c4bda5",
    label: "Workflow Intelligence",
    title: "Finding your highest-value workflow before you automate anything",
    teaser:
      "The most expensive automation mistake is not picking the wrong tool. It is picking the wrong workflow — usually the loudest one rather than the costliest one. Four signals that separate the two.",
    date: "2026-07-15",
    dateLabel: "15 July 2026",
    readTime: "6 min read",
    kicker: "Operations",
  },
};
