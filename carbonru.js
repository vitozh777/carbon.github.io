// Контакты — открытие/закрытие нижнего шита
const contactsBtn = document.getElementById('contactsBtn');
const sheet = document.getElementById('contactsSheet');

function openSheet(){
  // если вдруг идёт закрытие — прерываем его
  sheet.classList.remove('closing');
  sheet.classList.add('open');
  sheet.setAttribute('aria-hidden', 'false');
}

function closeSheet(){
  // запускаем анимацию закрытия
  if (!sheet.classList.contains('open')) return; // уже закрыто
  sheet.classList.add('closing');      // держим overlay видимым
  sheet.classList.remove('open');      // триггерим transform вниз

  // ждём завершения трансформа на body
  const bodyEl = sheet.querySelector('.sheet-body');
  const onDone = (e) => {
    if (e.target !== bodyEl || e.propertyName !== 'transform') return;
    bodyEl.removeEventListener('transitionend', onDone);
    sheet.classList.remove('closing');          // теперь можно скрыть
    sheet.setAttribute('aria-hidden', 'true');
  };
  bodyEl.addEventListener('transitionend', onDone);
}


contactsBtn.addEventListener('click', openSheet);
sheet.addEventListener('click', (e)=>{
  if (e.target.matches('[data-close], .sheet-backdrop')) closeSheet();
});
window.addEventListener('keydown', (e)=>{
  if (e.key === 'Escape' && sheet.classList.contains('open')) closeSheet();
});

// Пример: обработчики кнопок (если захотите логировать/подменять навигацию)
document.getElementById('btn-iphone').addEventListener('click', (e)=>{
  // по умолчанию ведёт на iphone.html — ничего не делаем
  // e.preventDefault();
});
document.getElementById('btn-samsung').addEventListener('click', (e)=>{
  // e.preventDefault();
});
document.getElementById('btn-accessories').addEventListener('click', (e)=>{
  // e.preventDefault();
});

const heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
  heroVideo.addEventListener('ended', () => {
    // Останавливаем на последнем кадре, чтобы не прыгал к началу/постеру
    try {
      heroVideo.pause();
      const t = Math.max(0, (heroVideo.duration || heroVideo.currentTime) - 0.05);
      heroVideo.currentTime = t;
    } catch (_) {}
    // НИКАКИХ классов и скрытия не добавляем
  });
}
