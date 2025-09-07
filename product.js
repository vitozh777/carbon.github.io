// product.js — нативный свайп на всю высоту + полоски-индикаторы + выбор размера
document.addEventListener('DOMContentLoaded', () => {
    const track    = document.querySelector('.prod-track');
    const slider   = track; // ВЬЮПОРТ = САМА ДОРОЖКА (без .prod-slider)
    const barsWrap = document.querySelector('.hero-indicators .bars');
  
    if (!track || !barsWrap) return;
  
    const slides = Array.from(track.querySelectorAll('img'));
    let index = 0;
  
    // Полоски под реальное число фото
    barsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const b = document.createElement('span');
      b.className = 'bar' + (i === 0 ? ' is-active' : '');
      barsWrap.appendChild(b);
    });
    const bars = Array.from(barsWrap.querySelectorAll('.bar'));
  
    function setActiveByScroll() {
      const w = (slider?.clientWidth || window.innerWidth || 1);
      const i = Math.round(track.scrollLeft / w);
      index = Math.max(0, Math.min(slides.length - 1, i));
      bars.forEach((bar, n) => bar.classList.toggle('is-active', n === index));
    }
  
    // Нативный scroll-snap, без кликов
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
  
  

// === Размеры, Ozon, Telegram MainButton (c ручными артикулами) ===
document.addEventListener('DOMContentLoaded', () => {
    const sizeBtn   = document.getElementById('sizeButton');
    const sizeText  = document.querySelector('.size-text');
    const windowEl  = document.getElementById('iphoneModelsWindow');

    const ozonSkuEl   = document.getElementById('ozonSkuValue');

    // рисуем плейсхолдер или код (кликабелен только код)
function renderSku(sku){
    if (!ozonSkuEl) return;
  
    if (!sku){
      ozonSkuEl.innerHTML =
        '<span class="sku-placeholder">(Выбери размер) <span class="hint-hand" aria-hidden="true">👆</span></span>';
      ozonSkuEl.dataset.sku = '';
      if (!sku){
        ozonSkuEl.innerHTML =
          '<span class="sku-placeholder">(Выбери размер) <span id="skuHandLottie" class="sku-hand" aria-hidden="true"></span></span>';
        ozonSkuEl.dataset.sku = '';
    
        // запустить Lottie-руку
        const el = document.getElementById('skuHandLottie');
        if (window.lottie && el) {
          lottie.loadAnimation({
            container: el,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'rukaverh.json' // путь к вашему JSON
          });
        }
        return;
      }
      return;
    }
  
    ozonSkuEl.innerHTML = `<span class="sku-code" tabindex="0">${sku}</span>`;
  ozonSkuEl.dataset.sku = sku;
  
    const codeEl = ozonSkuEl.querySelector('.sku-code');
    const copy = (value) => {
      const tg = window.Telegram?.WebApp;
      const done = () => tg?.showAlert?.('Артикул скопирован');
      (navigator.clipboard?.writeText(value) || Promise.reject())
        .then(done)
        .catch(() => {
          try{
            const tmp = document.createElement('textarea');
            tmp.value = value; document.body.appendChild(tmp);
            tmp.select(); document.execCommand('copy'); document.body.removeChild(tmp);
            done();
          }catch(_){}
        });
    };
    codeEl.addEventListener('click', () => copy(sku));
    codeEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); copy(sku); }
    });
  }
  
  // стартовое состояние: плейсхолдер
  renderSku('');
  
    if (ozonSkuEl){
        ozonSkuEl.setAttribute('tabindex','0');  // чтобы можно было активировать с клавы
      }
      
  
    // 💡 ЕДИНЫЙ СПРАВОЧНИК: для каждой модели задайте url и sku вручную
    const ozonMap = {
      "iPhone 16 Pro Max": { url: "https://ozon.ru/t/632M186", sku: "2403117048" },
      "iPhone 16 Pro":     { url: "https://ozon.ru/t/VJ7cDuA", sku: "2406081070" },
      "iPhone 15 Pro Max": { url: "https://ozon.ru/t/qy0Jmjr", sku: "2403281658" },
      "iPhone 15 Pro":     { url: "https://ozon.ru/t/MuFau0t", sku: "2406081042" },
      "iPhone 14 Pro Max": { url: "https://ozon.ru/t/lQznGQN", sku: "2406082851" },
      "iPhone 14 Pro":     { url: "https://ozon.ru/t/hwUeEgU", sku: "2406082474" },
      "iPhone 13 Pro Max": { url: "https://ozon.ru/t/8UcZ4Lg", sku: "2406125091" },
      "iPhone 13 Pro":     { url: "https://ozon.ru/t/97OCEou", sku: "2406121255" },
    };
    // меняйте sku на любые свои — они НЕ берутся из ссылки
  
    let selectedModel = null;
  
    function toggleModels(open){
      const isOpen = windowEl?.style.display !== 'none';
      const next = (typeof open === 'boolean') ? open : !isOpen;
      if (!windowEl) return;
      windowEl.style.display = next ? 'block' : 'none';
      const arrow = sizeBtn?.querySelector('.arrow');
      if (arrow) arrow.style.transform = `translateY(-50%) rotate(${next ? -90 : 90}deg)`;
    }
  
    if (sizeBtn && windowEl) {
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
  
        // подпись на кнопке выбора
        if (sizeText) { sizeText.textContent = selectedModel; sizeText.style.color = '#000'; }
        toggleModels(false);
  
        // Показываем 2 системные кнопки Telegram: правая Main(чёрная), левая Secondary(синяя)
function showTgBottomButtons(entry, productName, selectedModel){
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
  
    tg.ready?.();
  
    // На части клиентов MainButton уже алиас BottomButton
    const main = tg.BottomButton || tg.MainButton;  // правая: "Добавить в корзину"
    const secondary = tg.SecondaryButton;           // левая: "Открыть Ozon"
  
    // --- MAIN (чёрная) ---
    if (main){
      if (main.setParams){
        main.setParams({
          text: 'Добавить в корзину',
          color: '#000000',
          text_color: '#ffffff',
          is_visible: true,
          is_active: true
        });
      } else {
        main.setText?.('Добавить в корзину');
        main.show?.();
        main.color = '#000000';
        main.textColor = '#ffffff';
      }
      main.offClick?.();
      main.onClick?.(() => {
        try{
          tg.sendData(JSON.stringify({
            action: 'add_to_cart',
            product: productName,
            model: selectedModel,
            sku: entry.sku || null
          }));
        }catch(e){}
      });
    }
  
    // --- SECONDARY (синяя, слева) ---
    if (secondary){
      secondary.setParams?.({
        text: 'Открыть Ozon',
        position: 'left',
        is_visible: true,
        is_active: !!entry.url
      });
      if (!secondary.setParams){
        secondary.setText?.('Открыть Ozon');
        secondary.show?.();
      }
      secondary.offClick?.();
      secondary.onClick?.(() => {
        if (!entry.url) return;
        if (tg.openLink) tg.openLink(entry.url, { try_browser: true });
        else window.open(entry.url, '_blank');
      });
    }
  
    // (необязательно) покрасить фон нижней плашки под тему
    tg.setBottomBarColor?.(tg.themeParams?.bottom_bar_bg_color || tg.themeParams?.secondary_bg_color || '#ffffff');
  }
  
  
        // 🔢 выставляем артикул (берём из ozonMap, НЕ из ссылки)
        // показать артикул (только код будет кликабельным и синим)
renderSku(entry.sku || '');

const productName = document.title || 'Товар';
showTgBottomButtons(entry, productName, selectedModel);


  
        
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

  
// === Telegram BackButton на странице товара ===
(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;          // если открыто не в Telegram — выходим
  
    tg.ready?.();
    const BackButton = tg.BackButton;
  
    function goToCatalog() {
      try { BackButton.offClick(goToCatalog); } catch {}
      try { BackButton.hide(); } catch {}
      // Возврат в каталог без сохранения этой страницы в истории
      location.replace('apple.html');
    }
  
    BackButton.onClick(goToCatalog);
    BackButton.show();
  
    // чистый уход со страницы (в т.ч. bfcache на iOS)
    window.addEventListener('pagehide', () => {
      try { BackButton.offClick(goToCatalog); } catch {}
      try { BackButton.hide(); } catch {}
    });
  })();
  

  // Открыть чат поддержки в Telegram
(() => {
    const btn = document.getElementById('supportBtn');
    if (!btn) return;
  
    // ЗАМЕНИ на свой username/ссылку
    const SUPPORT_LINK = 'https://t.me/carbonexpert';
  
    btn.addEventListener('click', () => {
      const tg = window.Telegram?.WebApp;
      if (tg?.openTelegramLink) {
        tg.openTelegramLink(SUPPORT_LINK);
      } else {
        window.open(SUPPORT_LINK, '_blank');
      }
    });
  })();
  

// При уходе со страницы товара — скрываем и отвязываем кнопки
(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
    window.addEventListener('pagehide', () => {
      const main = tg.BottomButton || tg.MainButton;
      main?.offClick?.(); main?.hide?.();
      tg.SecondaryButton?.offClick?.(); tg.SecondaryButton?.hide?.();
    });
  })();
  