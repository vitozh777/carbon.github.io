(function(){
    const tg = window.Telegram?.WebApp;
    tg?.ready?.();
    tg?.disableVerticalSwipes?.();
  
    const PROXY_URL = window.CDEK_PROXY_URL || '/api/cdek/pvz'; // укажешь свой URL
  
    const main = tg?.BottomButton || tg?.MainButton;
    const Back = tg?.BackButton;
  
    let chosen = null;
    function setPickBtn(enabled){
      if (!main) return;
      if (main.setParams){
        main.setParams({ text:'Выбрать место доставки', color:'#007aff', text_color:'#fff', is_visible:true, is_active:!!enabled });
      } else {
        main.setText?.('Выбрать место доставки'); main.show?.(); main.color='#007aff'; main.textColor='#fff';
      }
    }
    setPickBtn(false);
  
    const goBack = ()=> location.replace('checkout-delivery.html');
    Back?.offClick?.(goBack); Back?.onClick?.(goBack); Back?.show?.();
  
    function saveAndExit(){
      if (!chosen){ tg?.HapticFeedback?.notificationOccurred?.('error'); return; }
      localStorage.setItem('checkoutPvz', JSON.stringify(chosen));
      tg?.HapticFeedback?.notificationOccurred?.('success');
      location.replace('checkout-delivery.html');
    }
    main?.offClick?.(); main?.onClick?.(saveAndExit);
  
    // --------- Яндекс.Карты ---------
    ymaps.ready(async () => {
      const map = new ymaps.Map('yMap', {
        center: [55.751244, 37.618423], zoom: 11,
        controls: ['zoomControl','geolocationControl','searchControl']
      }, { suppressMapOpenBlock: true });
  
      // Если есть город у пользователя — приблизим
      try{
        const contact = JSON.parse(localStorage.getItem('checkoutContact')||'{}');
        if (contact.city){
          const res = await ymaps.geocode(contact.city);
          const p = res.geoObjects.get(0);
          if (p){ map.setCenter(p.geometry.getCoordinates(), 12); }
        }
      }catch{}
  
      // ObjectManager для тысяч точек
      const om = new ymaps.ObjectManager({ clusterize: true, gridSize: 64 });
      om.objects.options.set('preset', 'islands#blueCircleDotIcon'); // синие точки
      map.geoObjects.add(om);
  
      // Балун по клику
      om.objects.events.add('click', (e)=>{
        const id = e.get('objectId');
        const o = om.objects.getById(id);
        chosen = {
          id: o.properties.code,
          code: o.properties.code,
          city: o.properties.city,
          address: o.properties.address,
          lat: o.geometry.coordinates[0],
          lon: o.geometry.coordinates[1]
        };
        setPickBtn(true);
        tg?.HapticFeedback?.selectionChanged?.();
  
        const html = `
          <div class="pvz-balloon">
            <div class="pvz-title">СДЭК — ПВЗ №${o.properties.code}</div>
            <div>${o.properties.city}, ${o.properties.address}</div>
            ${o.properties.work_time ? `<div class="pvz-sub">Часы работы: ${o.properties.work_time}</div>`:''}
          </div>`;
        map.balloon.open(o.geometry.coordinates, html, { closeButton:true, minWidth:260 });
      });
  
      // Подгрузка ПВЗ около центра карты
      async function loadPvz({lat, lon}){
        try{
          const url = `${PROXY_URL}?lat=${lat.toFixed(6)}&lon=${lon.toFixed(6)}&radius_km=25`;
          const r = await fetch(url, { credentials:'omit' });
          if (!r.ok) throw new Error('proxy response not ok');
          const data = await r.json(); // ожидаем GeoJSON FeatureCollection
          om.removeAll();
          om.add(data);
        }catch(err){
          // демо-точки (если прокси не готов)
          const demo = {
            type:'FeatureCollection', features:[
              { type:'Feature', id:1, geometry:{ type:'Point', coordinates:[55.7602,37.618] },
                properties:{ code:'0001', city:'Москва', address:'ул. Тверская, 1', work_time:'10:00–20:00' } },
              { type:'Feature', id:2, geometry:{ type:'Point', coordinates:[55.742,37.652] },
                properties:{ code:'0002', city:'Москва', address:'ул. Таганская, 10', work_time:'09:00–21:00' } }
            ]
          };
          om.removeAll(); om.add(demo);
        }
      }
  
      // первичная загрузка
      const c = map.getCenter(); loadPvz({lat:c[0], lon:c[1]});
  
      // догрузка при перемещении
      let tmr = 0;
      map.events.add('boundschange', ()=>{
        clearTimeout(tmr);
        tmr = setTimeout(()=>{
          const center = map.getCenter();
          loadPvz({lat:center[0], lon:center[1]});
        }, 400);
      });
    });
  
    // очистка
    window.addEventListener('pagehide', ()=>{
      main?.offClick?.(); main?.hide?.();
      Back?.offClick?.(goBack); Back?.hide?.();
      tg?.enableVerticalSwipes?.();
    });
  })();
  