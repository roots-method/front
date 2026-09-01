// Case Work, Our Flow and Blog are hidden from navigation for now. All of those
// pages are still live, still deployed and still in sitemap.xml — they are just
// not linked from the header or footer. To bring one back, restore its entry:
//
//   { href: "our-flow.html", label: "Our Flow" }
//   { href: "blog.html",     label: "Blog" }
//   { href: "results.html",  label: "Case Work" }
//
// The SITE_ACTIVE_PAGE aliases below are deliberately kept so each section still
// resolves correctly the moment it is restored.
//
// The three solutions sit directly in the bar — there is no dropdown. Support
// carries `noActive` because it shares contact.html with the Contact entry, and
// without it both would light up as the current page at once.
window.SITE_MENU_ITEMS = [
  { href: "index.html", label: "Home" },
  { href: "software.html", label: "Software" },
  { href: "products.html", label: "Products" },
  { href: "contact.html", label: "Support", noActive: true },
  { href: "about.html", label: "About" },
  { href: "contact.html", label: "Contact" },
];

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
