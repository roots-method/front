(function () {
  var STORAGE_KEY = "arkaflow-theme";
  var stored = localStorage.getItem(STORAGE_KEY);

  if (stored === "system" || !stored) {
    stored = "dark";
  }

  if (stored !== "light" && stored !== "dark") {
    stored = "dark";
  }

  document.documentElement.setAttribute("data-theme", stored);
  document.documentElement.setAttribute("data-theme-pref", stored);
})();
