// Полоса над шапкой: ближайшее мероприятие и таймер до окончания регистрации — на всех страницах.
// Данные задаются здесь, одни на весь сайт. Скрипт подключён в начале <body> без defer,
// чтобы полоса появилась сразу и страница не сдвигалась при загрузке
{
  const NEXT_EVENT = {
    title: 'Наталия Чанкина',
    date: '24.09 в 19:00',
    // Моковый дедлайн: заменить на реальное окончание регистрации. +03:00 — московское время
    registrationDeadline: '2026-09-24T19:00:00+03:00',
    link: 'index.html#next-event',
  };

  const deadline = Date.parse(NEXT_EVENT.registrationDeadline);

  // После дедлайна кнопка регистрации у мероприятия на главной заменяется надписью
  const closeRegistration = () => {
    const link = document.querySelector('#next-event a.link');
    if (!link) return;
    const closed = document.createElement('span');
    closed.className = 'link-soon';
    closed.textContent = 'Регистрация закрыта';
    link.replaceWith(closed);
  };

  if (deadline > Date.now()) {
    const bar = document.createElement('a');
    bar.className = 'event-bar';
    bar.href = NEXT_EVENT.link;

    const inner = document.createElement('span');
    inner.className = 'event-bar-inner';

    // Дата — отдельным кусочком после запятой: при переносе уходит на новую строку целиком
    const title = document.createElement('span');
    title.className = 'event-bar-title';
    const date = document.createElement('span');
    date.className = 'event-bar-date';
    date.textContent = NEXT_EVENT.date;
    title.append(`${NEXT_EVENT.title}, `, date);

    const timer = document.createElement('span');
    timer.className = 'event-bar-timer';
    const value = document.createElement('b');
    value.setAttribute('role', 'timer');
    timer.append('До конца регистрации', value);

    inner.append(title, timer);
    bar.append(inner);
    document.currentScript.after(bar);

    const pad = (number) => String(number).padStart(2, '0');

    const update = () => {
      const secondsLeft = Math.floor((deadline - Date.now()) / 1000);

      if (secondsLeft <= 0) {
        clearInterval(interval);
        bar.remove();
        closeRegistration();
        return;
      }

      const days = Math.floor(secondsLeft / 86400);
      const hours = Math.floor(secondsLeft / 3600) % 24;
      const minutes = Math.floor(secondsLeft / 60) % 60;
      const seconds = secondsLeft % 60;
      value.textContent = `${pad(days)} дн ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    const interval = setInterval(update, 1000);
    update();
  } else {
    document.addEventListener('DOMContentLoaded', closeRegistration);
  }
}
