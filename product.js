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
  
    const ozonBar     = document.getElementById('ozonBar');
    const ozonOpenBtn = document.getElementById('ozonOpenBtn');
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

    // ====== ДВЕ КНОПКИ ВНИЗУ + КОЛИЧЕСТВО ======
const tg = window.Telegram?.WebApp;
let qty = 1;
let mainHandler = null;
let secondaryHandler = null;

function setMainHandler(fn){
  if (!tg) return;
  if (mainHandler) tg.offEvent?.('mainButtonClicked', mainHandler);
  mainHandler = fn;
  tg.onEvent?.('mainButtonClicked', mainHandler);
}
function setSecondaryHandler(fn){
  if (!tg) return;
  if (secondaryHandler) tg.offEvent?.('secondaryButtonClicked', secondaryHandler);
  secondaryHandler = fn;
  tg.onEvent?.('secondaryButtonClicked', secondaryHandler);
}

// Мини-панель количества (− / +) над кнопками Telegram
let qtyBar = document.getElementById('qtyBar');
if (!qtyBar){
  qtyBar = document.createElement('div');
  qtyBar.id = 'qtyBar';
  qtyBar.className = 'qty-bar';
  qtyBar.innerHTML = `
    <button class="qty-btn" data-delta="-1">−</button>
    <span class="qty-value" id="qtyValue">1</span>
    <button class="qty-btn" data-delta="1">+</button>
  `;
  document.body.appendChild(qtyBar);
}
const qtyValueEl = qtyBar.querySelector('#qtyValue');
function updateQty(delta){
  qty = Math.max(1, qty + (delta||0));
  if (qtyValueEl) qtyValueEl.textContent = String(qty);
  tg?.SecondaryButton?.setParams?.({ text: `Количество: ${qty}` });
}
qtyBar.addEventListener('click', (e)=>{
  const btn = e.target.closest('.qty-btn');
  if (!btn) return;
  updateQty(Number(btn.dataset.delta||0));
  tg?.HapticFeedback?.impactOccurred?.('light');
});
function toggleQtyBar(show){
  const next = (typeof show === 'boolean') ? show : !qtyBar.classList.contains('show');
  qtyBar.classList.toggle('show', next);
}

// Вход в «режим корзины»
function enterCartMode(){
  // 1) спрятать панель Ozon
  if (ozonBar){ ozonBar.classList.remove('show'); ozonBar.hidden = true; }

  // 2) левая кнопка — SecondaryButton
  tg?.SecondaryButton?.setParams?.({
    is_visible: true,
    position: 'left',
    text: `Количество: ${qty}`
  });

  // 3) правая кнопка — MainButton
  tg?.MainButton?.setParams?.({
    text: 'Перейти в корзину',
    color: '#000000',
    text_color: '#ffffff',
    is_visible: true,
    is_active: true
  });

  // 4) обработчики
  setSecondaryHandler(() => toggleQtyBar());           // открыть мини-панель
  const CART_URL = 'cart.html';                        // при необходимости поменяй путь
  setMainHandler(() => { location.href = CART_URL; }); // перейти в корзину
}

// очистка при уходе со страницы
window.addEventListener('pagehide', () => {
  if (mainHandler)      tg?.offEvent?.('mainButtonClicked', mainHandler);
  if (secondaryHandler) tg?.offEvent?.('secondaryButtonClicked', secondaryHandler);
  tg?.SecondaryButton?.setParams?.({ is_visible: false });
  toggleQtyBar(false);
});

  
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
  
        // показываем нижнюю панель и настраиваем синюю кнопку Ozon
        const entry = ozonMap[selectedModel] || {};
        if (ozonBar && ozonOpenBtn) {
          ozonBar.hidden = false;
          ozonBar.classList.add('show');
          ozonOpenBtn.disabled = !entry.url;
          ozonOpenBtn.onclick = () => {
            if (!entry.url) return;
            const tg = window.Telegram?.WebApp;
            if (tg?.openLink) tg.openLink(entry.url, { try_browser: true });
            else window.open(entry.url, '_blank');
          };
        }
  
        // 🔢 выставляем артикул (берём из ozonMap, НЕ из ссылки)
        // показать артикул (только код будет кликабельным и синим)
renderSku(entry.sku || '');

  
        // Telegram MainButton (чёрный) — «Добавить в корзину»
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready?.();
  tg.MainButton.setParams?.({
    color: '#000000',
    text_color: '#ffffff',
    text: 'Добавить в корзину',
    is_visible: true,
    is_active: true
  });

  // Вместо sendData — включаем «режим корзины» с двумя кнопками
  setMainHandler(() => {
    tg.HapticFeedback?.impactOccurred?.('medium');
    enterCartMode();
  });

  // Пока SecondaryButton скрыт — появится после нажатия «Добавить в корзину»
  tg.SecondaryButton?.setParams?.({ is_visible: false });

  // сброс мини-панели количества
  qty = 1; updateQty(0); toggleQtyBar(false);
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
  

