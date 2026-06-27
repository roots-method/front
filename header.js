(function () {
  var menuItems = (window.SITE_MENU_ITEMS || []).filter(function (item) {
    return item.href !== "index.html";
  });
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  var activePage = currentPage === "case-study.html" ? "results.html" : currentPage;

  var navMarkup = menuItems
    .map(function (item) {
      var active = item.href === activePage ? " is-active" : "";
      return (
        '<a class="nav__link' +
        active +
        '" href="' +
        item.href +
        '">' +
        item.label +
        "</a>"
      );
    })
    .join("");

  var headerMarkup =
    '<a class="brand" href="index.html" aria-label="Suraj Analytics home">' +
    '<span class="brand__name">' +
    '<span class="brand__word">Suraj</span>' +
    '<span class="brand__divider" aria-hidden="true">/</span>' +
    '<span class="brand__word">Analytics</span>' +
    '</span>' +
    '</a>' +
    '<nav class="nav__links" id="primary-nav" aria-label="Primary navigation">' +
    navMarkup +
    "</nav>" +
    '<div class="nav__tools">' +
    '<button class="theme-toggle" type="button" data-theme-pref="light" aria-label="Switch to dark theme">' +
    '<svg class="theme-toggle__icon theme-toggle__icon--light" viewBox="0 0 24 24" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8"/>' +
    '<path d="M12 2.5v2.2M12 19.3v2.2M4.5 12h2.2M17.3 12h2.2M6.4 6.4l1.6 1.6M16 16l1.6 1.6M17.6 6.4 16 8M8 16l-1.6 1.6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
    "</svg>" +
    '<svg class="theme-toggle__icon theme-toggle__icon--dark" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M18.5 13.2a6.8 6.8 0 0 1-8.7-8.7A7 7 0 1 0 18.5 13.2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>' +
    "</svg>" +
    "</button>" +
    '<button class="nav__toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu">' +
    '<span class="nav__toggle-bar" aria-hidden="true"></span>' +
    '<span class="nav__toggle-bar" aria-hidden="true"></span>' +
    '<span class="nav__toggle-bar" aria-hidden="true"></span>' +
    "</button>" +
    "</div>";

  function bindNavScroll() {
    if (window.__surajNavScrollBound) return;
    window.__surajNavScrollBound = true;

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

    if (window.SurajAnalyticsTheme && typeof window.SurajAnalyticsTheme.bind === "function") {
      window.SurajAnalyticsTheme.bind();
    }
  });

  bindNavScroll();
})();
