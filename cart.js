(function(){
    const tg = window.Telegram?.WebApp;
    tg?.ready?.();
  
    // ===== ХРАНИЛИЩЕ
    function getCart(){
      try { return JSON.parse(localStorage.getItem('cartItems') || '[]'); } catch { return []; }
    }
    function saveCart(arr){
      localStorage.setItem('cartItems', JSON.stringify(arr));
      const totalQty = arr.reduce((s,i)=>s + (i.qty||0), 0);
      localStorage.setItem('cartCount', String(totalQty));
      return totalQty;
    }
    const fmt = (n)=> new Intl.NumberFormat('ru-RU').format(Math.max(0, Math.round(n||0))) + ' ₽';
  
    // ===== DOM
    const $list  = document.getElementById('cartList');
    const $clear = document.getElementById('cartClear');
    const $items = document.getElementById('itemsCount');
    const $total = document.getElementById('grandTotal');
  
    // ===== RENDER
    function render(){
      const cart = getCart();
      $list.innerHTML = '';
  
      if (!cart.length){
        $list.innerHTML = '<div class="cart-empty">Корзина пуста</div>';
        updateTotals();
        setupMainButton(0);
        return;
      }
  
      cart.forEach((it, idx) => {
        const lineTotal = (it.price||0) * (it.qty||0);
  
        const row = document.createElement('div');
        row.className = 'cart-item';
  
        row.innerHTML = `
          <div class="ci-actions">
            <button class="ci-del" data-idx="${idx}">
              <span class="trash">🗑️</span>
              <span class="del-text">Удалить</span>
            </button>
          </div>
  
          <div class="ci-content">
            <div class="ci-thumb"><img src="${it.image||''}" alt=""></div>
            <div class="ci-body">
              <div class="ci-name">${it.name||''}</div>
              <div class="ci-model">Размер ${it.model||''}</div>
              <div class="ci-qty">
                <button class="ci-btn minus" data-idx="${idx}">−</button>
                <input class="ci-input" value="${it.qty||1}" readonly>
                <button class="ci-btn plus" data-idx="${idx}">+</button>
              </div>
            </div>
            <div class="ci-price">${fmt(lineTotal)}</div>
          </div>
        `;
        $list.appendChild(row);
  
        // кнопка удаления
        row.querySelector('.ci-del').addEventListener('click', () => removeAt(idx));
  
        // свайп для строки
        initSwipeRow(row);
      });
  
      // bind +/- 
      $list.querySelectorAll('.ci-btn.minus').forEach(b => b.addEventListener('click', () => changeQty(+b.dataset.idx, -1)));
      $list.querySelectorAll('.ci-btn.plus').forEach(b => b.addEventListener('click',  () => changeQty(+b.dataset.idx, +1)));
  
      updateTotals();
    }
  
    function changeQty(i, delta){
      const cart = getCart();
      if (!cart[i]) return;
      cart[i].qty = Math.max(0, (cart[i].qty||0) + delta);
      if (cart[i].qty === 0) cart.splice(i, 1);
      saveCart(cart);
      render();
    }
  
    function removeAt(i){
      const cart = getCart();
      if (!cart[i]) return;
      cart.splice(i,1);
      saveCart(cart);
      render();
    }
  
    function updateTotals(){
      const cart = getCart();
      const itemsCount = cart.reduce((s,i)=>s + (i.qty||0), 0);
      const totalSum   = cart.reduce((s,i)=>s + (i.price||0)*(i.qty||0), 0);
      $items.textContent = `(${itemsCount})`;
      $total.textContent = fmt(totalSum);
      setupMainButton(totalSum);
    }
  
    // ===== MAIN BUTTON «Перейти к оформлению»
    function setupMainButton(total){
      if (!tg) return;
      const main = tg.BottomButton || tg.MainButton;
      if (!main) return;
  
      const text = `Перейти к оформлению • ${fmt(total).replace(' ₽',' ₽')}`;
      if (main.setParams){
        main.setParams({ text, color:'#000000', text_color:'#ffffff', is_visible: total>0, is_active: total>0 });
      } else {
        main.setText(text);
        total>0 ? main.show() : main.hide();
        main.color = '#000000'; main.textColor = '#ffffff';
      }
      main.offClick?.();
      main.onClick?.(()=> {
        tg?.showAlert?.('Дальше — оформление заказа');
      });
    }
  
    $clear?.addEventListener('click', () => { saveCart([]); render(); });
  
    // ===== СВАЙП ВЛЕВО
    let openRow = null;
  
    function closeOpenRow(except){
      if (openRow && openRow !== except){
        const content = openRow.querySelector('.ci-content');
        if (content){
          content.style.transition = 'transform .2s ease';
          content.style.transform = 'translateX(0)';
          setTimeout(()=> content.style.transition = '', 200);
        }
        openRow = null;
      }
    }
  
    function initSwipeRow(row){
        const content = row.querySelector('.ci-content');
        const actions = row.querySelector('.ci-actions');
        if (!content || !actions) return;
      
        const ACTION_W = actions.offsetWidth || 92;
      
        // Easing-профили: открытие с легким овершутом, закрытие более «плотное»
        const EASE_OPEN  = 'cubic-bezier(.34,1.56,.64,1)'; // back-out (пружинка)
        const EASE_CLOSE = 'cubic-bezier(.22,.61,.36,1)';  // standard ease-out
      
        let startX=0, startY=0, dx=0, dy=0, dragging=false, opened=false;
      
        const onStart = (x,y) => {
          closeOpenRow(row);                 // закрыть другую открытую строку
          startX = x; startY = y; dx=0; dy=0; dragging=false;
          content.style.transition = '';     // убираем анимацию на перетаскивание
        };
      
        const onMove = (x,y, e) => {
          dx = x - startX; dy = y - startY;
          if (!dragging){
            if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)){ dragging = true; e && e.preventDefault(); }
            else return;
          }
      
          // Резинка: позволяем вытянуть ~20% сверх ACTION_W, с демпфированием
          const limit = ACTION_W * 1.2;
          let base = opened ? dx - ACTION_W : dx;     // смещение от исходного состояния
          let tx = Math.min(0, base);                  // только влево
      
          if (Math.abs(tx) > ACTION_W){                // сверх зоны — демпфируем
            const over = Math.min(limit - ACTION_W, Math.abs(tx) - ACTION_W);
            tx = -ACTION_W - over * 0.3;               // 0.3 — коэффициент резинки
          }
      
          content.style.transform = `translateX(${tx}px)`;
        };
      
        const onEnd = () => {
          if (!dragging){
            if (opened){ snap(0, EASE_CLOSE); opened=false; openRow=null; }
            return;
          }
          const current = getTranslateX(content);
          // Порог фиксации — половина ширины
          if (current < -ACTION_W * 0.5){
            snap(-ACTION_W, EASE_OPEN);  opened = true;  openRow = row;
          } else {
            snap(0, EASE_CLOSE);         opened = false; openRow = null;
          }
        };
      
        const snap = (to, ease) => {
          content.style.transition = `transform .28s ${ease}`;
          content.style.transform  = `translateX(${to}px)`;
          setTimeout(()=> content.style.transition = '', 300);
        };
      
        // helpers
        function getTranslateX(el){
          const m = new WebKitCSSMatrix(getComputedStyle(el).transform);
          return m.m41;
        }
      
        // touch
        row.addEventListener('touchstart', (e)=> onStart(e.touches[0].clientX, e.touches[0].clientY), {passive:true});
        row.addEventListener('touchmove',  (e)=> onMove(e.touches[0].clientX, e.touches[0].clientY, e), {passive:false});
        row.addEventListener('touchend',   onEnd, {passive:true});
        row.addEventListener('touchcancel',onEnd, {passive:true});
      
        // mouse (на всякий случай)
        let md=false;
        row.addEventListener('mousedown', (e)=> { md=true; onStart(e.clientX, e.clientY); });
        row.addEventListener('mousemove', (e)=> { if (md) onMove(e.clientX, e.clientY); });
        row.addEventListener('mouseup',   ()=> { if (md){ md=false; onEnd(); } });
      }
      
  
    render();
  })();
  