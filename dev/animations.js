// Появление блоков при прокрутке: плавное проявление с небольшим подъёмом, списки и сетки — по очереди.
// Если анимации отключены в системе или скрипт не загрузился, контент виден сразу
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('js-anim');

  // Те же селекторы, что в style.css в разделе «Анимации»
  const SINGLE = '.hero > *, .page-hero > :is(h1, p, .button), .article-hero > *, .section-head, .split-intro, .split-text, .about > :is(h2, p), .cta > *, footer section > h2';
  const GROUP = '.cards, .numbered, .events ul, .steps, .stats, .contact-cards';

  document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        // Показываем, когда блок вошёл в экран или уже остался выше (страница открыта не с начала)
        if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -8% 0px' });

    for (const el of document.querySelectorAll(SINGLE)) {
      const siblings = [...el.parentElement.children].filter((child) => child.matches(SINGLE));
      el.style.setProperty('--i', siblings.indexOf(el));
      observer.observe(el);
    }

    for (const group of document.querySelectorAll(GROUP)) {
      [...group.children].forEach((child, i) => child.style.setProperty('--i', Math.min(i, 8)));
      observer.observe(group);
    }
  });
})();
