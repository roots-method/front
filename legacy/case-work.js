(function () {
  var container = document.querySelector("[data-component='case-grid']");
  if (!container) return;

  var studies = window.CASE_STUDIES || {};
  var order = window.CASE_STUDY_ORDER || Object.keys(studies);

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function primaryIndustry(label) {
    return (label || "").split("·")[0].trim();
  }

  // ── Featured card (first study) ──────────────────────────────────────
  var featuredSlug = order[0];
  var featuredStudy = featuredSlug && studies[featuredSlug];
  var featuredHtml = "";

  if (featuredStudy) {
    var fi = primaryIndustry(featuredStudy.label);
    var fm = featuredStudy.metrics && featuredStudy.metrics[0];
    var fa = featuredStudy.accent || "";

    featuredHtml =
      '<a class="case-featured reveal" data-industry="' + escapeHtml(fi) + '"' +
      ' href="case-study.html?slug=' + encodeURIComponent(featuredStudy.slug) + '"' +
      (fa ? ' style="--case-accent: ' + escapeHtml(fa) + ';"' : "") + ">" +
        '<div class="case-featured__visual">' +
          (fm
            ? '<div class="case-featured__stat">' +
                '<span class="case-featured__stat-value">' + escapeHtml(fm.value) + "</span>" +
                '<span class="case-featured__stat-label">' + escapeHtml(fm.label) + "</span>" +
              "</div>"
            : "") +
        "</div>" +
        '<div class="case-featured__body">' +
          '<div class="case-featured__meta">' +
            '<span class="case-card__label">' + escapeHtml(featuredStudy.label) + "</span>" +
            (featuredStudy.engagement
              ? '<span class="case-card__duration">' + escapeHtml(featuredStudy.engagement) + "</span>"
              : "") +
          "</div>" +
          '<h2 class="case-featured__title">' + escapeHtml(featuredStudy.title) + "</h2>" +
          '<p class="case-featured__excerpt">' + escapeHtml(featuredStudy.teaser || featuredStudy.summary) + "</p>" +
          '<div class="case-featured__footer">' +
            '<span class="case-card__cta">Read case study</span>' +
            (featuredStudy.readTime
              ? '<span class="case-card__read-time">' + escapeHtml(featuredStudy.readTime) + "</span>"
              : "") +
          "</div>" +
        "</div>" +
      "</a>";
  }

  // ── Grid of remaining studies ────────────────────────────────────────
  var gridItems = order.slice(1).map(function (slug) {
    var study = studies[slug];
    if (!study) return "";

    var industry = primaryIndustry(study.label);
    var topMetric = study.metrics && study.metrics[0];
    var accentAttr = study.accent
      ? ' style="--case-accent: ' + escapeHtml(study.accent) + ';"'
      : "";

    var metricHtml = topMetric
      ? '<div class="case-card__metric">' +
          '<span class="case-card__metric-value">' + escapeHtml(topMetric.value) + "</span>" +
          '<span class="case-card__metric-label">' + escapeHtml(topMetric.label) + "</span>" +
        "</div>"
      : "";

    return (
      '<a class="case-card reveal"' + accentAttr +
      ' data-industry="' + escapeHtml(industry) + '"' +
      ' href="case-study.html?slug=' + encodeURIComponent(study.slug) + '">' +
        "<div class=\"case-card__visual\"></div>" +
        '<div class="case-card__body">' +
          '<div class="case-card__header">' +
            '<span class="case-card__label">' + escapeHtml(study.label) + "</span>" +
            (study.engagement
              ? '<span class="case-card__duration">' + escapeHtml(study.engagement) + "</span>"
              : "") +
          "</div>" +
          "<h2>" + escapeHtml(study.title) + "</h2>" +
          metricHtml +
          "<p>" + escapeHtml(study.teaser || study.summary) + "</p>" +
          '<div class="case-card__footer">' +
            '<span class="case-card__cta">Read case study</span>' +
            (study.readTime
              ? '<span class="case-card__read-time">' + escapeHtml(study.readTime) + "</span>"
              : "") +
          "</div>" +
        "</div>" +
      "</a>"
    );
  });

  container.innerHTML =
    featuredHtml +
    '<div class="case-grid">' + gridItems.join("") + "</div>";
})();
