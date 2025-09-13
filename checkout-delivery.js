(function(){
    const tg = window.Telegram?.WebApp;
    tg?.ready?.();
    tg?.disableVerticalSwipes?.(); // не даём закрыть свайпом вниз
  
    /* ---------- ETA (дата прибытия) ---------- */
    function formatRuDate(d){
      const m = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
      return `${d.getDate()} ${m[d.getMonth()]}`;
    }
    const eta = new Date();
    eta.setDate(eta.getDate() + 3); // +3 дня по умолчанию
    const etaText = document.getElementById('etaText');
    if (etaText) etaText.textContent = `Прибытие ${formatRuDate(eta)}`;
  
    /* ---------- Сохранение выбора способа ---------- */
    const DELIVERY = {
      code: 'cdek_warehouse_warehouse',
      name: 'Посылка склад-склад',
      carrier: 'СДЭК',
      eta: eta.toISOString(),
      price: 300
    };
    localStorage.setItem('checkoutDelivery', JSON.stringify(DELIVERY));
  
    /* ---------- Кнопки Telegram ---------- */
    const main = tg?.BottomButton || tg?.MainButton;
    if (main){
      if (main.setParams){
        main.setParams({
          text: 'Дальше',
          color: '#007aff',
          text_color: '#ffffff',
          is_visible: true,
          is_active: true
        });
      } else {
        main.setText?.('Дальше');
        main.show?.();
        main.color = '#007aff';
        main.textColor = '#ffffff';
      }
      main.offClick?.();
      main.onClick?.(() => {
        tg?.HapticFeedback?.impactOccurred?.('light');
        // здесь пойдём на следующий шаг (оплата/подтверждение)
        // временно:
        // location.href = 'checkout-summary.html';
        tg?.showAlert?.('Следующий шаг оформления (добавим дальше)');
      });
    }
  
    // SecondaryButton не нужен здесь
    tg?.SecondaryButton?.hide?.();
  
    /* ---------- BackButton: назад к контактам ---------- */
    const BB = tg?.BackButton;
    const goBack = () => {
      if (history.length > 1) history.back();
      else location.replace('checkout.html');
    };
    BB?.offClick?.(goBack);
    BB?.onClick?.(goBack);
    BB?.show?.();
  
    /* ---------- Чистка при уходе со страницы ---------- */
    window.addEventListener('pagehide', () => {
      main?.offClick?.();
      main?.hide?.();
      BB?.offClick?.(goBack);
      BB?.hide?.();
      tg?.enableVerticalSwipes?.();
    });
  
    /* ---------- Заглушка на кнопку «Адрес доставки» ---------- */
    document.getElementById('addrBtn')?.addEventListener('click', () => {
      tg?.HapticFeedback?.selectionChanged?.();
      // здесь подключишь выбор ПВЗ/адреса (карта/модалка)
    });
  })();
  