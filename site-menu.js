// Case Work is hidden from navigation for now. results.html and case-study.html
// are still live and reachable by direct URL — to bring the section back, restore
// the { href: "results.html", label: "Case Work" } entry below.
//
// An item with `menu: "solutions"` and no `href` is a dropdown trigger, not a link.
// header.js renders it as the Solution mega-menu from window.SITE_SOLUTIONS;
// footer.js flattens its children into plain links.
window.SITE_MENU_ITEMS = [
  { href: "index.html", label: "Home" },
  { href: "our-flow.html", label: "Our Flow" },
  { label: "Solution", menu: "solutions" },
  { href: "about.html", label: "About" },
  { href: "blog.html", label: "Blog" },
  { href: "contact.html", label: "Contact" },
];

// Solution mega-menu. Each item renders as a row on the left of the panel;
// hovering (or focusing) a row swaps the description shown on the right.
// Written for business owners, not engineers — plain language, one promise each.
//
// `href` is where the row itself goes; `cta` is the link at the foot of the panel.
// Software has its own page; Products and Support still point at the contact
// page until dedicated pages exist.
window.SITE_SOLUTIONS = {
  id: "solutions",
  label: "Solution",
  items: [
    {
      id: "software",
      label: "Software",
      href: "software.html",
      icon: "ibm-watsonx--code-assistant",
      summary: "Built for the way you work",
      title: "Custom software, shaped around your business",
      description:
        "We build digital solutions tailored to what your business actually needs — not a template you have to bend around. Start with one free hour of consulting to work out where the real gaps are.",
      cta: {
        label: "Claim your free 1-hour consult",
        href: "https://calendar.notion.so/meet/sumit-ntn/arka",
        external: true,
      },
    },
    {
      id: "products",
      label: "Products",
      href: "contact.html",
      icon: "ibm-granite",
      summary: "The apps your team already knows",
      title: "Business-first apps, set up and ready to run",
      description:
        "Deploy the everyday tools your team already trusts — Google Workspace, Zoho, CRM, sales platforms and many more — configured, connected and working together from day one.",
      cta: {
        label: "See what we can set up",
        href: "contact.html",
      },
    },
    {
      id: "support",
      label: "Support",
      href: "contact.html",
      icon: "operations--field",
      summary: "Someone looking after it, always",
      title: "Support that keeps everything running",
      description:
        "Continuous back-office operations and day-to-day care for your entire digital ecosystem — and yes, that includes the infrastructure underneath it all.",
      cta: {
        label: "Talk to our support team",
        href: "contact.html",
      },
    },
  ],
};

// Resolves the menu item that should render as active for the current URL.
// Detail pages live under their own paths, so they alias to their index page:
//   case-study.html   -> results.html
//   /blog/<slug>.html -> blog.html
window.SITE_ACTIVE_PAGE = function () {
  var path = window.location.pathname;
  var page = path.split("/").pop() || "index.html";
  if (page === "" || page === "/") page = "index.html";
  if (page === "case-study.html") return "results.html";
  if (/\/blog\//.test(path)) return "blog.html";
  return page;
};
