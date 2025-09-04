// --- Telegram BackButton на apple.html ---
(function(){
    const tg = window.Telegram && window.Telegram.WebApp;
    if (!tg) return;              // если открыто не в Telegram — просто выходим
  
    tg.ready();                   // сообщаем, что страница готова
    tg.BackButton.show();         // показываем кнопку "Назад" в шапке бота
  
    const goBack = () => {
      // если пришли с главной — шаг назад по истории; иначе — открываем index.html
      if (document.referrer && /index\.html|\/$/.test(document.referrer)) {
        history.back();
      } else {
        window.location.href = 'index.html';
      }
    };
  
    tg.BackButton.onClick(goBack);
  
    // На всякий случай прячем при уходе со страницы (чтобы не "залипала" в боте)
    window.addEventListener('beforeunload', () => {
      try { tg.BackButton.hide(); tg.BackButton.offClick(goBack); } catch(e){}
    });
  })();
  


// apple.js — нативный свайп без клика по карточке
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.product-grid');
    if (!grid) return;
  
    // 1) НИКАКИХ кликов по карточке: только просмотр фото + кнопка "Купить".
    // (Если позже понадобится "Подробнее" — добавим отдельную маленькую ссылку.)
  
    // 2) Инициализация каждого слайдера
    document.querySelectorAll('.p-card .p-slider').forEach(slider => {
      const track = slider.querySelector('.p-track');
      const dots  = slider.parentElement.querySelectorAll('.p-dots .dot');
      if (!track) return;
  
      // Активная точка по положению скролла
      function setActiveByScroll() {
        const slideW = slider.clientWidth || 1;
        const i = Math.round(track.scrollLeft / slideW);
        dots.forEach((d, n) => {
          d.classList.toggle('is-active', n === i);
          d.setAttribute('aria-selected', n === i ? 'true' : 'false');
        });
      }
  
      // Клик по точке — плавно скроллим к нужному слайду
      dots.forEach((d, n) => {
        d.addEventListener('click', (e) => {
          e.stopPropagation();
          const slideW = slider.clientWidth;
          track.scrollTo({ left: n * slideW, behavior: 'smooth' });
        });
      });
  
      // Обновляем индикатор при скролле (throttle через rAF)
      let rafId = 0;
      track.addEventListener('scroll', () => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          setActiveByScroll();
          rafId = 0;
        });
      }, { passive: true });
  
      // На резайзах тоже корректируем активную точку
      window.addEventListener('resize', () => setActiveByScroll(), { passive: true });
  
      // Стартовое состояние
      setActiveByScroll();
    });
  });
  