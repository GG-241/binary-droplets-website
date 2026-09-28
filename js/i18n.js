'use strict';

(function () {
  var LANGS  = ['en', 'el', 'de', 'fr', 'es', 'ru'];
  var LABELS = { en:'EN', el:'ΕΛ', de:'DE', fr:'FR', es:'ES', ru:'RU' };

  function get(obj, path) {
    return path.split('.').reduce(function (o, k) {
      return o && o[k] !== undefined ? o[k] : null;
    }, obj);
  }

  function detectLang() {
    var saved = localStorage.getItem('bd-lang');
    if (saved && LANGS.indexOf(saved) !== -1) return saved;
    var nav = ((navigator.language || navigator.userLanguage) || 'en').toLowerCase().slice(0, 2);
    return ({ el:'el', de:'de', fr:'fr', es:'es', ru:'ru' })[nav] || 'en';
  }

  function applyLang(lang) {
    var T = (window.TRANSLATIONS && window.TRANSLATIONS[lang]) || window.TRANSLATIONS.en;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = get(T, el.getAttribute('data-i18n'));
      if (v !== null) el.textContent = v;
    });
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('bd-lang', lang);
    var label = document.getElementById('lang-label');
    if (label) label.textContent = LABELS[lang] || lang.toUpperCase();
    document.querySelectorAll('.lang-option').forEach(function (opt) {
      opt.classList.toggle('active', opt.dataset.lang === lang);
      opt.setAttribute('aria-selected', opt.dataset.lang === lang ? 'true' : 'false');
    });
  }

  window.applyLang = applyLang;

  document.addEventListener('DOMContentLoaded', function () {
    var btn      = document.getElementById('lang-btn');
    var dropdown = document.getElementById('lang-dropdown');

    if (btn && dropdown) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = dropdown.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });

      document.addEventListener('click', function () {
        dropdown.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });

      dropdown.addEventListener('click', function (e) {
        e.stopPropagation();
        var opt = e.target.closest('.lang-option');
        if (opt) {
          applyLang(opt.dataset.lang);
          dropdown.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        }
      });

      /* Close on Escape */
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          dropdown.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    applyLang(detectLang());
  });
})();
