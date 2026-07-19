(function () {
  const CONTACT_EMAIL = "build@arkaflow.co";
  const BOOKING_URL = "https://calendar.notion.so/meet/sumit-ntn/arka";

  const menuItems = window.SITE_MENU_ITEMS || [];
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const activePage = currentPage === "case-study.html" ? "results.html" : currentPage;

  const menuMarkup = menuItems
    .map(function (item) {
      const active = item.href === activePage ? " is-active" : "";
      return (
        '<a class="site-footer__menu-link' + active + '" href="' + item.href + '">' +
        item.label +
        "</a>"
      );
    })
    .join("");

  const footerMarkup =
    '<div class="site-footer__grid">' +

    // Brand + tagline
    '<div class="site-footer__brand">' +
      '<a class="site-footer__brand-link" href="index.html" aria-label="Arka home">' +
        '<span class="site-footer__mark">' +
          '<img class="site-footer__logo" src="assets/arkaflow-newlogo.svg" alt="Arka" width="36" height="36" />' +
          'Arka' +
        '</span>' +
      "</a>" +
      '<p class="site-footer__tagline">Intelligent systems for mid-market operations.</p>' +
    "</div>" +

    // Menu
    '<div class="site-footer__column">' +
      '<h2 class="site-footer__heading">Menu</h2>' +
      '<nav class="site-footer__menu" aria-label="Footer navigation">' +
        menuMarkup +
      "</nav>" +
    "</div>" +

    // Contact
    '<div class="site-footer__column">' +
      '<h2 class="site-footer__heading">Contact</h2>' +
      '<ul class="site-footer__list">' +
        '<li><a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + "</a></li>" +
        '<li><a href="' + BOOKING_URL + '" target="_blank" rel="noopener">Book a call &#8599;</a></li>' +
      "</ul>" +
    "</div>" +

    // Follow
    '<div class="site-footer__column">' +
      '<h2 class="site-footer__heading">Follow</h2>' +
      '<div class="site-footer__social" aria-label="Social links">' +
        '<a class="site-footer__social-link" target="_blank" rel="noopener" href="https://www.linkedin.com/company/dhee-node/?viewAsMember=true" aria-label="LinkedIn">in</a>' +
        '<a class="site-footer__social-link" target="_blank" rel="noopener" href="https://x.com/_jazoo" aria-label="X / Twitter">X</a>' +
      "</div>" +
    "</div>" +

    // CTA
    '<div class="site-footer__cta">' +
      '<a class="btn btn--primary site-footer__inquiry" href="contact.html">' +
        'Book a discovery call' +
        '<span class="nav__arrow" aria-hidden="true">&#8599;</span>' +
      "</a>" +
    "</div>" +

    "</div>" +

    '<div class="site-footer__legal">' +
      '<span>&copy; <span id="footer-year"></span> Arka. All rights reserved.</span>' +
    "</div>";

  document.querySelectorAll("[data-component='site-footer']").forEach(function (footer) {
    footer.innerHTML = footerMarkup;
    footer.classList.add("site-footer--ready");
    var yearNode = footer.querySelector("#footer-year");
    if (yearNode) yearNode.textContent = String(new Date().getFullYear());
  });
})();
