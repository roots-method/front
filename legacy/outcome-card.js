(function () {
  var COUNTERS = [
    { suffix: '%',    target: 39, duration: 1400 },
    { suffix: '×', target: 48, duration: 1400 },
    { suffix: ' wks', target: 6,  duration: 900  }
  ];

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function runCounter(el, target, suffix, duration) {
    var start = performance.now();
    function tick(now) {
      var p = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(easeOut(p) * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function startCounters() {
    var els = document.querySelectorAll('.outcome-card__metric-value');
    if (els.length < COUNTERS.length) return;
    COUNTERS.forEach(function (c, i) {
      runCounter(els[i], c.target, c.suffix, c.duration);
    });
  }

  function init() {
    var metricsEl = document.querySelector('.outcome-card__metrics');
    if (!metricsEl) return;

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          startCounters();
          io.disconnect();
        }
      }, { threshold: 0.4 });
      io.observe(metricsEl);
    } else {
      startCounters();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
