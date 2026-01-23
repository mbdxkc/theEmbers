/* =========================================================
   home-intro.js
   Ember-themed intro animation for home page
   ========================================================= */

(function () {
  'use strict';

  var MIN_INTRO_DURATION = 2000; // minimum intro duration in ms
  var FADE_DURATION = 1000;      // fade out duration in ms

  var intro = document.getElementById('ember-intro');
  var canvas = document.getElementById('ember-intro-canvas');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Skip intro if already seen this session or reduced motion
  if (!intro || sessionStorage.getItem('emberIntroSeen')) {
    if (intro) intro.classList.add('hidden');
    document.body.classList.remove('intro-active');
    return;
  }

  // Hide page content during intro
  document.body.classList.add('intro-active');

  // Mark as seen for this session
  sessionStorage.setItem('emberIntroSeen', 'true');

  // Skip animation for reduced motion but still show brief intro
  if (prefersReducedMotion) {
    setTimeout(function () {
      document.body.classList.remove('intro-active');
      intro.classList.add('fade-out');
      setTimeout(function () {
        intro.classList.add('hidden');
      }, 300);
    }, 800);
    return;
  }

  // Ember particle system
  var ctx = canvas.getContext('2d');
  var particles = [];
  var animationId;
  var isAnimating = true;
  var isFadingOut = false;

  // Resize canvas to window
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Create an ember particle
  function createParticle() {
    var colors = [
      'rgba(180, 40, 50, ',   // darker red
      'rgba(200, 100, 20, ',  // darker orange
      'rgba(160, 140, 100, '  // muted cream
    ];
    var color = colors[Math.floor(Math.random() * colors.length)];

    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      size: Math.random() * 3 + 1.5,
      speedY: Math.random() * 4 + 2.5,
      speedX: (Math.random() - 0.5) * 1.2,
      opacity: Math.random() * 0.5 + 0.2,
      color: color,
      life: 1,
      decay: Math.random() * 0.012 + 0.006,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.08 + 0.03
    };
  }

  // Update particle positions
  function updateParticles() {
    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];

      // Accelerate upward during fade-out
      if (isFadingOut) {
        p.speedY *= 1.04;
        p.decay *= 1.02;
      }

      // Move upward with slight wobble
      p.wobble += p.wobbleSpeed;
      p.x += p.speedX + Math.sin(p.wobble) * 0.5;
      p.y -= p.speedY;

      // Fade out as it rises
      p.life -= p.decay;

      // Remove dead particles
      if (p.life <= 0 || p.y < -10) {
        particles.splice(i, 1);
      }
    }
  }

  // Draw particles
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var alpha = p.opacity * p.life;

      // Glow effect
      ctx.beginPath();
      var gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
      gradient.addColorStop(0, p.color + alpha + ')');
      gradient.addColorStop(0.4, p.color + (alpha * 0.4) + ')');
      gradient.addColorStop(1, p.color + '0)');
      ctx.fillStyle = gradient;
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      ctx.fill();

      // Core ember
      ctx.beginPath();
      ctx.fillStyle = p.color + alpha + ')';
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Animation loop
  function animate() {
    if (!isAnimating) return;

    // Add new particles (stop during fade-out)
    if (!isFadingOut && particles.length < 80) {
      particles.push(createParticle());
      particles.push(createParticle());
      if (Math.random() > 0.6) {
        particles.push(createParticle());
      }
    }

    updateParticles();
    drawParticles();

    animationId = requestAnimationFrame(animate);
  }

  // Start the intro
  function startIntro() {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    // Start revealing the page - remove intro-active to trigger fade-in
    setTimeout(function () {
      document.body.classList.remove('intro-active');
    }, 100);

    // Track when we can end the intro
    var pageLoaded = false;
    var introEnded = false;

    function endIntro() {
      if (introEnded || !pageLoaded) return;
      introEnded = true;

      // Remove interaction listeners
      document.removeEventListener('click', onInteract);
      document.removeEventListener('keydown', onInteract);
      document.removeEventListener('touchstart', onInteract);
      document.removeEventListener('wheel', onInteract);

      isFadingOut = true;
      intro.classList.add('fade-out');

      // Stop spawning new particles, let existing ones accelerate up
      setTimeout(function () {
        isAnimating = false;
        cancelAnimationFrame(animationId);
      }, FADE_DURATION * 0.7);

      // Hide completely after fade
      setTimeout(function () {
        intro.classList.add('hidden');
        window.removeEventListener('resize', resizeCanvas);
      }, FADE_DURATION + 200);
    }

    // End intro on user interaction
    function onInteract() {
      endIntro();
    }

    document.addEventListener('click', onInteract);
    document.addEventListener('keydown', onInteract);
    document.addEventListener('touchstart', onInteract);
    document.addEventListener('wheel', onInteract);

    // Wait for page to fully load first
    function onPageLoaded() {
      setTimeout(function () {
        pageLoaded = true;
      }, 500);
    }

    if (document.readyState === 'complete') {
      onPageLoaded();
    } else {
      window.addEventListener('load', onPageLoaded);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startIntro);
  } else {
    startIntro();
  }

})();
