(function () {
  var container = document.querySelector("[data-component='blog-grid']");
  if (!container) return;

  var posts = window.BLOG_POSTS || {};
  var order = window.BLOG_POST_ORDER || Object.keys(posts);

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function postUrl(post) {
    return "/blog/" + encodeURIComponent(post.slug) + ".html";
  }

  // ── Featured post (most recent) ──────────────────────────────────────
  var featuredSlug = order[0];
  var featured = featuredSlug && posts[featuredSlug];
  var featuredHtml = "";

  if (featured) {
    var fa = featured.accent || "";

    featuredHtml =
      '<a class="case-featured reveal" href="' + postUrl(featured) + '"' +
      (fa ? ' style="--case-accent: ' + escapeHtml(fa) + ';"' : "") + ">" +
        '<div class="case-featured__visual">' +
          '<div class="case-featured__stat post-featured__stat">' +
            '<span class="post-featured__kicker">' + escapeHtml(featured.kicker || "Latest") + "</span>" +
            '<span class="case-featured__stat-label">' + escapeHtml(featured.dateLabel) + "</span>" +
          "</div>" +
        "</div>" +
        '<div class="case-featured__body">' +
          '<div class="case-featured__meta">' +
            '<span class="case-card__label">' + escapeHtml(featured.label) + "</span>" +
            '<span class="case-card__duration">Latest</span>' +
          "</div>" +
          '<h2 class="case-featured__title">' + escapeHtml(featured.title) + "</h2>" +
          '<p class="case-featured__excerpt">' + escapeHtml(featured.teaser) + "</p>" +
          '<div class="case-featured__footer">' +
            '<span class="case-card__cta">Read post</span>' +
            '<span class="case-card__read-time">' + escapeHtml(featured.readTime) + "</span>" +
          "</div>" +
        "</div>" +
      "</a>";
  }

  // ── Grid of remaining posts ──────────────────────────────────────────
  var gridItems = order.slice(1).map(function (slug) {
    var post = posts[slug];
    if (!post) return "";

    var accentAttr = post.accent
      ? ' style="--case-accent: ' + escapeHtml(post.accent) + ';"'
      : "";

    return (
      '<a class="case-card reveal"' + accentAttr + ' href="' + postUrl(post) + '">' +
        '<div class="case-card__visual"></div>' +
        '<div class="case-card__body">' +
          '<div class="case-card__header">' +
            '<span class="case-card__label">' + escapeHtml(post.label) + "</span>" +
            '<span class="case-card__duration">' + escapeHtml(post.dateLabel) + "</span>" +
          "</div>" +
          "<h2>" + escapeHtml(post.title) + "</h2>" +
          "<p>" + escapeHtml(post.teaser) + "</p>" +
          '<div class="case-card__footer">' +
            '<span class="case-card__cta">Read post</span>' +
            '<span class="case-card__read-time">' + escapeHtml(post.readTime) + "</span>" +
          "</div>" +
        "</div>" +
      "</a>"
    );
  });

  container.innerHTML =
    featuredHtml +
    '<div class="case-grid">' + gridItems.join("") + "</div>";
})();
