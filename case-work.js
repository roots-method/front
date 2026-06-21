(function () {
  var grid = document.querySelector("[data-component='case-grid']");
  if (!grid) return;

  var studies = window.CASE_STUDIES || {};
  var order = window.CASE_STUDY_ORDER || Object.keys(studies);

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  grid.innerHTML = order
    .map(function (slug) {
      var study = studies[slug];
      if (!study) return "";

      var accentStyle = study.accent
        ? ' style="--case-accent: ' + escapeHtml(study.accent) + ';"'
        : "";

      return (
        '<a class="case-card reveal"' +
        accentStyle +
        ' href="case-study.html?slug=' +
        encodeURIComponent(study.slug) +
        '">' +
        '<span class="case-card__label">' +
        escapeHtml(study.label) +
        "</span>" +
        "<h2>" +
        escapeHtml(study.title) +
        "</h2>" +
        "<p>" +
        escapeHtml(study.teaser || study.summary) +
        "</p>" +
        '<span class="case-card__cta">Read case study</span>' +
        "</a>"
      );
    })
    .join("");
})();
