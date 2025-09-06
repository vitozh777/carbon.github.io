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

  

  // --- Анимация нажатия кнопок на apple.html ---
(() => {
    // включает :active на iOS для <a>
    window.addEventListener('touchstart', ()=>{}, {passive:true});
  
    const pressables = document.querySelectorAll('.button, .buy-btn, .buy-btn-catalog');
    if (!pressables.length) return;
  
    pressables.forEach(el => {
      el.addEventListener('touchstart', () => el.classList.add('is-pressed'), {passive:true});
      const clear = () => el.classList.remove('is-pressed');
      el.addEventListener('touchend', clear,   {passive:true});
      el.addEventListener('touchcancel', clear,{passive:true});
      el.addEventListener('mouseleave', clear);
      el.addEventListener('mouseup', clear);
      el.addEventListener('blur', clear);
    });
  })();

  
  // --- Клик по всей карточке -> страница товара (с защитой от свайпа) ---
(() => {
    const cards = document.querySelectorAll('.p-card');
    if (!cards.length) return;
  
    const TAP_TOLERANCE = 12; // px — если палец сдвинулся больше, считаем жестом, а не тапом
  
    cards.forEach(card => {
      let startX = 0, startY = 0, moved = 0, suppressTap = false;
  
      const getHref = () =>
        card.dataset.href ||
        card.querySelector('.buy-btn-catalog, .buy-btn')?.getAttribute('href');
  
      // --- touch
      card.addEventListener('touchstart', (e) => {
        const t = e.touches[0];
        startX = t.clientX;
        startY = t.clientY;
        moved = 0;
  
        const target = e.target;
        // не навигируем, если тап по кнопке "Купить" или по точкам
        suppressTap = !!(
          target.closest('.buy-btn-catalog, .buy-btn') ||
          target.closest('.p-dots')
        );
      }, { passive: true });
  
      card.addEventListener('touchmove', (e) => {
        const t = e.touches[0];
        const dx = t.clientX - startX;
        const dy = t.clientY - startY;
        moved = Math.max(moved, Math.hypot(dx, dy));
      }, { passive: true });
  
      card.addEventListener('touchend', () => {
        if (suppressTap) return;
        if (moved > TAP_TOLERANCE) return; // это был свайп — не открываем
        const href = getHref();
        if (href) window.location.href = href;
      }, { passive: true });
  
      // --- mouse (на всякий случай для десктопа)
      let mouseDown = false;
      card.addEventListener('mousedown', (e) => {
        mouseDown = true;
        startX = e.clientX;
        startY = e.clientY;
        moved = 0;
        suppressTap = !!(
          e.target.closest('.buy-btn-catalog, .buy-btn') ||
          e.target.closest('.p-dots')
        );
      });
      card.addEventListener('mousemove', (e) => {
        if (!mouseDown) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        moved = Math.max(moved, Math.hypot(dx, dy));
      });
      card.addEventListener('mouseup', () => {
        if (!mouseDown) return;
        mouseDown = false;
        if (suppressTap) return;
        if (moved > TAP_TOLERANCE) return;
        const href = getHref();
        if (href) window.location.href = href;
      });
    });
  })();
  
  