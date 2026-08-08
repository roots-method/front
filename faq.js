(function () {
  'use strict';

  var faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq__btn');
    var body = item.querySelector('.faq__body');
    if (!btn || !body) return;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      // Close all open items first
      faqItems.forEach(function (i) {
        if (i.classList.contains('is-open')) {
          i.classList.remove('is-open');
          i.querySelector('.faq__body').style.maxHeight = '0';
          i.querySelector('.faq__btn').setAttribute('aria-expanded', 'false');
        }
      });

      // Open clicked item if it was previously closed
      if (!isOpen) {
        item.classList.add('is-open');
        body.style.maxHeight = body.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}());
