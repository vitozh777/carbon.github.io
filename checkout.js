(function(){
    const tg = window.Telegram?.WebApp;
    tg?.ready?.();
    tg?.disableVerticalSwipes?.(); // запрет «свайп-вниз = закрыть»
  
    // элементы
    const firstName  = document.getElementById('firstName');
    const lastName   = document.getElementById('lastName');
    const middleName = document.getElementById('middleName');
    const phone      = document.getElementById('phone');
  
    // восстановление ввода
    try{
      const saved = JSON.parse(localStorage.getItem('checkoutContact') || '{}');
      if (saved.firstName)  firstName.value  = saved.firstName;
      if (saved.lastName)   lastName.value   = saved.lastName;
      if (saved.middleName) middleName.value = saved.middleName;
      if (saved.phone)      phone.value      = saved.phone;
    }catch(_){}
  
    // маска телефона: "000 000 00 00"
    phone.addEventListener('input', () => {
      const digits = phone.value.replace(/\D/g, '').slice(0, 10); // только 10 цифр после +7
      let f = '';
      if (digits.length > 0) f = digits.slice(0,3);
      if (digits.length > 3) f += ' ' + digits.slice(3,6);
      if (digits.length > 6) f += ' ' + digits.slice(6,8);
      if (digits.length > 8) f += ' ' + digits.slice(8,10);
      phone.value = f;
      hideError('phone');
    });
  
    // скрывать ошибку при вводе
    [firstName,lastName,middleName].forEach(el=>{
      el.addEventListener('input', ()=> hideError(el.id));
    });
  
    function showError(field, text){
      const el = document.getElementById('err-' + field);
      if (!el) return;
      if (text) el.textContent = text;
      el.style.display = 'block';
    }
    function hideError(field){
      const el = document.getElementById('err-' + field);
      if (!el) return;
      el.style.display = 'none';
    }
  
    function validate(){
      let ok = true;
  
      const fn = firstName.value.trim();
      const ln = lastName.value.trim();
      const mn = middleName.value.trim();
      const ph = phone.value.replace(/\D/g, '');
  
      if (!fn){ showError('firstName',  'Обязательное поле'); ok = false; } else hideError('firstName');
      if (!ln){ showError('lastName',   'Обязательное поле'); ok = false; } else hideError('lastName');
      if (!mn){ showError('middleName', 'Обязательное поле'); ok = false; } else hideError('middleName');
  
      if (ph.length !== 10){ showError('phone', 'Неверный номер телефона'); ok = false; } else hideError('phone');
  
      if (!ok){
        (fn ? (ln ? (mn ? phone : middleName) : lastName) : firstName).focus();
        tg?.HapticFeedback?.notificationOccurred?.('error');
      }
      return ok;
    }
  
    // скрывать клавиатуру по тапу вне полей
    const isEditable = el => el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA');
    function blurIfOutside(e){
      const a = document.activeElement;
      if (!isEditable(a)) return;
      const t = e.target;
      if (!t.closest('.field') && !t.closest('.phone-row')){
        a.blur();
      }
    }
    document.addEventListener('touchstart', blurIfOutside, {passive:true});
    document.addEventListener('mousedown',  blurIfOutside);
  
    // MainButton — синий
    const main = tg?.BottomButton || tg?.MainButton;
    if (main){
      if (main.setParams){
        main.setParams({
          text: 'Выбрать способ доставки',
          color: '#007aff',
          text_color: '#ffffff',
          is_visible: true,
          is_active: true
        });
      } else {
        main.setText?.('Выбрать способ доставки');
        main.show?.();
        main.color = '#007aff';
        main.textColor = '#ffffff';
      }
  
      main.offClick?.();
      main.onClick?.(() => {
        if (!validate()) return;
  
        const payload = {
          firstName:  firstName.value.trim(),
          lastName:   lastName.value.trim(),
          middleName: middleName.value.trim(),
          phone:      phone.value.trim()
        };
        localStorage.setItem('checkoutContact', JSON.stringify(payload));
        tg?.HapticFeedback?.notificationOccurred?.('success');
  
        // перейти к выбору доставки (следующий шаг)
        location.href = 'checkout-delivery.html';
      });
    }
  
    // BackButton → назад в корзину
    const BB = tg?.BackButton;
    const goBack = () => {
      if (history.length > 1) history.back();
      else location.replace('cart.html');
    };
    BB?.offClick?.(goBack);
    BB?.onClick?.(goBack);
    BB?.show?.();
  
    // чистка при уходе
    window.addEventListener('pagehide', () => {
      main?.offClick?.();
      main?.hide?.();
      BB?.offClick?.(goBack);
      BB?.hide?.();
      tg?.enableVerticalSwipes?.(); // вернуть свайпы при уходе
    });
  })();
  