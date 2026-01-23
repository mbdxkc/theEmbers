/* =========================================================
   smoke-transition.js
   Smoke dissolve transition effect
   ========================================================= */

(function () {
  'use strict';

  var isTransitioning = false;

  // Check for reduced motion preference
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     Trigger the smoke dissolve
     --------------------------------------------------------- */
  function triggerSmoke(callback) {
    if (isTransitioning || prefersReducedMotion) {
      if (callback) callback();
      return;
    }

    isTransitioning = true;

    // Add dissolving class to body
    document.body.classList.add('smoke-dissolve');

    // After dissolve, trigger callback
    setTimeout(function () {
      if (callback) callback();

      // Brief pause at peak blur, then clear
      setTimeout(function () {
        document.body.classList.remove('smoke-dissolve');
        document.body.classList.add('smoke-reform');

        // Clean up after reform animation
        setTimeout(function () {
          document.body.classList.remove('smoke-reform');
          isTransitioning = false;
        }, 600);
      }, 150);
    }, 450);
  }

  /* ---------------------------------------------------------
     Handle navigation clicks
     --------------------------------------------------------- */
  function handleClick(e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;

    var targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;

    var targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    e.preventDefault();

    // Trigger smoke, then scroll
    triggerSmoke(function () {
      var headerHeight = document.querySelector('.site-header');
      var offset = headerHeight ? headerHeight.offsetHeight : 0;
      var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'auto'  // Instant scroll while "in smoke"
      });

      // Update URL
      history.pushState(null, '', targetId);
    });
  }

  /* ---------------------------------------------------------
     Initialize
     --------------------------------------------------------- */
  function init() {
    if (prefersReducedMotion) return;
    document.addEventListener('click', handleClick);
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
