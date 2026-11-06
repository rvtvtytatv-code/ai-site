document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var mobile = document.getElementById('mobile-nav');
  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Открыть меню' : 'Закрыть меню');
      mobile.hidden = isOpen;
      document.body.classList.toggle('menu-open', !isOpen);
    });
    mobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        mobile.hidden = true;
        document.body.classList.remove('menu-open');
      });
    });
  }
  document.getElementById('year').textContent = String(new Date().getFullYear());
  var plans = [
    { name: 'Старт', duration: '1 месяц', price: '3 500 ₽' },
    { name: 'Развитие', duration: '3 месяца', price: '7 500 ₽' },
    { name: 'Масштаб', duration: '6 месяцев', price: '12 000 ₽' },
    { name: 'Максимум', duration: '12 месяцев', price: '20 000 ₽' }
  ];
  document.querySelectorAll('.price-button').forEach(function (link, index) {
    var plan = plans[index];
    if (!plan) return;
    var message = 'Здравствуйте! Меня интересует продвижение на 150+ площадках по тарифу «' +
      plan.name + '» на ' + plan.duration + ' за ' + plan.price +
      '. Подскажите, пожалуйста, как можно начать работу?';
    link.href = 'https://t.me/AgentAIManager?text=' + encodeURIComponent(message);
    link.setAttribute('aria-label', 'Написать менеджеру о тарифе «' + plan.name + '»');
  });
  var track = document.getElementById('reviews-track');
  if (track) {
    Array.from(track.children).forEach(function (card) {
      var clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  }
  var toast = document.getElementById('toast');
  var toastTimer;
  document.querySelectorAll('[data-placeholder="channel"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 3000);
    });
  });
  var opts = { threshold: 0.12, rootMargin: '0px 0px -30px 0px' };
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, opts);
    document.querySelectorAll('.method-card,.platform-card,.solution-card,.case-card,.price-card,.faq-list details').forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }
});
