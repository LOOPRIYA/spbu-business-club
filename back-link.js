// Если в интервью перешли с главной (?from=home), «Назад» ведёт на главную, а не в архив
const backLink = document.querySelector('.back-link');

if (new URLSearchParams(location.search).get('from') === 'home') {
  backLink.href = 'index.html';
  backLink.textContent = '← На главную';
}
