// Контакты — открытие/закрытие нижнего шита
const contactsBtn = document.getElementById('contactsBtn');
const sheet = document.getElementById('contactsSheet');

function openSheet(){
  sheet.classList.add('open');
  sheet.setAttribute('aria-hidden', 'false');
}
function closeSheet(){
  sheet.classList.remove('open');
  sheet.setAttribute('aria-hidden', 'true');
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
