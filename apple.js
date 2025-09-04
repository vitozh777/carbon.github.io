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


// --- Telegram BackButton на странице каталога ---
(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;            // страница открыта не в Телеграме
  
    tg.ready();                 // сообщаем, что страница готова
    const BackButton = tg.BackButton;
  
    // показать кнопку "Назад" в заголовке Телеграма
    BackButton.show();
  
    // по нажатию: пытаемся вернуться в историю, иначе закрываем мини-приложение
    BackButton.onClick(() => {
      try {
        if (document.referrer && new URL(document.referrer).origin === location.origin) {
          history.back();
        } else if (history.length > 1) {
          history.back();
        } else {
          tg.close();
        }
      } catch {
        tg.close();
      }
    });
  
    // (необязательно) настроить цвет хедера под тему Telegram
    // tg.setHeaderColor('secondary_bg_color'); // доступно в WebApp API
  })();
  