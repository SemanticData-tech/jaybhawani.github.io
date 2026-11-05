(function () {
  /* ---- Tabs: deep links (#Farsana etc.) incl. old category hashes ---- */
  var legacy = {Breakfast: 'Farsana', Launch: 'Farsana', Lunch: 'Farsana', Dinner: 'Farsana', Sneaks: 'Special', Snacks: 'Special'};
  function openFromHash() {
    var h = (location.hash || '').replace('#', '');
    if (legacy[h]) h = legacy[h];
    var tab = h && document.getElementById(h + '-tab');
    if (tab && window.jQuery) jQuery(tab).tab('show');
  }
  window.addEventListener('load', openFromHash);
  window.addEventListener('hashchange', openFromHash);
  if (window.jQuery) jQuery('#menuTab a[data-toggle="tab"]').on('shown.bs.tab', function () {
    if (history.replaceState) history.replaceState(null, '', this.getAttribute('href'));
  });

  /* ---- Lightbox (scoped to the visible tab) ---- */
  var lb = document.createElement('div');
  lb.className = 'jb-lb';
  lb.innerHTML = '<button class="x" aria-label="Close">&times;</button><button class="p" aria-label="Previous">&#8249;</button><img alt=""><button class="n" aria-label="Next">&#8250;</button><div class="jb-lb-cap"></div>';
  document.body.appendChild(lb);
  var img = lb.querySelector('img'), cap = lb.querySelector('.jb-lb-cap'), items = [], idx = 0;

  function show(i) {
    idx = (i + items.length) % items.length;
    var it = items[idx];
    img.src = it.src; img.alt = it.title;
    cap.innerHTML = it.title + ' <a target="_blank" rel="noopener" href="https://wa.me/919420002526?text=' + encodeURIComponent('Hi jay bhawani team, I want to order ' + it.title + ' in bulk quantity. Please share details.') + '">Enquire on WhatsApp</a>';
  }
  function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-zoom]');
    if (!t || e.target.closest('a')) return;
    var pane = t.closest('.tab-pane');
    var nodes = Array.prototype.slice.call(pane.querySelectorAll('[data-zoom]'));
    items = nodes.map(function (n) { return {src: n.getAttribute('data-zoom'), title: n.getAttribute('data-title') || ''}; });
    show(nodes.indexOf(t));
    lb.classList.add('open'); document.body.style.overflow = 'hidden';
  });
  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target.classList.contains('x')) close();
    else if (e.target.classList.contains('p')) show(idx - 1);
    else if (e.target.classList.contains('n')) show(idx + 1);
  });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
  var sx = 0;
  lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, {passive: true});
  lb.addEventListener('touchend', function (e) { var d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) show(idx + (d < 0 ? 1 : -1)); });
})();
