(function(){
    const tg = window.Telegram?.WebApp;
    tg?.ready?.();
  
    // Синяя основная кнопка
    const main = tg?.BottomButton || tg?.MainButton;
    if (main){
      if (main.setParams){
        main.setParams({
          text: 'Выбрать способ доставки',
          color: '#007aff',        // синий
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
        // здесь позже откроем шаг "Способ доставки"
        tg?.showAlert?.('Далее — выбор способа доставки');
        // пример на будущее: location.href = 'checkout-delivery.html';
      });
    }
  
    // Спрятать Secondary, если вдруг видна
    tg?.SecondaryButton?.hide?.();
  
    // BackButton → назад в корзину
    const BB = tg?.BackButton;
    const goBack = () => {
      if (history.length > 1) history.back();
      else location.replace('cart.html');
    };
    BB?.offClick?.(goBack);
    BB?.onClick?.(goBack);
    BB?.show?.();
  
    // Чистка при уходе со страницы
    window.addEventListener('pagehide', () => {
      main?.offClick?.();
      main?.hide?.();
      BB?.offClick?.(goBack);
      BB?.hide?.();
    });
  })();
  