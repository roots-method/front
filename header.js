(function () {
  var menuItems = (window.SITE_MENU_ITEMS || []).filter(function (item) {
    return item.href !== "index.html";
  });
  var activePage = window.SITE_ACTIVE_PAGE
    ? window.SITE_ACTIVE_PAGE()
    : window.location.pathname.split("/").pop() || "index.html";

  // Root-absolute so the injected nav resolves the same from / and from /blog/.
  function url(href) {
    return "/" + href;
  }

  var navMarkup = menuItems
    .map(function (item) {
      // An entry can share a destination with another (Support and Contact both
      // point at the contact page); noActive keeps only one of them lit.
      var active = !item.noActive && item.href === activePage ? " is-active" : "";
      return (
        '<a class="nav__link' +
        active +
        '" href="' +
        url(item.href) +
        '">' +
        item.label +
        "</a>"
      );
    })
    .join("");

  var headerMarkup =
    // The striped wordmark carries the name itself, so there is no separate
    // text to set beside it. alt covers what the image says.
    '<a class="brand" href="/index.html" aria-label="Arka home">' +
    '<img class="brand__logo" src="/assets/arka-wordmark.svg" alt="Arka" width="255" height="130" />' +
    '</a>' +
    '<nav class="nav__links" id="primary-nav" aria-label="Primary navigation">' +
    navMarkup +
    "</nav>" +
    '<div class="nav__tools">' +
    '<a class="btn btn--primary btn--nav" href="/contact.html">Get Started</a>' +
    '<button class="nav__toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu">' +
    '<span class="nav__toggle-bar" aria-hidden="true"></span>' +
    '<span class="nav__toggle-bar" aria-hidden="true"></span>' +
    '<span class="nav__toggle-bar" aria-hidden="true"></span>' +
    "</button>" +
    "</div>";

  function bindNavScroll() {
    if (window.__arkaNavScrollBound) return;
    window.__arkaNavScrollBound = true;

    var scrollThreshold = 48;

    function updateNavScroll() {
      var scrolled = window.scrollY > scrollThreshold;
      document.querySelectorAll(".nav").forEach(function (nav) {
        nav.classList.toggle("nav--scrolled", scrolled);
      });
    }

    window.addEventListener("scroll", updateNavScroll, { passive: true });
    updateNavScroll();
  }

  document.querySelectorAll("[data-component='site-header']").forEach(function (header) {
    header.innerHTML = headerMarkup;
    header.classList.add("nav--ready");
  });

  bindNavScroll();
})();
