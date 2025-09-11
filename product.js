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
  
  // текущие обработчики, чтобы можно было корректно снять
let __tgMainHandler = null;
let __tgSecondaryHandler = null;


// === Размеры, Ozon, Telegram MainButton (c ручными артикулами) ===
document.addEventListener('DOMContentLoaded', () => {
    const sizeBtn   = document.getElementById('sizeButton');
    const sizeText  = document.querySelector('.size-text');
    const windowEl  = document.getElementById('iphoneModelsWindow');

    const ozonSkuEl   = document.getElementById('ozonSkuValue');

    // рисуем плейсхолдер или код (кликабелен только код)
    function renderSku(sku){
        if (!ozonSkuEl) return;
      
        // нет SKU -> плейсхолдер + Lottie-рука
        if (!sku){
          ozonSkuEl.innerHTML =
            '<span class="sku-placeholder">(Выбери размер) <span id="skuHandLottie" class="sku-hand" aria-hidden="true"></span></span>';
          ozonSkuEl.dataset.sku = '';
      
          const el = document.getElementById('skuHandLottie');
          try{
            if (window.lottie && el){
              lottie.loadAnimation({
                container: el,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: 'rukaverh.json' // твой JSON с рукой
              });
            }
          }catch(_){}
          return;
        }
      
        // есть SKU -> показываем только код (кликабельно и синим)
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
    // --- цена по коду продукта ---
const PRODUCT_CODE = document.body?.dataset.product || 'model1';
const PRODUCT_PRICES = {
  model1: 3699,
  // model2: 4599, // добавишь, когда появится вторая карточка с такой же сеткой размеров
  // model3: 3999,
};

  
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

    // === Мини-корзина (FAB) внизу справа ===
const cartBtn     = document.getElementById('cart-button');
const cartIconBox = document.getElementById('cart-icon');
const cartBadge   = document.getElementById('cart-counter');
const CART_LOTTIE_PATH = 'cart.json'; // <-- укажи путь к своей иконке (JSON)

let cartCount = Number(localStorage.getItem('cartCount') || 0);

function initCartFab(){
  // показать FAB, если уже есть товары
  if (cartCount > 0) {
    cartBtn?.classList.add('show');
    updateCartBadge(0);
  }
  // Lottie корзины
  try{
    if (window.lottie && cartIconBox){
      lottie.loadAnimation({
        container: cartIconBox,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: CART_LOTTIE_PATH
      });
    } else if (cartIconBox && !cartIconBox.firstChild){
      cartIconBox.textContent = '🛒'; // фолбэк-эмодзи
    }
  }catch(_){}
}

function updateCartBadge(deltaOrOpts=0){
    if (typeof deltaOrOpts === 'object' && deltaOrOpts && 'set' in deltaOrOpts){
      cartCount = Math.max(0, Number(deltaOrOpts.set) || 0);
    } else {
      cartCount = Math.max(0, cartCount + (Number(deltaOrOpts)||0));
    }
    localStorage.setItem('cartCount', String(cartCount));
    if (!cartBadge) return;
    if (cartCount <= 0){
      cartBadge.classList.add('hidden'); cartBadge.textContent = '';
    } else {
      cartBadge.classList.remove('hidden'); cartBadge.textContent = String(cartCount);
      cartBadge.classList.remove('bump'); void cartBadge.offsetWidth; cartBadge.classList.add('bump');
    }
  }
  

function showCartFab(){
  if (!cartBtn) return;
  cartBtn.classList.add('show');
}

// инициализация при загрузке
initCartFab();

  
    // --- ДВЕ КНОПКИ ВНИЗУ TELEGRAM: правая Main(чёрная), левая Secondary(синяя)
// --- ДВЕ КНОПКИ ВНИЗУ TELEGRAM: правая Main(чёрная), левая Secondary(синяя)
function showTgBottomButtons(entry, productName, selectedModel){
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
  
    tg.ready?.();
  
    // На части клиентов MainButton уже алиас BottomButton
    const mainRef = tg.BottomButton || tg.MainButton;  // правая: "Добавить в корзину"
    const secRef  = tg.SecondaryButton;                // левая: "Открыть Ozon"
  
    // ------ MAIN (чёрная) ------
    if (mainRef){
      // убрать предыдущий обработчик, если был
      if (__tgMainHandler){
        tg.MainButton?.offClick?.(__tgMainHandler);
        tg.BottomButton?.offClick?.(__tgMainHandler);
      }
      // параметры/стиль
      if (mainRef.setParams){
        mainRef.setParams({
          text: 'Добавить в корзину',
          color: '#000000',
          text_color: '#ffffff',
          is_visible: true,
          is_active: true
        });
      } else {
        mainRef.setText?.('Добавить в корзину');
        mainRef.show?.();
        mainRef.color = '#000000';
        mainRef.textColor = '#ffffff';
      }
      // новый обработчик
      __tgMainHandler = () => {
        try{
          tg.sendData(JSON.stringify({
            action: 'add_to_cart',
            product: productName,
            model: selectedModel,
            sku: entry.sku || null
          }));
        }catch(e){}
// добавляем РОВНО +1 выбранной модели в локальную корзину
const imgSrc = document.querySelector('.prod-track img')?.getAttribute('src') || '';
const unitPrice = PRODUCT_PRICES[PRODUCT_CODE] ?? 0;

const totalQty = addToLocalCart({
  name: productName,
  model: selectedModel,
  price: unitPrice,   // <-- цена берётся из PRODUCT_PRICES по коду товара (model1)
  image: imgSrc
});

showCartFab();
updateCartBadge({ set: totalQty });


      };
      mainRef.onClick?.(__tgMainHandler);
    }
  
    // ------ SECONDARY (синяя, слева) ------
    if (secRef){
      // снять предыдущий
      if (__tgSecondaryHandler){
        secRef.offClick?.(__tgSecondaryHandler);
      }
      // параметры/стиль
      if (secRef.setParams){
        secRef.setParams({
          text: 'Открыть Ozon',
          position: 'left',
          is_visible: true,
          is_active: !!entry.url
        });
      } else {
        secRef.setText?.('Открыть Ozon');
        secRef.show?.();
      }
      // новый обработчик
      __tgSecondaryHandler = () => {
        if (!entry.url) return;
        if (tg.openLink) tg.openLink(entry.url, { try_browser: true });
        else window.open(entry.url, '_blank');
      };
      secRef.onClick?.(__tgSecondaryHandler);
    }
  
    // (опционально) фон нижней панели под тему Telegram
    tg.setBottomBarColor?.(
      tg.themeParams?.bottom_bar_bg_color ||
      tg.themeParams?.secondary_bg_color ||
      '#ffffff'
    );
  }
  

  // ===== локальная корзина =====
function _cartGet(){
    try { return JSON.parse(localStorage.getItem('cartItems') || '[]'); } catch { return []; }
  }
  function _cartSave(arr){
    localStorage.setItem('cartItems', JSON.stringify(arr));
    const totalQty = arr.reduce((s,i)=>s + (i.qty||0), 0);
    localStorage.setItem('cartCount', String(totalQty));
    return totalQty;
  }
  function _cartItemId(name, model){ return (name+'|'+model).toLowerCase(); }
  function addToLocalCart({name, model, price=0, image=''}) {
    const id = _cartItemId(name, model);
    const cart = _cartGet();
    const found = cart.find(i => i.id === id);
    if (found) found.qty += 1;
    else cart.push({id, name, model, price, qty:1, image});
    return _cartSave(cart); // вернёт общее количество
  }
  
  
  // --- выбор модели
  windowEl?.querySelectorAll('.model1').forEach(el => {
    el.addEventListener('click', () => {
      selectedModel = el.textContent.trim();
  
      // подпись на кнопке выбора
      if (sizeText){
        sizeText.textContent = selectedModel;
        sizeText.style.color = '#000';
      }
      toggleModels(false);
  
      // Данные по выбранной модели
      const entry = ozonMap[selectedModel] || {};
  
      // Показать/обновить артикул (только код кликабелен и синий)
      renderSku(entry.sku || '');
  
      // Показать две системные кнопки Telegram снизу
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
  

  try{
    const cont = document.getElementById('lottie-icon');
    if (window.lottie && cont){
      lottie.loadAnimation({ container: cont, renderer: 'svg', loop: true, autoplay: true, path: 'magsafe.json' });
    }
  }catch(_){}
  


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

  
// === Telegram BackButton (товар) — устойчиво к возврату из bfcache ===
(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
  
    tg.ready?.();
    const BB = tg.BackButton;
  
    function goCatalog() {
      // Возврат в каталог Apple
      location.replace('apple.html');
    }
  
    function attachBack() {
      // на всякий — спрячем Settings и развернём WebApp
      tg.SettingsButton?.hide?.();
      tg.expand?.();
  
      BB.offClick?.(goCatalog);
      BB.onClick(goCatalog);
      BB.show();
    }
  
    // первичный показ
    attachBack();
  
    // критично: повторная инициализация при возврате со страницы корзины (bfcache)
    window.addEventListener('pageshow', attachBack);
  
    // уборка при уходе со страницы товара
    window.addEventListener('pagehide', () => {
      BB.offClick?.(goCatalog);
      BB.hide?.();
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
  



// открыть страницу корзины по нажатию на круг
document.getElementById('cart-button')?.addEventListener('click', () => {
    location.href = 'cart.html';
  });
  
  // Чистый вход: спрятать кнопки на всякий случай (bfcache/возврат назад)
(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
    (tg.BottomButton || tg.MainButton)?.hide?.();
    tg.SecondaryButton?.hide?.();
  })();
  
  // Уход со страницы: снять обработчики, скрыть кнопки
  (() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
    window.addEventListener('pagehide', () => {
      const mainRef = tg.BottomButton || tg.MainButton;
      if (__tgMainHandler){
        tg.MainButton?.offClick?.(__tgMainHandler);
        tg.BottomButton?.offClick?.(__tgMainHandler);
        __tgMainHandler = null;
      }
      if (__tgSecondaryHandler){
        tg.SecondaryButton?.offClick?.(__tgSecondaryHandler);
        __tgSecondaryHandler = null;
      }
      mainRef?.hide?.();
      tg.SecondaryButton?.hide?.();
    });
  })();
  