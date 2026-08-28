// Pulls decorative SVG art out of the HTML and into cacheable files, without
// giving up the two things that make the art work.
//
// Why fetch-and-inject rather than <img src="art.svg">:
//   - Every one of these drawings paints with `currentColor` so it follows
//     --accent through the light/dark toggle. Inside an <img>, currentColor
//     resolves against the SVG's own root, which knows nothing about the page,
//     and the art comes out black.
//   - Their animations live in styles.css (.hero-nodes__pulse, .flow-art__line,
//     .about-art__orbit and friends). A stylesheet cannot reach into an
//     <img>-referenced document, so none of those rules would apply.
//
// Injecting keeps both, and the browser still caches the file across pages.
//
// Markup contract: <div class="..." data-svg="/assets/art/name.svg"></div>
// The wrapper keeps its own class and sizing; only the <svg> arrives here.
(function () {
  var holders = document.querySelectorAll("[data-svg]");
  if (!holders.length) return;

  // One request per file even when a page uses the same art twice.
  var pending = {};

  holders.forEach(function (holder) {
    var src = holder.getAttribute("data-svg");
    if (!src) return;

    if (!pending[src]) {
      pending[src] = fetch(src).then(function (response) {
        if (!response.ok) throw new Error(src + " -> " + response.status);
        return response.text();
      });
    }

    pending[src]
      .then(function (markup) {
        holder.innerHTML = markup;
        holder.classList.add("is-loaded");
      })
      .catch(function () {
        // The art is decorative; a page without it is still a whole page.
        // Leaving the wrapper empty is the correct failure.
      });
  });
})();
