(function(){
    const tg = window.Telegram?.WebApp;
    tg?.ready?.();
    tg?.disableVerticalSwipes?.();
  
    // Синяя системная кнопка
    const main = tg?.BottomButton || tg?.MainButton;
    function showPickBtn(enabled){
      if (!main) return;
      if (main.setParams){
        main.setParams({
          text: 'Выбрать место доставки',
          color: '#007aff',
          text_color: '#ffffff',
          is_visible: true,
          is_active: !!enabled
        });
      } else {
        main.setText?.('Выбрать место доставки');
        main.show?.();
        main.color = '#007aff';
        main.textColor = '#ffffff';
      }
    }
    showPickBtn(false);
  
    // BackButton → назад к шагу доставки
    const BB = tg?.BackButton;
    const back = ()=> location.replace('checkout-delivery.html');
    BB?.offClick?.(back);
    BB?.onClick?.(back);
    BB?.show?.();
  
    // Инициализируем виджет СДЭК
    // Документация и пример подключения: script widjet.js и конструктор ISDEKWidjet.  :contentReference[oaicite:1]{index=1}
    let chosen = null;
    const widjet = new ISDEKWidjet({
      link: 'cdekMap',          // id контейнера
      hidedelt: true,           // скрыть расчёт доставки в виджете
      country: 'Россия',
      // можно подставить город получателя, если ты его знаешь:
      // defaultCity: 'Москва',
      // город отправки (не обязателен для выбора ПВЗ)
      // cityFrom: 'Москва',
      onReady: function(){
        // активируем кнопку только после выбора ПВЗ
        showPickBtn(false);
      },
      onChoose: function(info){
        // info — объект с данными ПВЗ (код, адрес, координаты и пр.)
        chosen = {
          id: info.id,
          code: info.id,
          city: info.cityName,
          address: (info.PVZ && info.PVZ.Address) || '',
          address_short: (info.cityName ? info.cityName + ', ' : '') +
                         ((info.PVZ && info.PVZ.Address) || ''),
          // можно сохранить координаты
          lat: info.PVZ?.coordY || null,
          lon: info.PVZ?.coordX || null
        };
        showPickBtn(true);
        tg?.HapticFeedback?.selectionChanged?.();
      }
    });
  
    // Нажатие «Выбрать место доставки»
    main?.offClick?.();
    main?.onClick?.(() => {
      if (!chosen){
        tg?.HapticFeedback?.notificationOccurred?.('error');
        return;
      }
      // сохраняем выбор и возвращаемся на шаг «Доставка»
      localStorage.setItem('checkoutPvz', JSON.stringify(chosen));
      tg?.HapticFeedback?.notificationOccurred?.('success');
      location.replace('checkout-delivery.html');
    });
  
    // Чистка
    window.addEventListener('pagehide', () => {
      main?.offClick?.();
      main?.hide?.();
      BB?.offClick?.(back);
      BB?.hide?.();
      tg?.enableVerticalSwipes?.();
    });
  })();
  