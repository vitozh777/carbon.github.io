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


// === Telegram BackButton на странице apple ===
(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;                // если открыто не в Telegram — выходим
  
    tg.ready();                     // сообщаем Telegram, что страница готова
    const BackButton = tg.BackButton;
  
    function goHome() {
      try { BackButton.offClick(goHome); } catch {}
      try { BackButton.hide(); } catch {}
      // Возврат на главную и убираем эту страницу из истории,
      // чтобы повторный "назад" не возвращал обратно
      location.replace('index.html');
    }
  
    BackButton.onClick(goHome);
    BackButton.show();
  
    // Чистый уход со страницы (bfcache/уход по ссылке)
    window.addEventListener('pagehide', () => {
      try { BackButton.offClick(goHome); } catch {}
      try { BackButton.hide(); } catch {}
    });
  })();

  
  // Отключаем сворачивание по вертикальному свайпу на apple.html
(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
  
    tg.ready?.();
    tg.expand?.();                // на всякий случай разворачиваем
    tg.disableVerticalSwipes?.(); // <- главное
  
    // при уходе со страницы — вернём поведение по умолчанию
    window.addEventListener('pagehide', () => {
      try { tg.enableVerticalSwipes?.(); } catch {}
    });
  })();
  
  