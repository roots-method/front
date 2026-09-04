(function () {
  var CONSENT_KEY = "arka-cookie-consent";

  // ── Privacy Policy modal ─────────────────────────────────────────────────
  var modal = document.createElement("div");
  modal.className = "privacy-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Privacy Policy");
  modal.hidden = true;
  modal.innerHTML =
    '<div class="privacy-modal__backdrop"></div>' +
    '<div class="privacy-modal__panel">' +
      '<button class="privacy-modal__close" type="button" aria-label="Close Privacy Policy">&times;</button>' +
      '<div class="privacy-modal__body">' +
        '<p class="eyebrow">Legal</p>' +
        '<h2>Privacy Policy</h2>' +
        '<p class="privacy-modal__meta">Last updated: 1 September 2026</p>' +

        '<h3>Who we are</h3>' +
        '<p>Arka (<a href="https://www.arkaflow.co">arkaflow.co</a>) builds intelligent software for enterprise operations. Contact: <a href="mailto:build@arkaflow.co">build@arkaflow.co</a>.</p>' +

        '<h3>What we collect</h3>' +
        '<p><strong>Contact form</strong> — name, work email, company, and message you submit. Used solely to respond to your enquiry (legal basis: legitimate interest, Art. 6(1)(f) GDPR).</p>' +
        '<p><strong>Browser storage</strong> — we store your theme preference and consent choice in <code>localStorage</code> only. No personal data, never transmitted to our servers.</p>' +
        '<p><strong>Server logs</strong> — this site is hosted on GitHub Pages. GitHub may log IP addresses and browser agents under their own <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">Privacy Statement</a>.</p>' +

        '<h3>Third parties</h3>' +
        '<p>Contact form submissions are routed through <strong>FormSubmit</strong> (formsubmit.co) before reaching our inbox. We do not use Google Analytics, advertising cookies, or tracking pixels.</p>' +

        '<h3>Cookies</h3>' +
        '<p>This site sets <strong>no cookies</strong>. We use <code>localStorage</code> for theme and consent preferences only — stored locally in your browser, never shared.</p>' +

        '<h3>Data retention</h3>' +
        '<p>Contact enquiries are kept for up to 2 years or until the matter is resolved, whichever comes first.</p>' +

        '<h3>Your rights (GDPR / UK GDPR)</h3>' +
        '<p>You have the right to access, correct, erase, restrict, or port your personal data, and to object to processing. Email <a href="mailto:build@arkaflow.co">build@arkaflow.co</a> to exercise any right — we respond within 30 days. You may also lodge a complaint with your local data protection authority.</p>' +

        '<h3>International transfers</h3>' +
        '<p>GitHub Pages and FormSubmit may process data outside the EEA (including the US). GitHub relies on Standard Contractual Clauses for such transfers.</p>' +

        '<h3>Changes</h3>' +
        '<p>We may update this policy. The date above will reflect any changes.</p>' +
      '</div>' +
    '</div>';

  document.body.appendChild(modal);

  function openModal() {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".privacy-modal__close").focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  modal.querySelector(".privacy-modal__close").addEventListener("click", closeModal);
  modal.querySelector(".privacy-modal__backdrop").addEventListener("click", closeModal);
  document.addEventListener("keydown", function (e) {
    if (!modal.hidden && e.key === "Escape") closeModal();
  });

  // Expose opener for footer link
  window.ArkaPrivacy = { open: openModal };

  // Wire any existing privacy links on the page
  document.addEventListener("click", function (e) {
    var link = e.target.closest("[data-privacy-modal]");
    if (link) { e.preventDefault(); openModal(); }
  });

  // ── Cookie consent banner ────────────────────────────────────────────────
  var consent = null;
  try { consent = localStorage.getItem(CONSENT_KEY); } catch (e) {}
  if (consent) return;

  var banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.setAttribute("role", "region");
  banner.setAttribute("aria-label", "Cookie consent");
  banner.innerHTML =
    '<div class="cookie-banner__inner">' +
      '<p class="cookie-banner__text">' +
        'We use essential browser storage (no tracking cookies) to remember your preferences. ' +
        'Read our <button class="cookie-banner__policy" type="button" data-privacy-modal>Privacy Policy</button>.' +
      '</p>' +
      '<div class="cookie-banner__actions">' +
        '<button class="btn btn--primary cookie-banner__accept" type="button">' +
          '<span class="btn__label">Accept</span>' +
        '</button>' +
        '<button class="cookie-banner__decline" type="button">Decline</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(banner);

  requestAnimationFrame(function () {
    banner.classList.add("cookie-banner--visible");
  });

  function dismiss(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
    banner.classList.remove("cookie-banner--visible");
    banner.addEventListener("transitionend", function () {
      if (banner.parentNode) banner.parentNode.removeChild(banner);
    }, { once: true });
  }

  banner.querySelector(".cookie-banner__accept").addEventListener("click", function () {
    dismiss("accepted");
  });
  banner.querySelector(".cookie-banner__decline").addEventListener("click", function () {
    dismiss("declined");
  });
})();
