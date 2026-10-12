/* ==========================================================================
   ANDE: shared page chrome (icon sprite, header, footer, drawer, floating
   buttons). Written once here and injected into every page, so a change to
   the header or footer is one edit. In Bitrix this becomes header.php /
   footer.php of the template.
   ========================================================================== */
(function () {
  'use strict';

  var CATS = [
    ['heating', 'გათბობა', 'i-flame'], ['cooling', 'გაგრილება', 'i-snow'], ['ventilation', 'ვენტილაცია', 'i-fan'],
    ['ducts', 'ჰაერსატარები', 'i-duct'], ['water', 'წყალმომარაგება', 'i-drop']
  ];
  var page = document.body.getAttribute('data-page') || '';
  function ico(id, cls) { return '<svg class="ico' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#' + id + '"/></svg>'; }

  var SPRITE = '<svg width="0" height="0" style="position:absolute" aria-hidden="true">' +
    sym('i-search', '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>') +
    sym('i-user', '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c.8-3.9 3.8-6 7.5-6s6.7 2.1 7.5 6"/>') +
    sym('i-heart', '<path d="M12 20.3s-7.5-4.6-9.3-9.4C1.5 7.6 3.6 4.5 7 4.5c2.1 0 3.6 1.2 5 3 1.4-1.8 2.9-3 5-3 3.4 0 5.5 3.1 4.3 6.4-1.8 4.8-9.3 9.4-9.3 9.4z"/>') +
    sym('i-bag', '<path d="M5 8.5h14l-1.1 11a1.5 1.5 0 0 1-1.5 1.4H7.6a1.5 1.5 0 0 1-1.5-1.4L5 8.5z"/><path d="M8.5 8.5V7a3.5 3.5 0 0 1 7 0v1.5"/>') +
    sym('i-bars', '<path d="M5 20V11M12 20V4M19 20v-6"/>') +
    sym('i-phone', '<path d="M5 4h3.4l1.8 4.4-2.3 1.4a11 11 0 0 0 6.3 6.3l1.4-2.3 4.4 1.8V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4z"/>') +
    sym('i-clock', '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>') +
    sym('i-pin', '<path d="M12 21s-6.5-5.7-6.5-11a6.5 6.5 0 0 1 13 0c0 5.3-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>') +
    sym('i-mail', '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>') +
    sym('i-truck', '<path d="M2.5 6.5h11v9h-11z"/><path d="M13.5 9.5h4l3 3.2v2.8h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>') +
    sym('i-shield', '<path d="M12 3.5 5 6v5.5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-2.5z"/><path d="m9 12 2.2 2.2L15.5 10"/>') +
    sym('i-headset', '<path d="M4.5 13.5V12a7.5 7.5 0 0 1 15 0v1.5"/><rect x="3.5" y="13" width="4" height="6" rx="1.5"/><rect x="16.5" y="13" width="4" height="6" rx="1.5"/><path d="M18.5 19c0 1.4-1.6 2-3.5 2h-2"/>') +
    sym('i-tag', '<path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1.4 1.4 0 0 1 0 2l-6.7 6.7a1.4 1.4 0 0 1-2 0z"/><circle cx="8" cy="8" r="1.4"/>') +
    sym('i-arrow', '<path d="M5 12h14M13 6l6 6-6 6"/>') +
    sym('i-chev', '<path d="m6 9 6 6 6-6"/>') +
    sym('i-chev-r', '<path d="m9 6 6 6-6 6"/>') +
    sym('i-menu', '<path d="M4 7h16M4 12h16M4 17h10"/>') +
    sym('i-close', '<path d="M6 6l12 12M18 6 6 18"/>') +
    sym('i-check', '<path d="m5 12.5 4.2 4.2L19 7"/>') +
    sym('i-plus', '<path d="M12 5v14M5 12h14"/>') +
    sym('i-minus', '<path d="M5 12h14"/>') +
    sym('i-trash', '<path d="M4.5 7h15M9.5 7V5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2M6.5 7l.8 12a1.5 1.5 0 0 0 1.5 1.4h6.4a1.5 1.5 0 0 0 1.5-1.4l.8-12"/>') +
    sym('i-copy', '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>') +
    sym('i-zoom', '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6M11 8v6M8 11h6"/>') +
    sym('i-sliders', '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>') +
    sym('i-grid', '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>') +
    sym('i-list', '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>') +
    sym('i-chat', '<path d="M20 12a8 8 0 0 1-11.8 7L4 20l1.1-4A8 8 0 1 1 20 12z"/><path d="M8.5 11h7M8.5 14h4"/>') +
    sym('i-send', '<path d="M4 12 20 4l-4 16-4-6.5z"/><path d="m12 13.5 8-9.5"/>') +
    sym('i-sun', '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/>') +
    sym('i-moon', '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>') +
    sym('i-card', '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3"/>') +
    sym('i-cash', '<rect x="3" y="6.5" width="18" height="11" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6.5 9.5h.01M17.5 14.5h.01"/>') +
    sym('i-bank', '<path d="M3.5 9.5 12 4l8.5 5.5M5 9.5V18M9.5 9.5V18M14.5 9.5V18M19 9.5V18M3.5 20.5h17"/>') +
    sym('i-calendar', '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>') +
    sym('i-info', '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>') +
    sym('i-building', '<path d="M4 20.5V5.5A1.5 1.5 0 0 1 5.5 4h8A1.5 1.5 0 0 1 15 5.5v15M15 10h3.5a1.5 1.5 0 0 1 1.5 1.5v9M3 20.5h18M8 8h3M8 12h3M8 16h3"/>') +
    sym('i-store', '<path d="M4 9.5V20h16V9.5"/><path d="M3 9.5 5 4h14l2 5.5a2.5 2.5 0 0 1-4.5 1.5A2.5 2.5 0 0 1 12 11a2.5 2.5 0 0 1-4.5 0A2.5 2.5 0 0 1 3 9.5z"/><path d="M9.5 20v-5h5v5"/>') +
    sym('i-doc', '<path d="M6 3.5h8l4 4v13H6z"/><path d="M14 3.5v4h4M9 13h6M9 16.5h6"/>') +
    sym('i-flame', '<path d="M12 21.5c-3.9 0-7-2.8-7-6.6 0-2.7 1.6-4.6 3.2-6.3.3 1.6 1.2 2.7 2.5 3.1-.3-3.4 1.4-6.4 4-8.2-.2 2.8 1 4.5 2.3 6.2 1.2 1.5 2 3.1 2 5.2 0 3.8-3.1 6.6-7 6.6z"/>') +
    sym('i-snow', '<path d="M12 2.5v19M3.8 7.3l16.4 9.4M3.8 16.7l16.4-9.4"/><path d="M9.3 3.9 12 6.3l2.7-2.4M9.3 20.1l2.7-2.4 2.7 2.4M20.4 13.7 17 14.8l.8 3.5M6.3 5.6 7 9.2l-3.4 1.2M6.3 18.4 7 14.8l-3.4-1.2M20.4 10.3 17 9.2l.8-3.5"/>') +
    sym('i-fan', '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="1.6"/><path stroke-width="1.95" d="M12.2 10.3c0-3.4 1.3-5.7 4.1-6M13.8 13c3 1.7 4.4 3.9 3 6.4M10.6 13c-3 1.7-5.5 1.8-6.9-.7"/>') +
    sym('i-duct', '<path d="M3 9.5 7 6.5h13.5l-4 3z"/><path d="M3 9.5h13.5V18H3z"/><path d="M16.5 18l4-3V6.5"/>') +
    sym('i-drop', '<path d="M12 3.2s6.3 6.6 6.3 11.2a6.3 6.3 0 0 1-12.6 0C5.7 9.8 12 3.2 12 3.2z"/><path d="M9 14.8a3 3 0 0 0 3 3"/>') +
    sym('i-radiator', '<rect x="3.5" y="5" width="17" height="13" rx="2"/><path d="M7.7 5v13M12 5v13M16.3 5v13M6.5 18v2M17.5 18v2"/>') +
    sym('i-thermo', '<path d="M10 13.5V5a2 2 0 0 1 4 0v8.5a4 4 0 1 1-4 0z"/><path d="M12 9v7"/>') +
    sym('i-box', '<path d="M3.5 7.5 12 3.5l8.5 4v9L12 20.5l-8.5-4z"/><path d="M3.5 7.5 12 11.5l8.5-4M12 11.5v9"/>') +
    sym('i-filter', '<path d="M4 5h16l-6 7.5V19l-4 1.5v-8z"/>') +
    sym('i-flask', '<path d="M9 3.5h6M10 3.5v6L5 18.5a1.5 1.5 0 0 0 1.3 2h11.4a1.5 1.5 0 0 0 1.3-2L14 9.5v-6"/><path d="M7.5 15h9"/>') +
    sym('i-gauge', '<circle cx="12" cy="13" r="8"/><path d="m12 13 3.5-3.5M6.5 13h1M16.5 13h1M12 7.5v1"/>') +
    sym('i-pipe', '<path d="M3 7h7a5 5 0 0 1 5 5v9"/><path d="M3 12h5a2 2 0 0 1 2 2v7"/>') +
    sym('i-tool', '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>') +
    sym('i-bolt','<path d="M13 3 5 13.5h6L10 21l8-10.5h-6z"/>') +
    sym('i-fb', '<path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V9a.5.5 0 0 1 .5-.5z"/>') +
    sym('i-ig', '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.8"/><path d="M17.2 6.8h.01"/>') +
    sym('i-yt', '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10.5 9.5 4 2.5-4 2.5z"/>') +
    '</svg>';
  function sym(id, body) { return '<symbol id="' + id + '" viewBox="0 0 24 24">' + body + '</symbol>'; }

  var LOGO = '<img class="logo-l" src="../brand/logo/ande-logo-ka.svg" alt="ანდე" width="150" height="37"><img class="logo-d" src="../brand/logo/ande-logo-ka-white.svg" alt="ანდე" width="150" height="37">';

  var HEADER =
    '<div class="topbar"><div class="wrap">' +
      '<div class="topbar__group"><a class="topbar__phone" href="tel:+995322152152">' + ico('i-phone') + '0322 152 152</a>' +
      '<span class="topbar__hours">' + ico('i-clock') + 'ყოველდღე 10:00–18:00</span></div>' +
      '<div class="topbar__group topbar__group--aux"><a href="about.html#stores">მაღაზიები</a><a href="product.html?id=2159#delivery">მიწოდება და გადახდა</a><a href="index.html#service">კონსულტაცია</a>' +
      '<span class="lang"><a href="#" aria-current="true">KA</a><a href="#">EN</a></span></div>' +
    '</div></div>' +
    '<header class="hdr" id="hdr">' +
      '<div class="wrap hdr__row">' +
        '<button class="iconbtn hdr__burger" type="button" aria-label="მენიუ" aria-controls="drawer" aria-expanded="false" data-drawer-open>' + ico('i-menu') + '</button>' +
        '<a class="hdr__logo" href="index.html" aria-label="ანდე, მთავარი">' + LOGO + '</a>' +
        '<form class="search" role="search" action="catalog.html" data-search>' + ico('i-search') +
          '<label class="sr-only" for="q">ძიება</label>' +
          '<input id="q" name="q" type="search" placeholder="მოძებნე პროდუქტი, ბრენდი ან კოდი" autocomplete="off" role="combobox" aria-expanded="false" aria-controls="suggest" aria-autocomplete="list">' +
          '<button class="search__go" type="submit" aria-label="ძიება">' + ico('i-arrow') + '</button>' +
          '<div class="suggest" id="suggest" role="listbox" hidden></div>' +
        '</form>' +
        '<div class="hdr__actions">' +
          '<button class="iconbtn hdr__search-toggle" type="button" aria-label="ძიება" data-search-toggle>' + ico('i-search') + '</button>' +
          '<button class="iconbtn theme-toggle" type="button" aria-label="მუქი / ღია რეჟიმი" title="მუქი / ღია რეჟიმი" data-theme-toggle>' + ico('i-moon', 'ico-moon') + ico('i-sun', 'ico-sun') + '</button>' +
          '<button class="act act--user" type="button" data-login>' + ico('i-user') + '<span class="act__label">შესვლა<b>კაბინეტი</b></span></button>' +
          '<a class="act act--cmp" href="compare.html" aria-label="შედარება" data-badge="compare">' + ico('i-bars') + '<span class="act__count" data-n="0">0</span></a>' +
          '<a class="act act--wish" href="wishlist.html" aria-label="რჩეულები" data-badge="wish">' + ico('i-heart') + '<span class="act__count" data-n="0">0</span></a>' +
          '<a class="act act--cart" href="cart.html" aria-label="კალათა" data-badge="cart">' + ico('i-bag') + '<span class="act__count" data-n="0">0</span><span class="act__label">კალათა<b data-cart-total>0 ₾</b></span></a>' +
        '</div>' +
      '</div>' +
      '<nav class="catnav" aria-label="კატეგორიები"><div class="wrap">' +
        '<button class="catnav__btn" type="button" aria-expanded="false" aria-controls="mega" data-mega-toggle>' + ico('i-menu') + '<span>კატალოგი</span>' + ico('i-chev', 'catnav__chev') + '</button>' +
        '<ul class="catnav__aux"><li><a href="index.html#service">სერვისები</a></li><li><a class="catnav__sale" href="catalog.html">აქციები</a></li><li><a href="index.html#brands">ბრენდები</a></li><li><a href="about.html"' + (page === 'about' ? ' aria-current="page"' : '') + '>კომპანია</a></li><li><a href="about.html#contact">კონტაქტი</a></li></ul>' +
      '</div></nav>' +
      '<div class="mega" id="mega" data-mega><div class="wrap"><div class="mega__panel">' +
        '<div class="mega__cats" role="tablist" aria-label="კატეგორიები" data-mega-cats></div>' +
        '<div class="mega__body"><div data-mega-body></div>' +
          '<aside class="mega__promo"><h3>გჭირდებათ დახმარება შერჩევაში?</h3><p>ჩვენი ინჟინრები დაგეხმარებიან თქვენი სახლის ან ობიექტისთვის სწორი სისტემის შერჩევაში.</p><button class="btn btn--light" type="button" data-chat-open>კონსულტაცია</button></aside>' +
        '</div>' +
      '</div></div></div>' +
    '</header>' +
    '<div class="mega-scrim" data-mega-scrim></div>';

  var FOOTER =
    '<footer class="footer"><div class="wrap">' +
      '<div class="news"><div><h2>გამოიწერე აქციები</h2><p>პირველმა გაიგე ახალი პროდუქციისა და შეთავაზებების შესახებ.</p></div>' +
        '<form data-newsletter novalidate><label class="sr-only" for="nl">ელ. ფოსტა</label><input id="nl" type="email" placeholder="ელ. ფოსტა" required><button class="btn btn--light" type="submit">გამოწერა</button></form></div>' +
      '<div class="fgrid">' +
        '<div class="fbrand"><img src="../brand/logo/ande-logo-ka-white.svg" alt="ანდე" width="150" height="37"><p>გათბობის, გაგრილების, ვენტილაციისა და წყალმომარაგების სისტემები 2006 წლიდან.</p>' +
          '<div class="social"><a href="#" aria-label="Facebook">' + ico('i-fb') + '</a><a href="#" aria-label="Instagram">' + ico('i-ig') + '</a><a href="#" aria-label="YouTube">' + ico('i-yt') + '</a></div></div>' +
        '<div class="fcol"><h3>კატალოგი</h3><ul>' + CATS.map(function (c) { return '<li><a href="catalog.html?cat=' + c[0] + '">' + c[1] + '</a></li>'; }).join('') + '<li><a href="catalog.html">ყველა პროდუქტი</a></li></ul></div>' +
        '<div class="fcol"><h3>კომპანია</h3><ul><li><a href="about.html">ჩვენ შესახებ</a></li><li><a href="about.html#history">ისტორია</a></li><li><a href="about.html#certificates">სერტიფიკატები</a></li><li><a href="about.html#careers">კარიერა</a></li><li><a href="about.html#requisites">რეკვიზიტები</a></li><li><a href="about.html#stores">მაღაზიები</a></li></ul></div>' +
        '<div class="fcol"><h3>მომხმარებელს</h3><ul><li><a href="cart.html">კალათა</a></li><li><a href="wishlist.html">რჩეულები</a></li><li><a href="compare.html">შედარება</a></li><li><a href="#">მიწოდება და გადახდა</a></li><li><a href="#">განვადება</a></li><li><a href="#">ხშირად დასმული კითხვები</a></li></ul></div>' +
        '<div class="fcol fcontact"><h3>კონტაქტი</h3><ul>' +
          '<li>' + ico('i-phone') + '<a href="tel:+995322152152"><b>0322 152 152</b></a></li>' +
          '<li>' + ico('i-mail') + '<a href="mailto:info@ande.ge">info@ande.ge</a></li>' +
          '<li>' + ico('i-pin') + '<span>თბილისი, წერეთლის 116</span></li>' +
          '<li>' + ico('i-clock') + '<span>ყოველდღე 10:00–18:00</span></li></ul></div>' +
      '</div>' +
      '<div class="fbottom"><span>© 2026 ანდე. ყველა უფლება დაცულია.</span><span class="pay" aria-label="გადახდის მეთოდები"><span>VISA</span><span>MASTERCARD</span></span></div>' +
    '</div></footer>' +

    '<div class="drawer" id="drawer" data-drawer aria-hidden="true"><div class="drawer__scrim" data-drawer-close></div>' +
      '<div class="drawer__panel" role="dialog" aria-modal="true" aria-label="მენიუ">' +
        '<div class="drawer__head"><a href="index.html">' + LOGO.replace(/width="150"/g, 'width="120"') + '</a><button class="iconbtn" type="button" aria-label="დახურვა" data-drawer-close>' + ico('i-close') + '</button></div>' +
        '<div class="drawer__body"><div data-drawer-cats></div>' +
          '<nav class="dlinks"><a href="cart.html">კალათა <span class="act__count" data-badge-n="cart" data-n="0">0</span></a><a href="wishlist.html">რჩეულები <span class="act__count" data-badge-n="wish" data-n="0">0</span></a><a href="compare.html">შედარება <span class="act__count" data-badge-n="compare" data-n="0">0</span></a><a href="#" data-login>შესვლა / რეგისტრაცია</a><a href="about.html">ჩვენ შესახებ</a><a href="index.html#service">სერვისები</a><a href="about.html#stores">მაღაზიები</a></nav>' +
          '<button class="dtheme" type="button" data-theme-toggle><span>მუქი რეჟიმი</span><span class="switch__track" aria-hidden="true"></span></button>' +
          '<div class="dcontact">დაგვირეკეთ<b>0322 152 152</b>ყოველდღე 10:00–18:00</div>' +
        '</div></div></div>' +

    '<div class="fabs" data-fabs>' +
      '<button class="totop" type="button" aria-label="ზემოთ ასვლა" data-totop><svg class="ring" viewBox="0 0 46 46" aria-hidden="true"><circle class="bg" cx="23" cy="23" r="21"/><circle class="fg" cx="23" cy="23" r="21"/></svg>' + ico('i-arrow') + '</button>' +
      '<div style="position:relative">' +
        '<div class="chatbubble" data-chat-bubble role="status"><button type="button" aria-label="დახურვა" data-bubble-close>' + ico('i-close') + '</button><b>გამარჯობა!</b>რით შეგვიძლია დაგეხმაროთ?</div>' +
        '<button class="chatfab" type="button" aria-label="მხარდაჭერა და ჩატი" aria-expanded="false" aria-controls="chat" data-chat-toggle>' + ico('i-chat', 'ico-chat') + ico('i-close', 'ico-close') + '<span class="chatfab__dot" aria-hidden="true"></span></button>' +
      '</div>' +
    '</div>' +
    '<section class="chat" id="chat" aria-label="მხარდაჭერა" data-chat>' +
      '<div class="chat__head"><span class="chat__avatar"><img src="../brand/logo/ande-symbol.svg" alt=""></span><div><b>ანდე · მხარდაჭერა</b><small>ონლაინ · ყოველდღე 10:00–18:00</small></div>' +
        '<button class="iconbtn" type="button" aria-label="დახურვა" data-chat-toggle>' + ico('i-close') + '</button></div>' +
      '<div class="chat__log" data-chat-log aria-live="polite"></div>' +
      '<div class="chat__acts"><a href="tel:+995322152152">' + ico('i-phone') + 'დარეკვა</a><button type="button" data-chat-callback>' + ico('i-headset') + 'გადმორეკვა</button></div>' +
      '<form class="chat__foot" data-chat-form><label class="sr-only" for="chat-in">შეტყობინება</label><input id="chat-in" type="text" placeholder="დაწერეთ კითხვა…" autocomplete="off"><button class="chat__send" type="submit" aria-label="გაგზავნა">' + ico('i-send') + '</button></form>' +
    '</section>' +

    '<div class="modal" data-modal aria-hidden="true"><div class="modal__scrim" data-modal-close></div><div class="modal__panel" role="dialog" aria-modal="true"><button class="iconbtn modal__close" type="button" aria-label="დახურვა" data-modal-close>' + ico('i-close') + '</button><div data-modal-body></div></div></div>' +
    '<div class="lightbox" data-lightbox aria-hidden="true"><img alt=""><button class="lightbox__close" type="button" aria-label="დახურვა" data-lb-close>' + ico('i-close') + '</button><button class="lightbox__prev" type="button" aria-label="წინა" data-lb-prev>' + ico('i-arrow') + '</button><button class="lightbox__next" type="button" aria-label="შემდეგი" data-lb-next>' + ico('i-arrow') + '</button></div>' +
    '<div class="toast" role="status" aria-live="polite" data-toast></div>';

  document.body.insertAdjacentHTML('afterbegin', SPRITE + '<a class="sr-only" href="#main">მთავარ შიგთავსზე გადასვლა</a>');
  var h = document.querySelector('[data-layout="header"]');
  if (h) h.outerHTML = HEADER;
  var f = document.querySelector('[data-layout="footer"]');
  if (f) f.outerHTML = FOOTER;
})();
