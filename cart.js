(function(){
    const tg = window.Telegram?.WebApp;
    tg?.ready?.();
  
    // ===== хранилище (тот же формат, что в product.js) =====
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
  
    const $list  = document.getElementById('cartList');
    const $clear = document.getElementById('cartClear');
    const $items = document.getElementById('itemsCount');
    const $total = document.getElementById('grandTotal');
  
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
        `;
        $list.appendChild(row);
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
  
    function updateTotals(){
      const cart = getCart();
      const itemsCount = cart.reduce((s,i)=>s + (i.qty||0), 0);
      const totalSum   = cart.reduce((s,i)=>s + (i.price||0)*(i.qty||0), 0);
      $items.textContent = `(${itemsCount})`;
      $total.textContent = fmt(totalSum);
      setupMainButton(totalSum);
    }
  
    function setupMainButton(total){
      if (!tg) return;
      const main = tg.BottomButton || tg.MainButton;
      if (!main) return;
  
      const text = `Перейти к оформлению | ${fmt(total).replace(' ₽',' ₽')}`;
      if (main.setParams){
        main.setParams({ text, color:'#000000', text_color:'#ffffff', is_visible: total>0, is_active: total>0 });
      } else {
        main.setText(text);
        total>0 ? main.show() : main.hide();
        main.color = '#000000'; main.textColor = '#ffffff';
      }
      main.offClick?.();
      main.onClick?.(()=> {
        // здесь можно отправить данные боту или перейти на экран оформления
        // tg.sendData(JSON.stringify({ action:'checkout' }));
        tg?.showAlert?.('Дальше — оформление заказа');
      });
    }
  
    $clear?.addEventListener('click', () => {
      saveCart([]);
      render();
    });
  
    render();
  })();
  