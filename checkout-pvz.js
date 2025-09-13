(function () {
    const tg = window.Telegram?.WebApp;
    tg?.ready?.();
    tg?.disableVerticalSwipes?.();
  
    // --- системная синяя кнопка ---
    const main = tg?.BottomButton || tg?.MainButton;
    function setPickBtn(enabled) {
      if (!main) return;
      if (main.setParams) {
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
    setPickBtn(false);
  
    // --- BackButton назад к шагу доставки ---
    const BB = tg?.BackButton;
    const goBack = () => location.replace('checkout-delivery.html');
    BB?.offClick?.(goBack);
    BB?.onClick?.(goBack);
    BB?.show?.();
  
    // --- выбранный ПВЗ сюда положим ---
    let chosen = null;
  
    // Инициализация виджета (вызовется, когда скрипт готов)
    function bootCDEK() {
      if (typeof window.ISDEKWidjet !== 'function') return false;
  
      // Можно подставить город по контакту, если позже потребуется
      let defaultCity;
      try {
        const saved = JSON.parse(localStorage.getItem('checkoutContact') || '{}');
        defaultCity = saved.city || undefined;
      } catch {}
  
      window.__cdekWidget = new window.ISDEKWidjet({
        link: 'cdekMap',                     // id контейнера <div id="cdekMap">
        country: 'Россия',
        hidedelt: true,                      // без расчёта тарифа внутри виджета
        // Рекомендуемые пути виджета (снимают проблемы со смешанными протоколами)
        path: 'https://widget.cdek.ru/widget/scripts/',
        servicepath: 'https://widget.cdek.ru/widget/scripts/service.php',
        defaultCity,                         // необязательно
  
        onReady: function () {
          setPickBtn(false);
        },
        onChoose: function (info) {
          // info содержит данные выбранного ПВЗ
          chosen = {
            id: info.id,
            code: info.id,
            city: info.cityName,
            address: (info.PVZ && info.PVZ.Address) || '',
            address_short:
              (info.cityName ? info.cityName + ', ' : '') +
              ((info.PVZ && info.PVZ.Address) || ''),
            lat: info.PVZ?.coordY || null,
            lon: info.PVZ?.coordX || null
          };
          setPickBtn(true);
          tg?.HapticFeedback?.selectionChanged?.();
        }
      });
  
      return true;
    }
  
    // Ждём, пока скрипт widjet.js загрузится
    function initWhenReady() {
      if (bootCDEK()) return;
  
      const s = document.getElementById('ISDEKscript');
      if (s && !s.dataset.wired) {
        s.dataset.wired = '1';
        s.addEventListener('load', () => bootCDEK(), { once: true });
      }
  
      // Резервный поллинг (если onload пропущен браузером)
      let tries = 0;
      const id = setInterval(() => {
        if (bootCDEK() || ++tries > 60) clearInterval(id); // ~6 сек ожидания
      }, 100);
    }
  
    initWhenReady();
  
    // Клик по синей кнопке — принять ПВЗ и вернуться
    main?.offClick?.();
    main?.onClick?.(() => {
      if (!chosen) {
        tg?.HapticFeedback?.notificationOccurred?.('error');
        return;
      }
      localStorage.setItem('checkoutPvz', JSON.stringify(chosen));
      tg?.HapticFeedback?.notificationOccurred?.('success');
      location.replace('checkout-delivery.html');
    });
  
    // Чистка при уходе
    window.addEventListener('pagehide', () => {
      main?.offClick?.();
      main?.hide?.();
      BB?.offClick?.(goBack);
      BB?.hide?.();
      tg?.enableVerticalSwipes?.();
    });
  })();
  