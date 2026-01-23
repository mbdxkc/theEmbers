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
  // 1. footer html template - copyright and legal/info links
  // -------------------------------------------------------------------------
  const footerHTML = `
    <p>&copy; 2026 site name</p>
  `;

  // -------------------------------------------------------------------------
  // 2. dom insertion - inject footer html into placeholder element
  // -------------------------------------------------------------------------
  function insertFooter() {
    const footerEl = document.getElementById("site-footer");
    if (footerEl) {
      footerEl.innerHTML = footerHTML;
    }
  }

  // -------------------------------------------------------------------------
  // 3. initialization - run when dom is ready
  // -------------------------------------------------------------------------
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", insertFooter);
  } else {
    insertFooter();
  }
})();
