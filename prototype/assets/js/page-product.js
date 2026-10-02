/* Product page: gallery + lightbox, buy box, tabs (description, full specification
   table, delivery and payment), similar products. In Bitrix: catalog.element. */
ANDE.page(function (A) {
  'use strict';
  var esc = A.esc, ico = A.ico;
  var p = A.byId(A.param('id'));
  var main = A.$('[data-product]');

  if (!p) {
    main.innerHTML = '<div class="wrap"><div class="empty" style="margin:40px 0 80px"><span class="empty__ico">' + ico('i-search') + '</span><h2>პროდუქტი ვერ მოიძებნა</h2><p>შესაძლოა ბმული მოძველებულია. სცადეთ ძიება ან დაათვალიერეთ კატალოგი.</p><a class="btn btn--primary" href="catalog.html">კატალოგი</a></div></div>';
    return;
  }
  A.recent.push(p.id);
  var cat = A.findCat(p.cat), sub = A.findSub(p.cat, p.sub);
  document.title = p.name + ' · ანდე';

  /* ---------- crumbs ---------- */
  A.$('[data-crumbs]').innerHTML = '<a href="index.html">მთავარი</a>' + ico('i-chev-r') + '<a href="catalog.html">კატალოგი</a>' + ico('i-chev-r') +
    '<a href="' + A.url.catalog(cat.id) + '">' + cat.name + '</a>' + ico('i-chev-r') + '<a href="' + A.url.catalog(cat.id, sub.id) + '">' + sub.name + '</a>';

  /* ---------- gallery ---------- */
  var imgs = p.imgs.map(function (f, i) { return A.img(p, i); });
  var gal = A.$('[data-gallery]'), cur = 0;
  if (!imgs.length) {
    gal.innerHTML = '<div class="gallery__main" style="cursor:default;grid-column:1/-1"><span class="pcard__media" style="background:none;height:100%"><span class="noimg">' + ico('i-box') + '</span></span></div>';
  } else {
    gal.innerHTML = (imgs.length > 1 ? '<div class="gallery__thumbs">' + imgs.map(function (src, i) {
      return '<button class="gallery__thumb" type="button" aria-label="სურათი ' + (i + 1) + '" aria-current="' + (i === 0) + '" data-thumb="' + i + '"><img src="' + src + '" alt=""></button>';
    }).join('') + '</div>' : '<div></div>') +
      '<div class="gallery__main" role="button" tabindex="0" aria-label="სურათის გადიდება" data-main><img src="' + imgs[0] + '" alt="' + esc(p.name) + '">' +
      (imgs.length > 1 ? '<button class="gallery__nav gallery__nav--prev" type="button" aria-label="წინა" data-step="-1">' + ico('i-arrow') + '</button><button class="gallery__nav gallery__nav--next" type="button" aria-label="შემდეგი" data-step="1">' + ico('i-arrow') + '</button><span class="gallery__count" data-gcount>1 / ' + imgs.length + '</span>' : '') +
      '<span class="gallery__zoomhint">' + ico('i-zoom') + 'გადიდება</span></div>';
    if (imgs.length < 2) gal.style.gridTemplateColumns = '1fr';
  }
  function go(i) {
    cur = (i + imgs.length) % imgs.length;
    var im = A.$('[data-main] img', gal); im.style.opacity = 0;
    setTimeout(function () { im.src = imgs[cur]; im.style.opacity = 1; }, 120);
    A.$$('[data-thumb]', gal).forEach(function (t, k) { t.setAttribute('aria-current', String(k === cur)); });
    var c = A.$('[data-gcount]', gal); if (c) c.textContent = (cur + 1) + ' / ' + imgs.length;
  }
  gal.addEventListener('click', function (e) {
    var t = e.target.closest('[data-thumb],[data-step],[data-main]'); if (!t) return;
    if (t.hasAttribute('data-thumb')) go(+t.getAttribute('data-thumb'));
    else if (t.hasAttribute('data-step')) { e.stopPropagation(); go(cur + +t.getAttribute('data-step')); }
    else A.openLightbox(imgs, cur);
  });
  gal.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') go(cur + 1); else if (e.key === 'ArrowLeft') go(cur - 1);
    else if ((e.key === 'Enter' || e.key === ' ') && e.target.hasAttribute('data-main')) { e.preventDefault(); A.openLightbox(imgs, cur); }
  });

  /* ---------- info + buy box ---------- */
  var key = A.keySpecs(p, 4), warranty = (p.specs.filter(function (s) { return s[0] === 'გარანტია'; })[0] || [])[1];
  var buy = A.canBuy(p);
  A.$('[data-info]').innerHTML =
    (p.brand ? '<a class="pinfo__brand" href="catalog.html?brand=' + encodeURIComponent(p.brand) + '">' + esc(A.brandName(p.brand)) + '</a>' : '') +
    '<h1>' + esc(p.name) + '</h1>' +
    '<div class="pinfo__meta">' + (p.art ? '<button class="copy" type="button" data-copy="' + esc(p.art) + '" title="კოდის კოპირება">კოდი ' + esc(p.art) + ico('i-copy') + '</button>' : '') +
      '<span class="stock ' + (p.stock ? 'stock--in">მარაგშია' : 'stock--out">შეკვეთით') + '</span>' +
      '<a class="textlink" href="' + A.url.catalog(cat.id, sub.id) + '">' + sub.name + '</a></div>' +
    (key.length ? '<dl class="keyspecs">' + key.map(function (s) { return '<div class="keyspec"><dt>' + esc(s[0]) + '</dt><dd>' + esc(s[1]) + '</dd></div>'; }).join('') +
      '<a class="link-arrow keyspecs__all" href="#specs">ყველა მახასიათებელი' + ico('i-arrow') + '</a></dl>' : '') +
    '<div class="buybox" data-buybox>' +
      '<div class="buybox__price">' + (p.price ? '<p class="price">' + A.priceHTML(p.price) + '</p><span class="buybox__unit">/ ცალი</span>' : '<p class="price price--ask" style="font-size:20px">ფასი მოთხოვნით</p>') + '</div>' +
      (buy
        ? '<div class="buybox__row"><div class="qty" role="group" aria-label="რაოდენობა"><button type="button" aria-label="შემცირება" data-qd="-1">' + ico('i-minus') + '</button><input id="pqty" type="number" min="1" max="99" value="1" inputmode="numeric" aria-label="რაოდენობა"><button type="button" aria-label="გაზრდა" data-qd="1">' + ico('i-plus') + '</button></div>' +
          '<button class="btn btn--primary" type="button" data-add="' + p.id + '" data-qty-from="#pqty">' + ico('i-bag') + '<span>კალათაში დამატება</span></button></div>' +
          '<div class="buybox__sub"><button class="btn btn--soft btn--sm" type="button" data-quick="' + p.id + '">სწრაფი შეკვეთა</button>'
        : '<div class="buybox__row"><button class="btn btn--primary" type="button" data-ask="' + p.id + '">' + ico('i-headset') + '<span>ფასის და ვადის მოთხოვნა</span></button></div><div class="buybox__sub">') +
        '<button class="btn btn--outline btn--sm" type="button" data-wish="' + p.id + '" aria-pressed="' + A.wish.has(p.id) + '">' + ico('i-heart') + 'რჩეული</button>' +
        '<button class="btn btn--outline btn--sm" type="button" data-compare="' + p.id + '" aria-pressed="' + A.compare.has(p.id) + '">' + ico('i-bars') + 'შედარება</button></div>' +
      '<p class="buybox__note">' + ico('i-info') + (p.stock ? 'მიწოდება მისამართზე ან გატანა ჩვენი მაღაზიებიდან.' : 'პროდუქტი შეკვეთით მოდის. ვადას და ფასს შეგითანხმებთ.') + '</p>' +
    '</div>' +
    '<div class="assure">' +
      '<div class="assure__item">' + ico('i-shield') + '<b>' + (warranty ? 'გარანტია ' + esc(warranty) : 'ოფიციალური გარანტია') + '</b>საგარანტიო მომსახურება</div>' +
      '<div class="assure__item">' + ico('i-truck') + '<b>მიწოდება</b>ან გატანა 3 მაღაზიიდან</div>' +
      '<div class="assure__item">' + ico('i-headset') + '<b>კონსულტაცია</b><a class="textlink" href="tel:+995322152152">0322 152 152</a></div>' +
    '</div>';
  var qty = A.$('#pqty');
  A.$('[data-info]').addEventListener('click', function (e) {
    var b = e.target.closest('[data-qd]'); if (!b || !qty) return;
    qty.value = Math.max(1, Math.min(99, (parseInt(qty.value, 10) || 1) + +b.getAttribute('data-qd')));
  });
  if (qty) qty.addEventListener('change', function () { qty.value = Math.max(1, Math.min(99, parseInt(qty.value, 10) || 1)); });

  /* ---------- description ---------- */
  var about = A.$('#about');
  var paras = (p.desc || '').split('\n').filter(Boolean);
  if (!paras.length && !p.feats.length) {
    about.remove(); A.$('#tab-about').remove();
  } else {
    A.$('[data-desc]').innerHTML = paras.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') +
      (p.feats.length ? '<ul class="feats">' + p.feats.map(function (f) { return '<li>' + ico('i-check') + '<span>' + esc(f) + '</span></li>'; }).join('') + '</ul>' : '');
  }

  /* ---------- specifications ---------- */
  var rows = [['ბრენდი', A.brandName(p.brand)], ['კოდი', p.art], ['კატეგორია', cat.name + ' / ' + sub.name], ['ტიპი', p.type], ['ხელმისაწვდომობა', p.stock ? 'მარაგშია' : 'შეკვეთით']]
    .filter(function (r) { return r[1]; });
  A.$('[data-specs]').innerHTML =
    (p.specs.length ? '<table class="spectable"><caption>ტექნიკური მახასიათებლები</caption><tbody>' + p.specs.map(function (s) { return '<tr><th scope="row">' + esc(s[0]) + '</th><td>' + esc(s[1]) + '</td></tr>'; }).join('') + '</tbody></table>' : '') +
    '<table class="spectable" style="margin-top:' + (p.specs.length ? '28px' : '0') + '"><caption>ზოგადი ინფორმაცია</caption><tbody>' + rows.map(function (r) { return '<tr><th scope="row">' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td></tr>'; }).join('') + '</tbody></table>';

  /* ---------- related ---------- */
  function rail(sel, list) {
    var box = A.$(sel); if (!box) return;
    if (!list.length) { box.closest('.psec').remove(); return; }
    var track = A.$('.rail__track', box);
    track.innerHTML = list.map(A.card).join('');
    var sec = box.closest('.psec'), prev = A.$('.prev', sec), next = A.$('.next', sec);
    function upd() { if (!prev) return; prev.disabled = track.scrollLeft < 8; next.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 8; }
    if (prev) {
      prev.addEventListener('click', function () { track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' }); });
      next.addEventListener('click', function () { track.scrollBy({ left: track.clientWidth, behavior: 'smooth' }); });
      track.addEventListener('scroll', upd, { passive: true }); setTimeout(upd, 50);
    }
  }
  var similar = A.products.filter(function (x) { return x.id !== p.id && x.sub === p.sub; }).sort(function (a, b) { return (b.stock - a.stock) || ((!!b.price) - (!!a.price)); }).slice(0, 12);
  rail('[data-similar]', similar);
  var seen = A.recent.list().filter(function (id) { return id !== p.id; }).slice(0, 8).map(A.byId);
  rail('[data-recent]', seen);

  /* ---------- tabs: description, specifications, delivery ---------- */
  var tabbox = A.$('[data-ptabs]'), tabbar = A.$('.pnav', tabbox), tabs = A.$$('[role="tab"]', tabbox);
  var tabrow = A.$('[role="tablist"]', tabbox);
  function showTab(id, focus) {
    var hit = tabs.filter(function (t) { return t.getAttribute('aria-controls') === id; })[0] || tabs[0];
    tabs.forEach(function (t) {
      var on = t === hit;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      A.$('#' + t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) hit.focus({ preventScroll: true });
    // on a phone the row scrolls sideways: bring the chosen tab to the middle
    var x = hit.getBoundingClientRect().left - tabrow.getBoundingClientRect().left + tabrow.scrollLeft;
    tabrow.scrollTo({ left: x - (tabrow.clientWidth - hit.offsetWidth) / 2, behavior: 'smooth' });
  }
  function rowEdge() { tabrow.classList.toggle('is-more', tabrow.scrollLeft + tabrow.clientWidth < tabrow.scrollWidth - 4); }
  tabrow.addEventListener('scroll', rowEdge, { passive: true });
  window.addEventListener('resize', rowEdge);
  rowEdge();
  // brings the tab bar back to the top of the screen when the reader is further down
  function toTabs(always) {
    var stick = parseFloat(getComputedStyle(tabbar).top) || 0, top = tabbox.getBoundingClientRect().top;
    if (always || top < stick) window.scrollTo(0, window.scrollY + top - stick);
  }
  function isTab(id) { return tabs.some(function (t) { return t.getAttribute('aria-controls') === id; }); }
  tabbar.addEventListener('click', function (e) {
    var t = e.target.closest('[role="tab"]'); if (!t) return;
    var id = t.getAttribute('aria-controls');
    showTab(id); toTabs(false);
    history.replaceState(null, '', '#' + id);
  });
  tabbar.addEventListener('keydown', function (e) {
    var i = tabs.indexOf(document.activeElement); if (i < 0) return;
    var n = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (n === undefined) return;
    e.preventDefault();
    var t = tabs[(n + tabs.length) % tabs.length];
    showTab(t.getAttribute('aria-controls'), true);
    history.replaceState(null, '', '#' + t.getAttribute('aria-controls'));
  });
  // links such as "ყველა მახასიათებელი" (#specs) open their tab
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]'); if (!a || a.closest('[role="tablist"]')) return;
    var id = a.getAttribute('href').slice(1); if (!isTab(id)) return;
    e.preventDefault(); showTab(id); toTabs(true);
    history.replaceState(null, '', '#' + id);
  });
  var start = location.hash.slice(1);
  showTab(isTab(start) ? start : '');
  if (isTab(start)) setTimeout(function () { toTabs(true); }, 60);
  window.addEventListener('hashchange', function () { var id = location.hash.slice(1); if (isTab(id)) { showTab(id); toTabs(true); } });

  /* ---------- mobile buy bar ---------- */
  var bar = A.$('[data-buybar]');
  bar.innerHTML = (p.price ? '<p class="price">' + A.priceHTML(p.price) + '</p>' : '<p class="price price--ask">ფასი მოთხოვნით</p>') +
    (buy ? '<button class="btn btn--primary" type="button" data-add="' + p.id + '" data-qty-from="#pqty">' + ico('i-bag') + '<span>კალათაში</span></button>'
         : '<button class="btn btn--primary" type="button" data-ask="' + p.id + '">' + ico('i-headset') + '<span>მოთხოვნა</span></button>');
  var bb = A.$('[data-buybox]');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      var off = !es[0].isIntersecting && es[0].boundingClientRect.top < 0;
      bar.classList.toggle('is-on', off);
      A.setFabLift(off && matchMedia('(max-width:860px)').matches ? 70 : 0);
    }).observe(bb);
  }
});
