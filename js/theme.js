/*
 * theme.js — Light/Dark toggle for JayBhawani
 * Saved to localStorage. Applied before paint to avoid flash.
 */
(function () {
  var KEY  = 'jb-theme';
  var html = document.documentElement;

  // Apply saved preference immediately (no flash on reload)
  var saved = localStorage.getItem(KEY) || 'light';
  html.setAttribute('data-theme', saved);

  document.addEventListener('DOMContentLoaded', function () {
    // Build button
    var btn = document.createElement('button');
    btn.className = 'jb-theme-btn';
    btn.setAttribute('aria-label', 'Toggle light/dark theme');
    btn.innerHTML = '<span class="ico ico-sun">☀️</span><span class="ico ico-moon">🌙</span>';
    document.body.appendChild(btn);

    // Toggle on click
    btn.addEventListener('click', function () {
      var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem(KEY, next);
    });
  });
})();
