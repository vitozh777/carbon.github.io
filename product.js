// product.js — нативный свайп на всю высоту + полоски-индикаторы + выбор размера
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.prod-track');
    const slider = document.querySelector('.prod-track');
    const barsWrap = document.querySelector('.hero-indicators .bars');
    const chooseBtn = document.getElementById('chooseSizeBtn');
    const sizeBox = document.getElementById('sizeOptions');
  
    if (!track || !slider || !barsWrap) return;
  
    const slides = Array.from(track.querySelectorAll('img'));
    let index = 0;
  
    // 1) Перерисовать полоски под реальное количество фото
    barsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const b = document.createElement('span');
      b.className = 'bar' + (i === 0 ? ' is-active' : '');
      barsWrap.appendChild(b);
    });
    const bars = Array.from(barsWrap.querySelectorAll('.bar'));
  
    function setActiveByScroll() {
      const w = slider.clientWidth || 1;
      const i = Math.round(track.scrollLeft / w);
      index = Math.max(0, Math.min(slides.length - 1, i));
      bars.forEach((bar, n) => bar.classList.toggle('is-active', n === index));
    }
  
    // 2) Свайп/скролл: нативный scroll-snap
    //    (точки/полоски кликабельными НЕ делаем — «обычный свайп» без клика)
    let rafId = 0;
    track.addEventListener('scroll', () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setActiveByScroll();
        rafId = 0;
      });
    }, { passive: true });
  
    window.addEventListener('resize', setActiveByScroll, { passive: true });
    setActiveByScroll();
  

  });
  

// === Размеры, Ozon, Telegram MainButton ===
document.addEventListener('DOMContentLoaded', () => {
    const sizeBtn   = document.getElementById('sizeButton');
    const sizeText  = document.querySelector('.size-text');
    const windowEl  = document.getElementById('iphoneModelsWindow');
  
    // НОВОЕ:
    const ozonBar     = document.getElementById('ozonBar');
    const ozonOpenBtn = document.getElementById('ozonOpenBtn');
  
  
    // ваши ссылки на Ozon
    const ozonLinks1 = {
      "iPhone 16 Pro Max": "https://ozon.ru/t/632M186",
      "iPhone 16 Pro":     "https://ozon.ru/t/VJ7cDuA",
      "iPhone 15 Pro Max": "https://ozon.ru/t/qy0Jmjr",
      "iPhone 15 Pro":     "https://ozon.ru/t/MuFau0t",
      "iPhone 14 Pro Max": "https://ozon.ru/t/lQznGQN",
      "iPhone 14 Pro":     "https://ozon.ru/t/hwUeEgU",
      "iPhone 13 Pro Max": "https://ozon.ru/t/8UcZ4Lg",
      "iPhone 13 Pro":     "https://ozon.ru/t/97OCEou",
    };
  
    let selectedModel = null;
  
    // открыть/закрыть окно с моделями
    function toggleModels(open){
      const isOpen = windowEl.style.display !== 'none';
      const next = (typeof open === 'boolean') ? open : !isOpen;
      windowEl.style.display = next ? 'block' : 'none';
      // поворот стрелки
      sizeBtn.querySelector('.arrow').style.transform =
        `translateY(-50%) rotate(${next ? -90 : 90}deg)`;
    }
  
    if (sizeBtn && windowEl) {
      // старт: окно скрыто
      windowEl.style.display = 'none';
      sizeBtn.addEventListener('click', () => toggleModels());
  
      // клик вне окна — закрыть
      document.addEventListener('click', (e) => {
        if (!windowEl.contains(e.target) && !sizeBtn.contains(e.target)) {
          toggleModels(false);
        }
      });
    }
  
    // выбор модели
    windowEl?.querySelectorAll('.model1').forEach(el => {
      el.addEventListener('click', () => {
        selectedModel = el.textContent.trim();
        if (sizeText) {
          sizeText.textContent = selectedModel;
          sizeText.style.color = '#000'; // как выбранное значение
        }
        toggleModels(false);
  
        // активируем Ozon-кнопку
        // показать нижнюю панель и активировать синюю кнопку
if (ozonBar && ozonOpenBtn) {
    ozonBar.hidden = false;
    ozonBar.classList.add('show');
    ozonOpenBtn.disabled = !ozonLinks1[selectedModel];
  
    // кликом открываем соответствующую ссылку
    ozonOpenBtn.onclick = () => {
      const url = ozonLinks1[selectedModel];
      if (!url) return;
      const tg = window.Telegram?.WebApp;
      if (tg?.openLink) {
        tg.openLink(url, { try_browser: true });
      } else {
        window.open(url, '_blank');
      }
    };
  }
  
  
        // Telegram MainButton
        const tg = window.Telegram?.WebApp;
        if (tg) {
            tg.ready?.();
            if (tg.MainButton.setParams) {
              tg.MainButton.setParams({ color: '#000000', text_color: '#ffffff' });
            } else {
              // на всякий случай для старых клиентов
              tg.MainButton.color = '#000000';
              tg.MainButton.textColor = '#ffffff';
            }
            tg.MainButton.setText('Добавить в корзину');
            tg.MainButton.show();
            
  
          // продукт берём из <title> (или задайте вручную)
          const productName = document.title || 'Товар';
          tg.MainButton.offClick?.(); // на всякий случай снимем старый
          tg.MainButton.onClick(() => {
            // отправим боту данные заказа
            try {
              tg.sendData(JSON.stringify({
                action: 'add_to_cart',
                product: productName,
                model: selectedModel
              }));
            } catch(e) {}
          });
        }
      });
    });
  
 
  });
  


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
  

  var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-icon'), // контейнер для анимации
    renderer: 'svg', // тип рендера (svg, canvas, html)
    loop: true, // зацикливание анимации
    autoplay: true, // автоматическое воспроизведение
    path: 'magsafe.json' // путь к вашему JSON-файлу
});


// === Telegram theme → CSS variables (для ozon-bar и др.) ===
(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
  
    function applyTheme(tp){
      const r = document.documentElement.style;
      // Базовые цвета из WebApp API
      r.setProperty('--tg-bg',               tp.bg_color              || '');
      r.setProperty('--tg-text',             tp.text_color            || '');
      r.setProperty('--tg-hint',             tp.hint_color            || '');
      r.setProperty('--tg-link',             tp.link_color            || '');
      r.setProperty('--tg-btn',              tp.button_color          || '');
      r.setProperty('--tg-btn-text',         tp.button_text_color     || '');
      r.setProperty('--tg-secondary-bg',     tp.secondary_bg_color    || '');
      // Сигнал браузеру о схеме цвета (влияет на системные элементы)
      if (tg.colorScheme === 'dark' || tg.colorScheme === 'light') {
        document.documentElement.style.colorScheme = tg.colorScheme;
      }
    }
  
    tg.ready?.();
    applyTheme(tg.themeParams || {});
    tg.onEvent?.('themeChanged', () => applyTheme(tg.themeParams || {}));
  })();
  