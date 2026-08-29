// Sticky split-scroll: the steps column scrolls while the visual column stays
// pinned, and the panel matching the step in view is the one shown.
//
// Markup contract: .process-split__step[data-step="N"] on the left,
// .process-visual__panel[data-panel="N"] in the sticky column on the right.
(function () {
  'use strict';

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
