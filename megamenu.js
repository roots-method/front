// Drives the Solution mega-menu injected by header.js.
//
// Desktop (>860px): the panel opens on hover or on click/keyboard of the
// trigger. Hovering or focusing a row on the left swaps the description on the
// right. A short close delay lets the pointer travel from the trigger into the
// panel without it snapping shut.
//
// Mobile (<=860px, inside the burger panel): CSS stacks every description under
// its row, so the only job left here is the accordion toggle. nav.js closes the
// burger on any link click, which also collapses this.
(function () {
  var DESKTOP_QUERY = "(min-width: 861px)";
  var CLOSE_DELAY = 160;

  function isDesktop() {
    return window.matchMedia(DESKTOP_QUERY).matches;
  }

  document.querySelectorAll(".nav__group[data-menu]").forEach(function (group) {
    var trigger = group.querySelector(".nav__trigger");
    var panel = group.querySelector(".megamenu");
    if (!trigger || !panel) return;

    var rows = Array.prototype.slice.call(group.querySelectorAll(".megamenu__item"));
    var panels = Array.prototype.slice.call(group.querySelectorAll(".megamenu__panel"));
    var closeTimer = null;

    function setOpen(open) {
      window.clearTimeout(closeTimer);
      group.classList.toggle("is-open", open);
      trigger.setAttribute("aria-expanded", String(open));
      if (!open) select(rows[0]);
    }

    function scheduleClose() {
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(function () {
        setOpen(false);
      }, CLOSE_DELAY);
    }

    function select(row) {
      if (!row) return;
      var id = row.getAttribute("data-solution");
      rows.forEach(function (candidate) {
        candidate.classList.toggle("is-selected", candidate === row);
      });
      panels.forEach(function (candidate) {
        candidate.classList.toggle(
          "is-selected",
          candidate.getAttribute("data-panel") === id
        );
      });
    }

    trigger.addEventListener("click", function () {
      // On desktop the pointer already opened it on hover, and mouseleave will
      // close it — so a click only ever opens. Toggling here would just undo
      // the hover. On mobile there is no hover, so it is a real accordion.
      if (isDesktop()) setOpen(true);
      else setOpen(!group.classList.contains("is-open"));
    });

    group.addEventListener("mouseenter", function () {
      if (isDesktop()) setOpen(true);
    });

    group.addEventListener("mouseleave", function () {
      if (isDesktop()) scheduleClose();
    });

    // Keyboard and screen-reader users tab into the panel; keep it open for
    // as long as focus lives anywhere inside the group.
    group.addEventListener("focusin", function (event) {
      if (!isDesktop()) return;
      // A mouse click on the trigger fires focusin too; ignore that one and
      // let the click handler decide, or the two fight over the state.
      if (event.target === trigger && !trigger.matches(":focus-visible")) return;
      setOpen(true);
    });

    group.addEventListener("focusout", function (event) {
      if (!isDesktop()) return;
      if (!group.contains(event.relatedTarget)) setOpen(false);
    });

    rows.forEach(function (row) {
      row.addEventListener("mouseenter", function () {
        select(row);
      });
      row.addEventListener("focus", function () {
        select(row);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape" || !group.classList.contains("is-open")) return;
      setOpen(false);
      trigger.focus();
    });

    document.addEventListener("click", function (event) {
      if (!group.contains(event.target)) setOpen(false);
    });

    window.addEventListener("resize", function () {
      setOpen(false);
    });
  });
})();
