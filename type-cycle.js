// Types a word out one character at a time, pauses, rewinds to whatever the
// next word shares with it, and types forward into that one — looping forever.
// Drives the braced word in the home hero.
//
// Markup contract: an element with data-type-cycle='["one", "two"]'. The braces
// around it are literal text in the HTML, not drawn here, so they stay put
// while the word inside changes.
(function () {
  var TYPE_MS = 110;   // per character while typing
  var DELETE_MS = 55;  // faster on the way out, the way real backspacing feels
  var HOLD_MS = 1600;  // how long a finished word sits before it is rewound
  var RESTART_MS = 400;

  var nodes = document.querySelectorAll("[data-type-cycle]");
  if (!nodes.length) return;

  // Someone who asked the OS for less motion gets the first word, held still.
  var stillPreferred =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // How many leading characters two words have in common. Kept to at least one
  // so a pair sharing nothing still leaves a single character standing.
  function sharedPrefix(a, b) {
    var i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i += 1;
    return Math.max(i, 1);
  }

  function start(node, words) {
    // The headline is centre-aligned, so a line whose width changes would slide
    // sideways on every keystroke. Hold the field at the width of the widest
    // word to keep the line fixed.
    //
    // Measured, not computed in ch: a ch is the width of "0", and in most
    // proportional faces that is wider than lowercase letters, which would
    // leave a permanent gap before the closing brace. The widest word by
    // character count is not always the widest word on screen either.
    function reserveWidth(current) {
      node.style.minWidth = "";
      var widest = words.reduce(function (max, word) {
        node.textContent = word;
        return Math.max(max, node.getBoundingClientRect().width);
      }, 0);
      node.textContent = current;
      node.style.minWidth = widest.toFixed(2) + "px";
    }

    if (stillPreferred) {
      reserveWidth(words[0]);
      return;
    }

    var wordIndex = 0;
    var charCount = 0;
    var deleting = false;

    reserveWidth("");

    // The headline is clamp()-sized against the viewport, so a reserved width
    // is only right for the width it was measured at.
    var resizeTimer = null;
    window.addEventListener("resize", function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        reserveWidth(node.textContent);
      }, 150);
    });

    function tick() {
      var word = words[wordIndex];
      var nextWord = words[(wordIndex + 1) % words.length];
      var delay;

      if (deleting) {
        charCount -= 1;
        delay = DELETE_MS;
        // Stop backspacing at whatever the next word shares with this one, so
        // the field never blanks out — "defacto" rewinds to "defa" and types
        // forward into "default" rather than emptying the braces first.
        if (charCount <= sharedPrefix(word, nextWord)) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          delay = RESTART_MS;
        }
      } else {
        charCount += 1;
        delay = TYPE_MS;
        if (charCount >= word.length) {
          deleting = true;
          delay = HOLD_MS;
        }
      }

      node.textContent = words[wordIndex].slice(0, Math.max(charCount, 0));
      window.setTimeout(tick, delay);
    }

    tick();
  }

  nodes.forEach(function (node) {
    var words;
    try {
      words = JSON.parse(node.getAttribute("data-type-cycle"));
    } catch (err) {
      return;
    }
    if (!Array.isArray(words) || !words.length) return;

    // Measuring before the webfont lands would size the field to the fallback.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        start(node, words);
      });
    } else {
      start(node, words);
    }
  });
})();
