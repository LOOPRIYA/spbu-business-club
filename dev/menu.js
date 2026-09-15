// Кнопка «Меню» в шапке на телефоне
const toggle = document.querySelector('.menu-toggle');

toggle.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!isOpen));
  toggle.textContent = isOpen ? 'Меню' : 'Закрыть';
});
