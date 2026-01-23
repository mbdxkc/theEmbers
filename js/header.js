/**
 * ============================================================================
 * THE EMBERS KC - Header Component
 * ============================================================================
 *
 * @file        header.js
 * @description Dynamically injects the site header into the page.
 *              Includes navigation links, logo with hover effect, and
 *              social media icons. Also handles mobile menu toggle.
 *
 * @usage       Add an element with id="site-header" to your HTML:
 *              <header id="site-header" class="site-header"></header>
 *
 * @requires    style.css (or style.min.css) for styling
 *
 * @structure   The header contains:
 *              - nav-left: Navigation links (Photos, Reviews, Contact)
 *              - nav-center: Logo with hover image swap
 *              - nav-right: Social media icons (Instagram, Facebook)
 *              - nav-toggle: Mobile hamburger menu button
 *              - mobile-menu: Hidden menu panel for mobile devices
 *
 * ============================================================================
 */

(function () {
  // ---------------------------------------------------------------------------
  // HEADER HTML TEMPLATE
  // This template string contains the complete header markup.
  // It's injected into the #site-header element when the page loads.
  // ---------------------------------------------------------------------------
  const headerHTML = `
    <div class="header-grid">
      <nav class="nav" aria-label="Main navigation">

        <!-- LEFT: Navigation Links -->
        <div class="nav-left">
          <a href="#photos" class="nav-link">Photos</a>
          <a href="#reviews" class="nav-link">Reviews</a>
          <a href="#contact" class="nav-link">Contact</a>
        </div>

        <!-- CENTER: Logo with Hover Effect -->
        <!-- Two images are stacked; CSS handles the crossfade on hover -->
        <div class="nav-center">
          <a href="/" class="nav-logo">
            <img src="/images/theEmbers_wordmark.svg" alt="The Embers KC" width="106" height="36" class="logo-default">
            <img src="/images/theEmbers_hover.svg" alt="" width="106" height="36" class="logo-hover" aria-hidden="true">
          </a>
        </div>

        <!-- RIGHT: Social Media Icons -->
        <div class="nav-right">
          <!-- Instagram -->
          <a href="https://www.instagram.com/the_embers_kc/" target="_blank" rel="noopener" class="nav-link" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <!-- Facebook -->
          <a href="https://www.facebook.com/profile.php?id=100090998160648" target="_blank" rel="noopener" class="nav-link" aria-label="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
        </div>

        <!-- MOBILE: Hamburger Menu Toggle Button -->
        <!-- Hidden on desktop, visible on mobile (controlled via CSS) -->
        <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>

      </nav>
    </div>

    <!-- MOBILE MENU PANEL -->
    <!-- Slides in when hamburger is clicked; hidden by default -->
    <div class="mobile-menu" id="mobile-menu">
      <a href="#photos" class="nav-link">Photos</a>
      <a href="#reviews" class="nav-link">Reviews</a>
      <a href="#contact" class="nav-link">Contact</a>
    </div>
  `;

  // ---------------------------------------------------------------------------
  // DOM INSERTION
  // Finds the #site-header element and injects the header HTML.
  // Also initializes the mobile menu functionality after insertion.
  // ---------------------------------------------------------------------------
  function insertHeader() {
    const headerEl = document.getElementById("site-header");
    if (headerEl) {
      headerEl.innerHTML = headerHTML;
      initMobileMenu();
    }
  }

  // ---------------------------------------------------------------------------
  // MOBILE MENU TOGGLE
  // Handles the hamburger menu button click to show/hide the mobile menu.
  // Also closes the menu when a navigation link is clicked.
  // ---------------------------------------------------------------------------
  function initMobileMenu() {
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.getElementById("mobile-menu");

    if (toggle && menu) {
      // Toggle menu open/closed on button click
      toggle.addEventListener("click", function () {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", !expanded);
        menu.classList.toggle("is-active");
      });

      // Close menu when any nav link is clicked
      menu.querySelectorAll(".nav-link").forEach(function (link) {
        link.addEventListener("click", function () {
          toggle.setAttribute("aria-expanded", "false");
          menu.classList.remove("is-active");
        });
      });
    }
  }

  // ---------------------------------------------------------------------------
  // INITIALIZATION
  // Runs insertHeader when the DOM is ready.
  // Handles both cases: script loaded before or after DOMContentLoaded.
  // ---------------------------------------------------------------------------
  if (document.readyState === "loading") {
    // DOM not ready yet, wait for it
    document.addEventListener("DOMContentLoaded", insertHeader);
  } else {
    // DOM already loaded, run immediately
    insertHeader();
  }
})();
