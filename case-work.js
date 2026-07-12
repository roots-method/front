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

  function primaryIndustry(label) {
    return (label || "").split("·")[0].trim();
  }

  grid.innerHTML = order
    .map(function (slug) {
      var study = studies[slug];
      if (!study) return "";

      var accentStyle = study.accent
        ? ' style="--case-accent: ' + escapeHtml(study.accent) + ';"'
        : "";

      var industry = primaryIndustry(study.label);
      var topMetric = study.metrics && study.metrics[0];

      var metricHtml = topMetric
        ? '<div class="case-card__metric">' +
            '<span class="case-card__metric-value">' + escapeHtml(topMetric.value) + "</span>" +
            '<span class="case-card__metric-label">' + escapeHtml(topMetric.label) + "</span>" +
          "</div>"
        : "";

      var durationHtml = study.engagement
        ? '<span class="case-card__duration">' + escapeHtml(study.engagement) + "</span>"
        : "";

      var readTimeHtml = study.readTime
        ? '<span class="case-card__read-time">' + escapeHtml(study.readTime) + "</span>"
        : "";

      return (
        '<a class="case-card reveal"' +
        accentStyle +
        ' data-industry="' + escapeHtml(industry) + '"' +
        ' href="case-study.html?slug=' + encodeURIComponent(study.slug) + '">' +
          '<div class="case-card__header">' +
            '<span class="case-card__label">' + escapeHtml(study.label) + "</span>" +
            durationHtml +
          "</div>" +
          "<h2>" + escapeHtml(study.title) + "</h2>" +
          metricHtml +
          "<p>" + escapeHtml(study.teaser || study.summary) + "</p>" +
          '<div class="case-card__footer">' +
            '<span class="case-card__cta">Read case study</span>' +
            readTimeHtml +
          "</div>" +
        "</a>"
      );
    })
    .join("");

  // Industry filter
  var pills = document.querySelectorAll(".case-filter__pill");
  pills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      pills.forEach(function (p) { p.classList.remove("is-active"); });
      pill.classList.add("is-active");

      var filter = pill.dataset.filter;
      var cards = grid.querySelectorAll(".case-card");
      cards.forEach(function (card) {
        var match = filter === "all" || card.dataset.industry === filter;
        card.style.display = match ? "" : "none";
      });
    });
  });
})();
