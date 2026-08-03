(function () {
  'use strict';

  // ── Sticky split-scroll: activate visual panel matching visible step ──
  var steps = document.querySelectorAll('.process-split__step');
  var panels = document.querySelectorAll('.process-visual__panel');

  if (steps.length && panels.length) {
    function activatePanel(num) {
      panels.forEach(function (p) {
        var shouldBeActive = p.dataset.panel === String(num);
        if (shouldBeActive && !p.classList.contains('is-active')) {
          p.classList.add('is-active');
        } else if (!shouldBeActive && p.classList.contains('is-active')) {
          p.classList.remove('is-active');
        }
      });
    }

    var stepObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) activatePanel(entry.target.dataset.step);
      });
    }, {
      threshold: 0.45,
      rootMargin: '-5% 0px -45% 0px'
    });

    steps.forEach(function (step) { stepObserver.observe(step); });
  }

  // ── FAQ accordion ────────────────────────────────────────────────────
  var faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq__btn');
    var body = item.querySelector('.faq__body');
    if (!btn || !body) return;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      // Close all open items first
      faqItems.forEach(function (i) {
        if (i.classList.contains('is-open')) {
          i.classList.remove('is-open');
          i.querySelector('.faq__body').style.maxHeight = '0';
          i.querySelector('.faq__btn').setAttribute('aria-expanded', 'false');
        }
      });

      // Open clicked item if it was previously closed
      if (!isOpen) {
        item.classList.add('is-open');
        body.style.maxHeight = body.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}());
