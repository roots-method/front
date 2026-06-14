(function () {
  var STORAGE_KEY = "dheenode-theme";
  var stored = localStorage.getItem(STORAGE_KEY);

  if (stored === "system" || !stored) {
    stored = "light";
  }

  if (stored !== "light" && stored !== "dark") {
    stored = "light";
  }

  document.documentElement.setAttribute("data-theme", stored);
  document.documentElement.setAttribute("data-theme-pref", stored);
})();
