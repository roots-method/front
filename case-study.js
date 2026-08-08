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

  // 4. Section nav — vertical timeline linking to anchors
  function renderSectionNav(sections) {
    if (!sections || sections.length < 2) return "";
    var items = sections.map(function (section, i) {
      return (
        '<a class="cs-nav__item" href="#cs-section-' + i + '">' +
          '<span class="cs-nav__dot"></span>' +
          '<span class="cs-nav__label">' + escapeHtml(section.heading) + "</span>" +
        "</a>"
      );
    }).join("");
    return '<nav class="cs-nav" aria-label="Jump to section">' + items + "</nav>";
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
        '<p class="eyebrow"><img class="icon-sm" src="assets/icons-ai-ibm/data-analytics.svg" alt="" />Case Work</p>' +
        "<h1>We could not find that case study.</h1>" +
        "<p>The link may be outdated or the case study may have moved.</p>" +
        '<a class="btn btn--ghost case-article__back" href="results.html">Back to Case Work</a>' +
      "</section>";
  }

  if (!study) {
    renderNotFound();
    return;
  }

  var pageTitle = study.title + " — Case Work — Arka";
  var pageUrl = "https://www.arkaflow.co/case-study.html?slug=" + slug;
  document.title = pageTitle;

  var description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", study.summary);

  var canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute("href", pageUrl);

  function setMeta(selector, attr, value) {
    var el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  }
  setMeta('meta[property="og:url"]', "content", pageUrl);
  setMeta('meta[property="og:title"]', "content", pageTitle);
  setMeta('meta[property="og:description"]', "content", study.summary);
  setMeta('meta[name="twitter:title"]', "content", pageTitle);
  setMeta('meta[name="twitter:description"]', "content", study.summary);

  var jsonld = document.getElementById("case-study-jsonld");
  if (jsonld) {
    jsonld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "@id": pageUrl + "#article",
          "url": pageUrl,
          "name": study.title,
          "headline": study.title,
          "description": study.summary,
          "articleSection": study.label,
          "isPartOf": { "@id": "https://www.arkaflow.co/#website" },
          "author": { "@id": "https://www.arkaflow.co/#org" },
          "publisher": { "@id": "https://www.arkaflow.co/#org" }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.arkaflow.co/" },
            { "@type": "ListItem", "position": 2, "name": "Case Work", "item": "https://www.arkaflow.co/results.html" },
            { "@type": "ListItem", "position": 3, "name": study.title, "item": pageUrl }
          ]
        }
      ]
    });
  }

  if (study.accent) container.style.setProperty("--case-accent", study.accent);

  container.innerHTML =
    '<div class="case-article__wrap">' +

      // Left sticky sidebar
      '<aside class="case-article__sidebar">' +
        '<a class="case-article__back" href="results.html"><span aria-hidden="true">&#8592;</span> Back to Case Work</a>' +
        renderSectionNav(study.sections) +
      "</aside>" +

      // Right main content
      '<div class="case-article__main">' +

        // Header (no back link — it lives in the sidebar)
        '<header class="case-article__header">' +
          '<p class="case-article__label">' + escapeHtml(study.label) + "</p>" +
          "<h1>" + escapeHtml(study.title) + "</h1>" +
          '<p class="case-article__summary">' + escapeHtml(study.summary) + "</p>" +
          '<div class="case-article__meta">' +
            "<span>" + escapeHtml(study.readTime) + "</span>" +
            "<span>" + escapeHtml(study.engagement) + "</span>" +
          "</div>" +
        "</header>" +

        // Horizontal metric strip
        renderMetrics(study.metrics) +

        // Article body
        '<div class="case-article__body">' +
          renderSections(study.sections) +
        "</div>" +

      "</div>" + // end .case-article__main
    "</div>" + // end .case-article__wrap

    // Full-width sections below the sidebar layout
    renderRelatedCases(study.slug) +

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

  var NAV_OFFSET = 100; // sticky header height + breathing room

  // Click: scroll section heading into view below the sticky header
  container.querySelectorAll(".cs-nav__item").forEach(function (item) {
    item.addEventListener("click", function (e) {
      var target = document.querySelector(item.getAttribute("href"));
      if (target) {
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
        window.scrollTo({ top: top, behavior: "smooth" });
      }
    });
  });

  // Active highlight: whichever section's top has most recently scrolled past the threshold
  var sections = container.querySelectorAll(".case-article__section");
  var navItems = container.querySelectorAll(".cs-nav__item");

  function updateActiveNav() {
    if (!sections.length || !navItems.length) return;
    var threshold = NAV_OFFSET + 16;
    var activeIdx = 0;
    sections.forEach(function (sec, i) {
      if (sec.getBoundingClientRect().top <= threshold) activeIdx = i;
    });
    navItems.forEach(function (item, i) {
      item.classList.toggle("is-active", i === activeIdx);
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();
})();
