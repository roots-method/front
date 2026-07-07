(function () {
  var studies = window.CASE_STUDIES || {};
  var container = document.querySelector("[data-component='case-study']");
  if (!container) return;

  var params = new URLSearchParams(window.location.search);
  var slug = params.get("slug");
  var study = slug ? studies[slug] : null;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderMetrics(metrics) {
    return metrics
      .map(function (metric) {
        return (
          '<article class="metric-card metric-card--case-accent">' +
          '<span class="metric-card__value">' +
          escapeHtml(metric.value) +
          "</span>" +
          "<p>" +
          escapeHtml(metric.label) +
          "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderSections(sections) {
    return sections
      .map(function (section) {
        var paragraphs = (section.paragraphs || [])
          .map(function (paragraph) {
            return "<p>" + escapeHtml(paragraph) + "</p>";
          })
          .join("");

        var list = "";
        if (section.list && section.list.length) {
          list =
            '<ul class="check-list">' +
            section.list
              .map(function (item) {
                return "<li>" + escapeHtml(item) + "</li>";
              })
              .join("") +
            "</ul>";
        }

        var diagram = "";
        if (section.diagram) {
          diagram =
            '<figure class="case-article__diagram">' +
            '<img src="' + escapeHtml(section.diagram) + '" alt="' + escapeHtml(section.diagramAlt || "") + '" loading="lazy" />' +
            "</figure>";
        }

        return (
          '<section class="case-article__section">' +
          "<h2>" +
          escapeHtml(section.heading) +
          "</h2>" +
          paragraphs +
          list +
          diagram +
          "</section>"
        );
      })
      .join("");
  }

  function renderRelatedCases(currentSlug) {
    var related = Object.keys(studies)
      .filter(function (key) {
        return key !== currentSlug;
      })
      .slice(0, 3)
      .map(function (key) {
        return studies[key];
      });

    if (!related.length) return "";

    var cards = related
      .map(function (item) {
        var accentStyle = item.accent
          ? ' style="--case-accent: ' + escapeHtml(item.accent) + ';"'
          : "";

        return (
          '<a class="case-card case-card--compact"' +
          accentStyle +
          ' href="case-study.html?slug=' +
          encodeURIComponent(item.slug) +
          '">' +
          '<span class="case-card__label">' +
          escapeHtml(item.label) +
          "</span>" +
          "<h2>" +
          escapeHtml(item.title) +
          "</h2>" +
          "<p>" +
          escapeHtml(item.teaser || item.summary) +
          "</p>" +
          '<span class="case-card__cta">Read case study</span>' +
          "</a>"
        );
      })
      .join("");

    return (
      '<section class="case-article__related">' +
      '<p class="eyebrow">More Case Work</p>' +
      "<h2>Related outcomes from the field.</h2>" +
      '<div class="case-grid case-grid--related">' +
      cards +
      "</div>" +
      "</section>"
    );
  }

  function renderNotFound() {
    document.title = "Case study not found — ArkaFlow";

    container.innerHTML =
      '<section class="page-hero">' +
      '<p class="eyebrow">' +
      '<img class="icon-sm" src="assets/icons-ai/07_data_stack.svg" alt="" />' +
      "Case Work" +
      "</p>" +
      "<h1>We could not find that case study.</h1>" +
      "<p>The link may be outdated or the case study may have moved.</p>" +
      '<a class="btn btn--ghost case-article__back" href="results.html">Back to Case Work</a>' +
      "</section>";
  }

  if (!study) {
    renderNotFound();
    return;
  }

  document.title = study.title + " — Case Work — ArkaFlow";

  var description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", study.summary);
  }

  if (study.accent) {
    container.style.setProperty("--case-accent", study.accent);
  }

  container.innerHTML =
    '<header class="case-article__header">' +
    '<a class="case-article__back" href="results.html">' +
    '<span aria-hidden="true">&#8592;</span> Back to Case Work' +
    "</a>" +
    '<p class="case-article__label">' +
    escapeHtml(study.label) +
    "</p>" +
    "<h1>" +
    escapeHtml(study.title) +
    "</h1>" +
    '<p class="case-article__summary">' +
    escapeHtml(study.summary) +
    "</p>" +
    '<div class="case-article__meta">' +
    "<span>" +
    escapeHtml(study.readTime) +
    "</span>" +
    "<span>" +
    escapeHtml(study.engagement) +
    "</span>" +
    "</div>" +
    "</header>" +
    '<section class="metric-band metric-band--case" aria-label="Case study outcomes">' +
    renderMetrics(study.metrics) +
    "</section>" +
    '<div class="case-article__body">' +
    renderSections(study.sections) +
    "</div>" +
    renderRelatedCases(study.slug) +
    '<section class="cta-panel case-article__cta">' +
    "<div>" +
    '<p class="eyebrow">Your workflow</p>' +
    "<h2>See what this kind of clarity could look like in your operation.</h2>" +
    "</div>" +
    '<a class="btn btn--primary" href="contact.html">' +
    "Start with an ROI blueprint" +
    '<span class="nav__arrow" aria-hidden="true">&#8599;</span>' +
    "</a>" +
    "</section>";
})();
