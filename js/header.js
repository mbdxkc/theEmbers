/**
  ============================================================================
  project title
  ============================================================================
  @project    project name
  @version    0.0
  @author     author <email>
  @date       year-mo-dy
  @file       .html
  @desc       page description
  @license    (c) 
  @requires   - /js/header.min.js, /js/footer.min.js, /js/page-transition.min.js
              - /style.css
  @a11y       - skip link, semantic html, wcag 2.1 aa compliant
  ============================================================================
  project v0.0 | page
  ============================================================================
 */

(function () {

  // -------------------------------------------------------------------------
  // header html template
  // -------------------------------------------------------------------------
  const headerHTML = `
    <div class="header-grid">
      <h1>site name</h1>
    </div>
  `;

  // -------------------------------------------------------------------------
  // dom insertion - inject header html into placeholder element
  // -------------------------------------------------------------------------
  function insertHeader() {
    const headerEl = document.getElementById("site-header");
    if (headerEl) {
      headerEl.innerHTML = headerHTML;
      initWordmark();
    }
  }

  // -------------------------------------------------------------------------
  // initialization - run when dom is ready
  // -------------------------------------------------------------------------
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", insertHeader);
  } else {
    insertHeader();
  }
})();
