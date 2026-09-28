/* ═══════════════════════════════════════════════════════════════
   Binary Droplet — main.js
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── Loading screen ─────────────────────────────────────────── */
(function () {
  const loader    = document.getElementById('loader');
  const loaderImg = document.getElementById('loader-img');

  /* Set correct gif based on current theme */
  const theme = document.documentElement.getAttribute('data-theme');
  loaderImg.src = theme === 'light'
    ? 'assets/logo_loading_white.gif'
    : 'assets/logo_loading_dark.gif';

  function hideLoader() {
    loader.classList.add('hidden');
  }

  /* Hide after page load, minimum 1.4s for brand visibility */
  const minDelay = 1400;
  const start    = Date.now();

  window.addEventListener('load', function () {
    const elapsed = Date.now() - start;
    const wait    = Math.max(0, minDelay - elapsed);
    setTimeout(hideLoader, wait);
  });

  /* Fallback — hide after 4 s regardless */
  setTimeout(hideLoader, 4000);
})();

/* ─── Theme toggle ───────────────────────────────────────────── */
(function () {
  const root        = document.documentElement;
  const btn         = document.getElementById('theme-toggle');
  const navLogo     = document.getElementById('nav-logo-img');
  const footerLogo  = document.getElementById('footer-logo');
  const loaderImg   = document.getElementById('loader-img');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('bd-theme', theme);

    if (theme === 'dark') {
      if (navLogo)    navLogo.src    = 'assets/logo_dark.png';
      if (footerLogo) footerLogo.src = 'assets/logo_dark.png';
      if (loaderImg)  loaderImg.src  = 'assets/logo_loading_dark.gif';
    } else {
      if (navLogo)    navLogo.src    = 'assets/logo_white.png';
      if (footerLogo) footerLogo.src = 'assets/logo_white.png';
      if (loaderImg)  loaderImg.src  = 'assets/logo_loading_white.gif';
    }
  }

  /* Initialise logos correctly on first load */
  applyTheme(root.getAttribute('data-theme') || 'dark');

  btn && btn.addEventListener('click', function () {
    const current = root.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* Follow OS preference changes (if user hasn't overridden) */
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
    if (!localStorage.getItem('bd-theme')) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });
})();

/* ─── Navbar scroll behaviour ────────────────────────────────── */
(function () {
  const nav = document.getElementById('navbar');
  let   lastY = 0;

  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 20);
    lastY = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ─── Active nav link ────────────────────────────────────────── */
(function () {
  const links    = document.querySelectorAll('.nav-link');
  const sections = Array.from(document.querySelectorAll('section[id]'));

  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        links.forEach(function (l) { l.classList.remove('active'); });
        const id   = entry.target.getAttribute('id');
        const link = document.querySelector('.nav-link[href="#' + id + '"]');
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(function (s) { io.observe(s); });
})();

/* ─── Mobile menu ────────────────────────────────────────────── */
(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const overlay   = document.getElementById('mobile-overlay');

  function openMenu() {
    navLinks.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    overlay.classList.add('visible');
    requestAnimationFrame(function () { overlay.classList.add('active'); });
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('active');
    setTimeout(function () { overlay.classList.remove('visible'); }, 300);
    document.body.style.overflow = '';
  }

  hamburger && hamburger.addEventListener('click', function () {
    navLinks.classList.contains('open') ? closeMenu() : openMenu();
  });

  overlay && overlay.addEventListener('click', closeMenu);

  /* Close on nav link click */
  document.querySelectorAll('.nav-link').forEach(function (l) {
    l.addEventListener('click', closeMenu);
  });

  /* Close on escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();

/* ─── Scroll reveal ──────────────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.scroll-reveal');

  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(function (el) { io.observe(el); });
})();

/* ─── Animated counters ──────────────────────────────────────── */
(function () {
  const nums  = document.querySelectorAll('.stat-num[data-target]');
  let   fired = false;

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function runCounters() {
    if (fired) return;
    fired = true;
    nums.forEach(function (el) {
      const target   = parseInt(el.dataset.target, 10);
      const duration = 1600;
      const start    = performance.now();

      function frame(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        el.textContent = Math.round(easeOut(progress) * target);
        if (progress < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
  }

  /* Fire counters when hero stats come into view */
  const statsBlock = document.querySelector('.hero-stats');
  if (statsBlock) {
    const io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        runCounters();
        io.disconnect();
      }
    }, { threshold: .5 });
    io.observe(statsBlock);
  }
})();

/* ─── Back to top ────────────────────────────────────────────── */
(function () {
  const btt = document.getElementById('btt');
  if (!btt) return;

  window.addEventListener('scroll', function () {
    btt.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btt.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ─── Smooth scroll for all anchor links ─────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const id      = anchor.getAttribute('href').slice(1);
    const target  = id ? document.getElementById(id) : null;
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});
