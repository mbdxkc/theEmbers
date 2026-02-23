/* =========================================================
   utils.js
   common ui interactions
   ========================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     mobile navigation toggle
     --------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.querySelector('.mobile-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.contains('is-active');

      menu.classList.toggle('is-active');
      toggle.setAttribute('aria-expanded', !isOpen);

      // prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // close menu on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-active')) {
        menu.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // close menu when clicking a link
    menu.addEventListener('click', function (e) {
      if (e.target.matches('a')) {
        menu.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------------------------------------------------------
     modal handling
     --------------------------------------------------------- */
  function initModals() {
    document.addEventListener('click', function (e) {
      // open modal
      var trigger = e.target.closest('[data-modal-open]');
      if (trigger) {
        var modalId = trigger.getAttribute('data-modal-open');
        var modal = document.getElementById(modalId);
        var overlay = document.querySelector('.overlay');

        if (modal) {
          modal.classList.add('is-active');
          if (overlay) overlay.classList.add('is-active');
          document.body.style.overflow = 'hidden';
        }
        return;
      }

      // close modal
      var closer = e.target.closest('[data-modal-close]');
      if (closer || e.target.matches('.overlay')) {
        closeAllModals();
      }
    });

    // close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeAllModals();
      }
    });
  }

  function closeAllModals() {
    var modals = document.querySelectorAll('.modal.is-active');
    var overlay = document.querySelector('.overlay.is-active');

    modals.forEach(function (modal) {
      modal.classList.remove('is-active');
    });

    if (overlay) overlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  /* ---------------------------------------------------------
     smooth scroll for anchor links
     --------------------------------------------------------- */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;

      var targetId = link.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      var headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
      var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // update url without triggering scroll
      history.pushState(null, '', targetId);
    });
  }

  /* ---------------------------------------------------------
     carousel pause/play control
     --------------------------------------------------------- */
  function initCarouselControl() {
    var pauseBtn = document.getElementById('carousel-pause');
    var carousel = document.querySelector('.carousel');

    if (!pauseBtn || !carousel) return;

    var pauseIcon = pauseBtn.querySelector('.pause-icon');
    var playIcon = pauseBtn.querySelector('.play-icon');
    var isPaused = false;

    pauseBtn.addEventListener('click', function () {
      isPaused = !isPaused;
      carousel.classList.toggle('is-paused', isPaused);
      pauseBtn.setAttribute('aria-pressed', isPaused);
      pauseBtn.setAttribute('aria-label', isPaused ? 'Play carousel' : 'Pause carousel');

      if (pauseIcon && playIcon) {
        pauseIcon.style.display = isPaused ? 'none' : 'block';
        playIcon.style.display = isPaused ? 'block' : 'none';
      }
    });
  }

  /* ---------------------------------------------------------
     contact form handling with feedback
     --------------------------------------------------------- */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    var status = document.getElementById('form-status');

    if (!form || !status) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;

      // Show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      status.className = 'form-status';
      status.textContent = '';

      // Submit via fetch
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
      .then(function (response) {
        if (response.ok) {
          status.className = 'form-status form-status-success';
          status.textContent = 'Thanks for reaching out! We\'ll get back to you soon.';
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(function () {
        status.className = 'form-status form-status-error';
        status.textContent = 'Oops! Something went wrong. Please try again or email us directly.';
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      });
    });
  }

  /* ---------------------------------------------------------
     hero video player
     --------------------------------------------------------- */
  function initHeroVideo() {
    var overlay = document.getElementById('hero-video-overlay');
    var container = document.getElementById('hero-video-container');
    var playBtn = document.getElementById('hero-play-btn');

    if (!overlay || !container || !playBtn) return;

    var videoId = 'A7_155WhXDE';

    function playVideo() {
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.title = 'The Embers KC Video';

      container.appendChild(iframe);
      overlay.classList.add('hidden');
    }

    overlay.addEventListener('click', playVideo);
    playBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      playVideo();
    });
  }

  /* ---------------------------------------------------------
     initialize
     --------------------------------------------------------- */
  function init() {
    initMobileNav();
    initModals();
    initSmoothScroll();
    initContactForm();
    initCarouselControl();
    initHeroVideo();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
