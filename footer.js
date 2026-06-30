(function () {
  const INQUIRY_EMAIL = "info@surajanalytics.com";
  const CONTACT_EMAIL = "info@surajanalytics.com";

  const menuItems = window.SITE_MENU_ITEMS || [];

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const activePage = currentPage === "case-study.html" ? "results.html" : currentPage;

  const inquiryMailto =
    "mailto:" +
    INQUIRY_EMAIL +
    "?subject=" +
    encodeURIComponent("Inquiry from Suraj Analytics Website") +
    "&body=" +
    encodeURIComponent(
      "Hello Suraj Analytics,\n\nI would like to discuss a workflow or business opportunity.\n\n"
    );

  const menuMarkup = menuItems
    .map(function (item) {
      const active = item.href === activePage ? " is-active" : "";
      return (
        '<a class="site-footer__menu-link' +
        active +
        '" href="' +
        item.href +
        '">' +
        item.label +
        "</a>"
      );
    })
    .join("");

  const footerMarkup =
    '<div class="site-footer__grid">' +
    '<div class="site-footer__brand">' +
    '<a class="site-footer__brand-link" href="index.html" aria-label="Suraj Analytics home">' +
    '<span class="site-footer__mark">Suraj / Analytics</span>' +
    "</a>" +
    "</div>" +
    '<div class="site-footer__column">' +
    '<h2 class="site-footer__heading">Menu</h2>' +
    '<nav class="site-footer__menu" aria-label="Footer navigation">' +
    menuMarkup +
    "</nav>" +
    "</div>" +
    '<div class="site-footer__column">' +
    '<h2 class="site-footer__heading">Contact Us</h2>' +
    '<ul class="site-footer__list">' +
    '<li><a href="mailto:' +
    CONTACT_EMAIL +
    '">' +
    CONTACT_EMAIL +
    "</a></li>" +
    "<li><span>Inquiry: " +
    INQUIRY_EMAIL +
    "</span></li>" +
    "</ul>" +
    "</div>" +
    '<div class="site-footer__column">' +
    '<h2 class="site-footer__heading">Follow</h2>' +
    '<div class="site-footer__social" aria-label="Social links">' +
    '<a class="site-footer__social-link" target="_blank" href="https://www.linkedin.com/company/dhee-node/?viewAsMember=true" aria-label="LinkedIn">in</a>' +
    '<a class="site-footer__social-link" target="_blank" href="https://x.com/_jazoo" aria-label="X">X</a>' +
    "</div>" +
    "</div>" +
    '<div class="site-footer__cta">' +
    '<a class="btn btn--primary site-footer__inquiry" href="' +
    inquiryMailto +
    '">Send Inquiry</a>' +
    "</div>" +
    "</div>" +
    '<div class="site-footer__legal">' +
    '<span>&copy; <span id="footer-year"></span> Suraj Analytics</span>' +
    "</div>";

  document.querySelectorAll("[data-component='site-footer']").forEach(function (footer) {
    footer.innerHTML = footerMarkup;
    footer.classList.add("site-footer--ready");

    var yearNode = footer.querySelector("#footer-year");
    if (yearNode) {
      yearNode.textContent = String(new Date().getFullYear());
    }
  });
})();
