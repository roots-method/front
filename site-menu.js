// Case Work is hidden from navigation for now. results.html and case-study.html
// are still live and reachable by direct URL — to bring the section back, restore
// the { href: "results.html", label: "Case Work" } entry below.
window.SITE_MENU_ITEMS = [
  { href: "index.html", label: "Home" },
  { href: "our-flow.html", label: "Our Flow" },
  { href: "about.html", label: "About" },
  { href: "blog.html", label: "Blog" },
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
