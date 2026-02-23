/**
 * ============================================================================
 * THE EMBERS KC - Footer Component
 * ============================================================================
 *
 * @file        footer.js
 * @description Dynamically injects the site footer into the page.
 *              Includes the band logo, social media links, and copyright.
 *              The copyright year is automatically set to the current year.
 *
 * @usage       Add an element with id="site-footer" to your HTML:
 *              <footer id="site-footer" class="site-footer"></footer>
 *
 * @requires    style.css (or style.min.css) for styling
 *
 * @structure   The footer contains:
 *              - footer-logo: Small band logo
 *              - footer-links: Social media icon links
 *              - Copyright text with dynamic year
 *
 * ============================================================================
 */

(function () {
  // ---------------------------------------------------------------------------
  // FOOTER HTML TEMPLATE
  // This template string contains the complete footer markup.
  // Note: The copyright year uses JavaScript's Date() for automatic updates.
  // ---------------------------------------------------------------------------
  const footerHTML = `
    <div class="container">

      <!-- BAND LOGO -->
      <!-- Smaller, semi-transparent version of the main logo -->
      <img src="/images/embers.png" alt="The Embers KC" class="footer-logo" width="120" height="120" loading="lazy">

      <!-- SOCIAL MEDIA LINKS -->
      <div class="footer-links">
        <!-- Instagram -->
        <a href="https://www.instagram.com/the_embers_kc/" target="_blank" rel="noopener" aria-label="Instagram">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
        </a>
        <!-- Facebook -->
        <a href="https://www.facebook.com/profile.php?id=100090998160648" target="_blank" rel="noopener" aria-label="Facebook">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </a>
        <!-- YouTube -->
        <a href="https://www.youtube.com/@TheEmbersKC" target="_blank" rel="noopener" aria-label="YouTube">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </a>
      </div>

      <!-- LEGAL LINKS -->
      <p class="footer-legal">
        <a href="/privacy.html">Privacy Policy</a>
      </p>

      <!-- COPYRIGHT -->
      <!-- Year is dynamically generated using JavaScript -->
      <p class="text-sm text-muted">&copy; ${new Date().getFullYear()} The Embers KC. All rights reserved.</p>

    </div>
  `;

  // ---------------------------------------------------------------------------
  // DOM INSERTION
  // Finds the #site-footer element and injects the footer HTML.
  // ---------------------------------------------------------------------------
  function insertFooter() {
    const footerEl = document.getElementById("site-footer");
    if (footerEl) {
      footerEl.innerHTML = footerHTML;
    }
  }

  // ---------------------------------------------------------------------------
  // INITIALIZATION
  // Runs insertFooter when the DOM is ready.
  // Handles both cases: script loaded before or after DOMContentLoaded.
  // ---------------------------------------------------------------------------
  if (document.readyState === "loading") {
    // DOM not ready yet, wait for it
    document.addEventListener("DOMContentLoaded", insertFooter);
  } else {
    // DOM already loaded, run immediately
    insertFooter();
  }
})();
