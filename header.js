(function () {
  var allItems = window.SITE_MENU_ITEMS || [];
  var menuItems = allItems.filter(function (item) {
    return item.href !== "index.html";
  });
  var activePage = window.SITE_ACTIVE_PAGE
    ? window.SITE_ACTIVE_PAGE()
    : window.location.pathname.split("/").pop() || "index.html";

  // Root-absolute so the injected nav resolves the same from / and from /blog/.
  function url(href) {
    return "/" + href;
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // External links keep their absolute URL; internal ones get the leading slash.
  function itemHref(href) {
    return /^(https?:)?\/\//.test(href) ? href : url(href);
  }

  var chevron =
    '<span class="nav__chevron" aria-hidden="true"></span>';

  // Solution mega-menu: a list of solutions on the left, and one description
  // panel on the right that swaps as you hover or focus each row (megamenu.js).
  function solutionsMarkup(item) {
    var data = window.SITE_SOLUTIONS;
    if (!data || !data.items || !data.items.length) return "";

    var panelId = "nav-menu-" + data.id;
    // Solution only lights up for a page that belongs to it. Rows still
    // pointing at the contact page would otherwise make both Solution and
    // Contact read as active at once.
    var anyActive = data.items.some(function (solution) {
      var ownPage = !allItems.some(function (entry) {
        return entry.href === solution.href;
      });
      return ownPage && solution.href === activePage;
    });

    var rows = data.items
      .map(function (solution, index) {
        return (
          '<a class="megamenu__item' +
          (index === 0 ? " is-selected" : "") +
          '" href="' +
          esc(itemHref(solution.href)) +
          '" data-solution="' +
          esc(solution.id) +
          '">' +
          '<span class="megamenu__item-icon" aria-hidden="true" style="--menu-icon: url(\'/assets/icons-ai-ibm/' +
          esc(solution.icon) +
          '.svg\')"></span>' +
          '<span class="megamenu__item-text">' +
          '<span class="megamenu__item-label">' + esc(solution.label) + "</span>" +
          '<span class="megamenu__item-summary">' + esc(solution.summary) + "</span>" +
          "</span>" +
          chevron +
          "</a>"
        );
      })
      .join("");

    var panels = data.items
      .map(function (solution, index) {
        var cta = solution.cta || {};
        var external = cta.external
          ? ' target="_blank" rel="noopener"'
          : "";
        return (
          '<div class="megamenu__panel' +
          (index === 0 ? " is-selected" : "") +
          '" data-panel="' +
          esc(solution.id) +
          '">' +
          '<h2 class="megamenu__panel-title">' + esc(solution.title) + "</h2>" +
          '<p class="megamenu__panel-copy">' + esc(solution.description) + "</p>" +
          '<a class="megamenu__cta" href="' +
          esc(itemHref(cta.href)) +
          '"' +
          external +
          ">" +
          esc(cta.label) +
          '<span class="nav__arrow' +
          (cta.external ? "" : " nav__arrow--right") +
          '" aria-hidden="true">&#8599;</span>' +
          "</a>" +
          "</div>"
        );
      })
      .join("");

    return (
      '<div class="nav__group" data-menu="' + esc(data.id) + '">' +
      '<button class="nav__link nav__trigger' +
      (anyActive ? " is-active" : "") +
      '" type="button" aria-expanded="false" aria-controls="' +
      panelId +
      '">' +
      esc(item.label) +
      chevron +
      "</button>" +
      '<div class="megamenu" id="' + panelId + '">' +
      '<div class="megamenu__inner">' +
      '<div class="megamenu__list">' + rows + "</div>" +
      '<div class="megamenu__panels">' + panels + "</div>" +
      "</div>" +
      "</div>" +
      "</div>"
    );
  }

  var navMarkup = menuItems
    .map(function (item) {
      if (item.menu === "solutions") return solutionsMarkup(item);
      var active = item.href === activePage ? " is-active" : "";
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
    '<a class="brand" href="/index.html" aria-label="Arka home">' +
    '<img class="brand__mark" src="/assets/arkaflow-newlogo.svg" alt="" width="32" height="32" aria-hidden="true" />' +
    '<div class="brand__wordmark">' +
    '<span class="brand__name">Arka</span>' +
    '</div>' +
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
