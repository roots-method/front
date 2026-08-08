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
}());
