(function () {
  var STORAGE_KEY = "surajanalytics-theme";

  function getPreference() {
    var stored = localStorage.getItem(STORAGE_KEY);

    if (stored === "system" || !stored) {
      return "light";
    }

    return stored === "dark" ? "dark" : "light";
  }

  function updateToggleButtons(preference) {
    var label =
      preference === "dark" ? "Switch to light theme" : "Switch to dark theme";

    document.querySelectorAll(".theme-toggle").forEach(function (button) {
      button.setAttribute("aria-label", label);
      button.setAttribute("data-theme-pref", preference);
    });
  }

  function applyPreference(preference) {
    var resolved = preference === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", resolved);
    document.documentElement.setAttribute("data-theme-pref", resolved);
    localStorage.setItem(STORAGE_KEY, resolved);
    updateToggleButtons(resolved);
  }

  function togglePreference() {
    applyPreference(getPreference() === "dark" ? "light" : "dark");
  }

  function bindToggleButtons() {
    document.querySelectorAll(".theme-toggle").forEach(function (button) {
      if (button.dataset.bound === "true") return;
      button.dataset.bound = "true";
      button.addEventListener("click", togglePreference);
    });
    updateToggleButtons(getPreference());
  }

  window.SurajAnalyticsTheme = {
    bind: bindToggleButtons,
    apply: applyPreference,
  };

  bindToggleButtons();
})();
