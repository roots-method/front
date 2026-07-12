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

  // 1. Horizontal metric strip with amber values
  function renderMetrics(metrics) {
    var items = metrics.map(function (metric, i) {
      var html =
        '<div class="cs-stat__item">' +
          '<span class="cs-stat__value">' + escapeHtml(metric.value) + "</span>" +
          '<span class="cs-stat__label">' + escapeHtml(metric.label) + "</span>" +
        "</div>";
      if (i < metrics.length - 1) {
        html += '<div class="cs-stat__divider" aria-hidden="true"></div>';
      }
      return html;
    }).join("");

    return (
      '<div class="cs-stat" aria-label="Case study outcomes">' +
        items +
      "</div>"
    );
  }

  // 4. Section nav — scrollable pill list linking to anchors
  function renderSectionNav(sections) {
    if (!sections || sections.length < 2) return "";
    var pills = sections.map(function (section, i) {
      return (
        '<a class="cs-nav__pill" href="#cs-section-' + i + '">' +
          escapeHtml(section.heading) +
        "</a>"
      );
    }).join("");
    return '<nav class="cs-nav" aria-label="Jump to section">' + pills + "</nav>";
  }

  function renderSections(sections) {
    return sections.map(function (section, i) {
      var paragraphs = (section.paragraphs || [])
        .map(function (p) { return "<p>" + escapeHtml(p) + "</p>"; })
        .join("");

      var list = "";
      if (section.list && section.list.length) {
        list =
          '<ul class="check-list">' +
          section.list.map(function (item) { return "<li>" + escapeHtml(item) + "</li>"; }).join("") +
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
        '<section class="case-article__section" id="cs-section-' + i + '">' +
          "<h2>" + escapeHtml(section.heading) + "</h2>" +
          paragraphs +
          list +
          diagram +
        "</section>"
      );
    }).join("");
  }

  // 3. Enriched related cards (duration tag + top metric callout)
  function renderRelatedCases(currentSlug) {
    var order = window.CASE_STUDY_ORDER || Object.keys(studies);
    var related = order
      .filter(function (key) { return key !== currentSlug; })
      .slice(0, 3)
      .map(function (key) { return studies[key]; })
      .filter(Boolean);

    if (!related.length) return "";

    var cards = related.map(function (item) {
      var accentStyle = item.accent
        ? ' style="--case-accent: ' + escapeHtml(item.accent) + ';"'
        : "";
      var topMetric = item.metrics && item.metrics[0];

      var metricHtml = topMetric
        ? '<div class="case-card__metric">' +
            '<span class="case-card__metric-value">' + escapeHtml(topMetric.value) + "</span>" +
            '<span class="case-card__metric-label">' + escapeHtml(topMetric.label) + "</span>" +
          "</div>"
        : "";

      var durationHtml = item.engagement
        ? '<span class="case-card__duration">' + escapeHtml(item.engagement) + "</span>"
        : "";

      var readTimeHtml = item.readTime
        ? '<span class="case-card__read-time">' + escapeHtml(item.readTime) + "</span>"
        : "";

      return (
        '<a class="case-card case-card--compact"' +
        accentStyle +
        ' href="case-study.html?slug=' + encodeURIComponent(item.slug) + '">' +
          '<div class="case-card__header">' +
            '<span class="case-card__label">' + escapeHtml(item.label) + "</span>" +
            durationHtml +
          "</div>" +
          "<h2>" + escapeHtml(item.title) + "</h2>" +
          metricHtml +
          "<p>" + escapeHtml(item.teaser || item.summary) + "</p>" +
          '<div class="case-card__footer">' +
            '<span class="case-card__cta">Read case study</span>' +
            readTimeHtml +
          "</div>" +
        "</a>"
      );
    }).join("");

    return (
      '<section class="case-article__related">' +
        '<p class="eyebrow">More Case Work</p>' +
        "<h2>Related outcomes from the field.</h2>" +
        '<div class="case-grid case-grid--related">' + cards + "</div>" +
      "</section>"
    );
  }

  function renderNotFound() {
    document.title = "Case study not found — Arka";
    container.innerHTML =
      '<section class="page-hero">' +
        '<p class="eyebrow"><img class="icon-sm" src="assets/icons-ai/07_data_stack.svg" alt="" />Case Work</p>' +
        "<h1>We could not find that case study.</h1>" +
        "<p>The link may be outdated or the case study may have moved.</p>" +
        '<a class="btn btn--ghost case-article__back" href="results.html">Back to Case Work</a>' +
      "</section>";
  }

  if (!study) {
    renderNotFound();
    return;
  }

  document.title = study.title + " — Case Work — Arka";

  var description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", study.summary);

  if (study.accent) container.style.setProperty("--case-accent", study.accent);

  container.innerHTML =
    // Header
    '<header class="case-article__header">' +
      '<a class="case-article__back" href="results.html"><span aria-hidden="true">&#8592;</span> Back to Case Work</a>' +
      '<p class="case-article__label">' + escapeHtml(study.label) + "</p>" +
      "<h1>" + escapeHtml(study.title) + "</h1>" +
      '<p class="case-article__summary">' + escapeHtml(study.summary) + "</p>" +
      '<div class="case-article__meta">' +
        "<span>" + escapeHtml(study.readTime) + "</span>" +
        "<span>" + escapeHtml(study.engagement) + "</span>" +
      "</div>" +
    "</header>" +

    // 1. Horizontal metric strip
    renderMetrics(study.metrics) +

    // 4. Section nav
    renderSectionNav(study.sections) +

    // Article body
    '<div class="case-article__body">' +
      renderSections(study.sections) +
    "</div>" +

    // Related cases
    renderRelatedCases(study.slug) +

    // 2. Full CTA panel
    '<section class="cta-panel case-article__cta">' +
      '<div class="cta-panel__header">' +
        '<p class="eyebrow">Your workflow</p>' +
        "<h2>See what this kind of clarity could look like in your operation.</h2>" +
      "</div>" +
      '<ol class="cta-panel__steps">' +
        "<li><span class=\"cta-panel__step-num\">01</span><span class=\"cta-panel__step-text\">Book a 30-min scoping call — no commitment required</span></li>" +
        "<li><span class=\"cta-panel__step-num\">02</span><span class=\"cta-panel__step-text\">We map your highest-value workflow opportunity</span></li>" +
        "<li><span class=\"cta-panel__step-num\">03</span><span class=\"cta-panel__step-text\">You receive a tailored ROI Blueprint within 5 business days</span></li>" +
      "</ol>" +
      '<div class="cta-panel__action">' +
        '<a class="btn btn--primary" href="contact.html">Start with an ROI blueprint<span class="nav__arrow" aria-hidden="true">&#8599;</span></a>' +
        '<a class="btn btn--ghost" href="results.html">View more case work<span class="nav__arrow" aria-hidden="true">&#8599;</span></a>' +
        '<p class="cta-panel__note">We respond within one business day.</p>' +
      "</div>" +
    "</section>";

  // Smooth scroll for section nav pills
  container.querySelectorAll(".cs-nav__pill").forEach(function (pill) {
    pill.addEventListener("click", function (e) {
      var target = document.querySelector(pill.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Highlight active pill on scroll
  var sections = container.querySelectorAll(".case-article__section");
  var pills = container.querySelectorAll(".cs-nav__pill");
  if (sections.length && pills.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          pills.forEach(function (p) {
            p.classList.toggle("is-active", p.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-20% 0px -60% 0px" });
    sections.forEach(function (s) { observer.observe(s); });
  }
})();
