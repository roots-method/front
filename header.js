(function () {
  var menuItems = (window.SITE_MENU_ITEMS || []).filter(function (item) {
    return item.href !== "index.html";
  });
  var currentPage = window.location.pathname.split("/").pop() || "index.html";

  var navMarkup = menuItems
    .map(function (item) {
      var active = item.href === currentPage ? " is-active" : "";
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
    '<a class="brand" href="index.html" aria-label="DheeNode home">' +
    '<span class="brand__mark">DN</span>' +
    '<span class="brand__name">DheeNode</span>' +
    "</a>" +
    '<button class="nav__toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu">' +
    '<span class="nav__toggle-bar" aria-hidden="true"></span>' +
    '<span class="nav__toggle-bar" aria-hidden="true"></span>' +
    '<span class="nav__toggle-bar" aria-hidden="true"></span>' +
    "</button>" +
    '<nav class="nav__links" id="primary-nav" aria-label="Primary navigation">' +
    navMarkup +
    "</nav>";

  document.querySelectorAll("[data-component='site-header']").forEach(function (header) {
    header.innerHTML = headerMarkup;
    header.classList.add("nav--ready");
  });
})();
