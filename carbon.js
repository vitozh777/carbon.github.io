let tg = window.Telegram.WebApp;
let model1 = document.querySelectorAll(".model1");
let model2 = document.querySelectorAll(".model2");
let model3 = document.querySelectorAll(".model3");
let model4 = document.querySelectorAll(".model4");
let priceElement = document.querySelector(".price");
let form1 = document.getElementById("form1");
let form2 = document.getElementById("form2");
let form3 = document.getElementById("form3");
let form4 = document.getElementById("form4");
let form5 = document.getElementById("form5");
let form6 = document.getElementById("form6");
let form9 = document.getElementById("form9");
let form10 = document.getElementById("form10");
let form11 = document.getElementById("form11");
let form12 = document.getElementById("form12");
let form13 = document.getElementById("form13");
let form14 = document.getElementById("form14");
let form15 = document.getElementById("form15");
let form16 = document.getElementById("form16");
let form17 = document.getElementById("form17");
let form18 = document.getElementById("form18");
let form19 = document.getElementById("form19");
let form20 = document.getElementById("form20");
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let btn4 = document.getElementById("btn4");
let btn5 = document.getElementById("btn5");
let btn6 = document.getElementById("btn6");
let btn9 = document.getElementById("btn9");
let btn10 = document.getElementById("btn10");
let btn11 = document.getElementById("btn11");
let btn12 = document.getElementById("btn12");
let btn13 = document.getElementById("btn13");
let btn14 = document.getElementById("btn14");
let btn15 = document.getElementById("btn15");
let btn16 = document.getElementById("btn16");
let btn17 = document.getElementById("btn17");
let btn18 = document.getElementById("btn18");
let btn19 = document.getElementById("btn19");
let btn20 = document.getElementById("btn20");
let btn21 = document.getElementById("btn21");
let homeContent = document.getElementById("thepuffercase");
let order1 = document.getElementById("order1");
let order2 = document.getElementById("order2");
let order3 = document.getElementById("order3");
let order4 = document.getElementById("order4");
let order5 = document.getElementById("order5");
let order6 = document.getElementById("order6");
let order9 = document.getElementById("order9");
let order10 = document.getElementById("order10");
let order11 = document.getElementById("order11");
let order12 = document.getElementById("order12");
let order13 = document.getElementById("order13");
let order14 = document.getElementById("order14");
let order15 = document.getElementById("order15");
let order16 = document.getElementById("order16");
let order17 = document.getElementById("order17");
let order18 = document.getElementById("order18");
let order19 = document.getElementById("order19");
let order20 = document.getElementById("order20");
let orderozon1 = document.getElementById("orderozon1");
let orderozon2 = document.getElementById("orderozon2");
let orderozon3 = document.getElementById("orderozon3");
let orderozon4 = document.getElementById("orderozon4");
let orderozon5 = document.getElementById("orderozon5");
let orderozon6 = document.getElementById("orderozon6");
let orderozon16 = document.getElementById("orderozon16");
let orderozon17 = document.getElementById("orderozon17");
let orderozon18 = document.getElementById("orderozon18");
let orderozon19 = document.getElementById("orderozon19");
let orderozon20 = document.getElementById("orderozon20");
let selectedModel = "";
let selectedRazmer = "";
let selectedPrice = "";
let priceElementFormplan1 = document.querySelector(".price1");
let priceElementFormplan2 = document.querySelector(".price2");
let priceElementFormplan3 = document.querySelector(".price3");
let priceElementForm1 = document.querySelector(".price1");
let priceElementForm2 = document.querySelector(".price2");
let priceElementForm3 = document.querySelector(".price3");
let priceElementForm4 = document.querySelector(".price4");
let priceElementForm5 = document.querySelector(".price5");
let priceElementForm6 = document.querySelector(".price6");
let priceElementForm9 = document.querySelector(".price9");

const cartButton = document.getElementById('cart-button');
const backButton1 = document.getElementById("back-button1");
const backButton2 = document.getElementById("back-button2");

document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const video1 = document.getElementById('myVideo');
    const video2 = document.getElementById('myVideo3');
    const videos = [video1, video2];
    let resourcesLoaded = 0;
    const totalResources = videos.length + document.images.length;
    let isVideoPlayed = false;

    // Функция скрытия экрана загрузки и начала воспроизведения видео
    function hideLoadingScreen() {
        loadingScreen.style.display = 'none';
        videos.forEach(video => {
            video.currentTime = 0;
            video.play().catch(error => console.error('Ошибка воспроизведения видео:', error));
        });
        isVideoPlayed = true;
    }

    // Проверка загрузки всех ресурсов
    function checkAllResourcesLoaded() {
        resourcesLoaded++;
        if (resourcesLoaded >= totalResources && videos.every(video => video.readyState >= 3)) {
            hideLoadingScreen();
        }
    }

    // Обработка загрузки изображений
    for (let img of document.images) {
        img.complete ? checkAllResourcesLoaded() : img.addEventListener('load', checkAllResourcesLoaded);
        img.addEventListener('error', checkAllResourcesLoaded);
    }

    // Настройка видео
    videos.forEach(video => {
        video.style.display = 'block'; // Показываем видео сразу
        video.preload = "auto";
        video.onloadeddata = checkAllResourcesLoaded;
        video.onerror = checkAllResourcesLoaded;
    });

    // Таймаут на случай зависания загрузки
    setTimeout(() => {
        if (!isVideoPlayed) hideLoadingScreen();
    }, 0);
});


const swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    centeredSlides: true,
});

function openOverlayPP(imageSrc) {
    document.getElementById('overlayPPImage').src = imageSrc;
    document.getElementById('overlayPP').style.display = 'flex';
}

function closeOverlayPP() {
    document.getElementById('overlayPP').style.display = 'none';
}


var animation = lottie.loadAnimation({
    container: document.getElementById('cart-icon'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'cart.json'
});


let cartItems = [];

cartButton.addEventListener('click', function () {
    const cart = document.getElementById('mycart');
    cart.classList.remove('hidden');
    cartMessage.style.display = 'none';

    if (cartItems.length > 0) {
        tg.MainButton.text = "Оплатить через оператора";
        tg.MainButton.show();
    } else {
        tg.MainButton.hide();
    }
});

function updateCartDisplay() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";

    cartItems.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <div class="item-img">
                <img src="${item.imageUrl}" alt="${item.name}" class="item-image"> <!-- Фото товара -->
            </div>
            <div class="item-info">
                <div class="item-name">${item.name}</div> <!-- Модель товара -->
                <div class="item-model">${item.model}</div> <!-- Размер товара -->
                <div class="item-price">${item.price}₽</div> <!-- Цена товара -->
            </div>
            <div class="item-quantity">
                <button onclick="updateQuantity(${item.id}, '${item.model}', -1)">-</button>
                <input type="text" value="${item.quantity}" readonly>
                <button onclick="updateQuantity(${item.id}, '${item.model}', 1)">+</button>
            </div>
        `;

        cartContainer.appendChild(cartItem);
    });

    updateTotalPrice();  
}


document.getElementById("close-cart").addEventListener("click", function() {
    document.getElementById("mycart").classList.add("hidden");
    tg.MainButton.hide();
    updateCartCounter();
});


function addToCart(item) {
    const existingItem = cartItems.find(i => i.id === item.id && i.model === item.model);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ ...item });
    }

    enableCartControls();
    updateTotalPrice();
}




// Функция для обновления количества товара
function updateQuantity(itemId, model, change) {
    const item = cartItems.find(i => i.id === itemId && i.model === model);
    if (item) {
        item.quantity += change;

        // Если количество меньше 1, удаляем товар из корзины
        if (item.quantity <= 0) {
            cartItems = cartItems.filter(i => i.id !== itemId || i.model !== model);
        }

        updateCartDisplay();  // Обновляем отображение корзины после изменения количества
    }
}

const cartCounter = document.getElementById("cart-counter");
const cartMessage = document.createElement('div');
cartMessage.classList.add('cart-message');
document.body.appendChild(cartMessage);

function showCartMessage() {
    cartMessage.textContent = 'Добавлено';
    cartMessage.style.display = 'block';
    setTimeout(() => {
        cartMessage.style.display = 'none';
    }, 4000); // Окно будет отображаться 4 секунды
}

function updateCartCounter() {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    if (totalItems > 0) {
        cartCounter.textContent = totalItems;
        cartCounter.classList.remove('hidden');
    } else {
        cartCounter.classList.add('hidden');
    }
}






function updateTotalPrice() {
    // Считаем общую цену товаров
    let totalItemsPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Применяем скидку 10%, если промокод введён
    let discountedItemsPrice = totalItemsPrice;
    if (promoApplied) {
        discountedItemsPrice *= 0.9; // Применяем скидку 10%
    }

    // Определяем общую цену без учёта скидки (с доставкой)
    const totalWithoutDiscount = totalItemsPrice + deliveryPrice;

    // Логика для набора наклеек
    let stickerPrice = 100; // Цена набора наклеек по умолчанию — 100₽

    // Если общая сумма товаров + доставка >= 3000, набор становится бесплатным
    if (totalWithoutDiscount >= 3000) {
        stickerPrice = 0; // Набор бесплатный
    } else if (!stickerIncluded) {
        stickerPrice = -100; // Если набор выключен, цена 100₽ сохраняется, но вычитается из общей суммы
    }

    // Итоговая цена товаров + доставка + наклейки
    const totalPrice = Math.round(discountedItemsPrice + deliveryPrice + (stickerPrice > 0 ? stickerPrice : 0));

    // Обновляем цену на странице
    const oldPriceElement = document.getElementById("old-price");
    const newPriceElement = document.getElementById("new-price");

    if (promoApplied) {
        oldPriceElement.textContent = `${Math.round(totalItemsPrice + deliveryPrice + 100)}₽`; // Старая цена
        newPriceElement.textContent = `${totalPrice}₽`; // Новая цена со скидкой
        oldPriceElement.classList.remove("hidden"); // Показываем старую цену
        newPriceElement.classList.add("discount-applied"); // Меняем цвет новой цены на красный
    } else {
        newPriceElement.textContent = `${Math.round(totalItemsPrice + deliveryPrice + (stickerPrice > 0 ? stickerPrice : 0))}₽`; // Без скидки, цена серого цвета
        oldPriceElement.classList.add("hidden"); // Скрываем старую цену
        newPriceElement.classList.remove("discount-applied"); // Убираем красный цвет
    }

    // Обновляем цену за наклейки
    document.getElementById("sticker-price").textContent = stickerPrice >= 0 ? `${stickerPrice}₽` : "0₽";

    // Обновляем подсказку по наклейкам
    updateStickerHint(totalWithoutDiscount);
}

// Выбор метода доставки
function selectDeliveryMethod(price) {
    deliveryPrice = price;
    updateTotalPrice();
}

function getDeliveryMethodName() {
    const deliveryMethods = {
        0: '5Post',
        0: 'Яндекс Go',
        0: 'CDEK',
        1000: 'CDEK (экспресс)'
    };

    return deliveryMethods[deliveryPrice] || 'Неизвестный метод доставки';
}

// Разблокировка кнопок корзины
function enableCartControls() {
    document.getElementById("toggle-sticker").disabled = false;
    document.getElementById("apply-discount").disabled = false;
    document.getElementById("promo-code").disabled = false;
    document.getElementById("apply-promo-btn").disabled = false;

    const deliveryButtons = document.querySelectorAll(".airdelivery-btn1");
    deliveryButtons.forEach(button => button.disabled = false);
}


let deliveryPrice = 0; // Цена доставки по умолчанию (5Post)
let promoApplied = false;
let stickerIncluded = true;

// Открываем окно промокода при нажатии на кнопку "Применить скидку"
document.getElementById("apply-discount").addEventListener("click", (event) => {
    if (!document.getElementById("apply-discount").disabled) {
        event.stopPropagation(); // Останавливаем всплытие события
        document.getElementById("promo-popup").classList.remove("hidden");
        document.getElementById("blur-overlay").classList.remove("hidden");
        tg.MainButton.hide();
    }
});

// Инициализируем анимацию скидки
const discountAnimation = lottie.loadAnimation({
    container: document.getElementById('discount-icon'), // контейнер для анимации
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'skidka.json' // Замените на путь к вашему JSON файлу
});

// Закрытие всплывающего окна при клике вне его
document.addEventListener("click", function(event) {
    const promoPopup = document.getElementById("promo-popup");
    const promoContent = document.querySelector(".promo-content");
    const applyDiscountBtn = document.getElementById("apply-discount");
    const blurOverlay = document.getElementById("blur-overlay");

    // Проверяем, открыт ли popup и произошел ли клик вне его содержимого и вне кнопки "Применить скидку"
    if (!promoPopup.classList.contains("hidden") && !promoContent.contains(event.target) && event.target !== applyDiscountBtn) {
        promoPopup.classList.add("hidden"); // Скрываем окно
        blurOverlay.classList.add("hidden");
        tg.MainButton.show();
    }
});

// Обрабатываем применение скидки
document.getElementById("apply-promo-btn").addEventListener("click", () => {
    const promoCode = document.getElementById("promo-code").value.toLowerCase(); // Промокод переводим в нижний регистр для совместимости
    const validPromoCodes = ["must10", "nesnimi26", "димон", "carbon10", "puffplan", "lexus10"]; // Список валидных промокодов

    if (validPromoCodes.includes(promoCode) && !promoApplied) {
        promoApplied = true; // Устанавливаем флаг, что скидка применена
        appliedPromoCode = promoCode; // Сохраняем примененный промокод
        document.getElementById("promo-popup").classList.add("hidden"); // Закрываем окно
        document.getElementById("blur-overlay").classList.add("hidden"); // Закрываем окно
        updateTotalPrice(); // Пересчитываем общую цену с учетом скидки
        tg.MainButton.show();
    } else {
        alert("Неверный промокод или скидка уже применена.");
    }
});

// Функция переключения набора наклеек
function toggleSticker() {
    stickerIncluded = document.getElementById("toggle-sticker").checked; // Проверяем состояние набора наклеек
    updateTotalPrice(); // Пересчитываем общую цену
}



// Обновление подсказки по наклейкам
function updateStickerHint(totalWithoutDiscount) {
    const hintElement = document.getElementById("sticker-hint");

    // Если общая цена (с доставкой) меньше 3000 рублей, показываем, сколько не хватает до бесплатного набора наклеек
    if (totalWithoutDiscount < 3000) {
        const amountLeft = Math.round(3000 - totalWithoutDiscount);
        hintElement.textContent = `Добавьте ещё на ${amountLeft}₽ для бесплатного стикерпака`;
    } else {
        hintElement.textContent = ''; // Убираем подсказку, если сумма >= 3000
    }
}
















// Функция для переключения видимости блока контактов
function toggleContacts() {
    var contactsButtons = document.getElementById("contacts-buttons");
    var arrow = document.getElementById("arrow");

    if (contactsButtons.classList.contains("hidden")) {
        contactsButtons.classList.remove("hidden");
        arrow.classList.add("open");
    } else {
        contactsButtons.classList.add("hidden");
        arrow.classList.remove("open");
    }
}

// Обработчик клика по документу
document.addEventListener("click", function(event) {
    var contactsButtons = document.getElementById("contacts-buttons");
    var contactsHeader = document.querySelector(".contacts-header");
    
    // Проверяем, произошел ли клик внутри кнопки или блока контактов
    if (!contactsHeader.contains(event.target) && !contactsButtons.contains(event.target)) {
        // Скрываем блок с контактами и закрываем стрелку
        if (!contactsButtons.classList.contains("hidden")) {
            contactsButtons.classList.add("hidden");
            var arrow = document.getElementById("arrow");
            arrow.classList.remove("open");
        }
    }
});








const casepuffButton = document.getElementById("casepuff");

casepuffButton.addEventListener("click", () => {
    document.getElementById("home").style.display = "none";
    document.getElementById("thepuffercase").style.display = "block";

    var contactsHeader = document.querySelector(".contacts-header");
    if (contactsHeader) {
        contactsHeader.style.display = "none";
    }

    // Показываем кнопку "Назад"
    backButton1.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton1.onclick = () => {
        document.getElementById("thepuffercase").style.display = "none"; // Скрываем "pufferplanet"
        document.getElementById("home").style.display = "block"; // Показываем "home"
        backButton1.style.display = "none"; // Скрываем кнопку "Назад"

        // Показываем contacts-header при возврате на "home"
        if (contactsHeader) {
            contactsHeader.style.display = "block"; // Показываем элемент снова
        }

        video1.currentTime = 0; // Сбрасываем видео на начало
        video1.play(); // Начинаем воспроизведение
        video2.currentTime = 0; // Сбрасываем второе видео на начало
        video2.play(); // Начинаем воспроизведение
    };


});

const pufferplanetButton = document.getElementById("puffplanet");

pufferplanetButton.addEventListener("click", () => {
    document.getElementById("home").style.display = "none";
    document.getElementById("pufferplanet").style.display = "block";

    var contactsHeader = document.querySelector(".contacts-header");
    if (contactsHeader) {
        contactsHeader.style.display = "none";
    }

    // Показываем кнопку "Назад"
    backButton1.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton1.onclick = () => {
        document.getElementById("pufferplanet").style.display = "none"; // Скрываем "pufferplanet"
        document.getElementById("home").style.display = "block"; // Показываем "home"
        backButton1.style.display = "none"; // Скрываем кнопку "Назад"

        // Показываем contacts-header при возврате на "home"
        if (contactsHeader) {
            contactsHeader.style.display = "block"; // Показываем элемент снова
        }

        video1.currentTime = 0; // Сбрасываем видео на начало
        video1.play(); // Начинаем воспроизведение
        video2.currentTime = 0; // Сбрасываем второе видео на начало
        video2.play(); // Начинаем воспроизведение
    };

    
});









const filterButton = document.getElementById('filterButton');
const filterPicker = document.getElementById('filterPicker');
const filterWheel = document.getElementById('pickerWheel');
const pickerOptions = filterWheel.querySelectorAll('.ios-picker-option');
const allItems = document.querySelectorAll('#thepuffercase .item');

let lastSelectedValue = "";

// Звук щелчка
const clickSound = new Audio('click.mp3');
clickSound.volume = 0.3;

// Показать/скрыть колесо + повернуть стрелку
filterButton.addEventListener('click', () => {
    filterPicker.classList.toggle('hidden');
    filterButton.classList.toggle('active');
    scrollToCurrentSelection();
});

// Центрировать на выбранную
function scrollToCurrentSelection() {
    const selected = filterWheel.querySelector('.selected');
    if (selected) {
        const offset = selected.offsetTop - (filterWheel.clientHeight / 2) + (selected.clientHeight / 2);
        filterWheel.scrollTo({ top: offset, behavior: 'smooth' });
    }
}

// Найти элемент по центру
function getCenteredOption() {
    const centerY = filterWheel.scrollTop + filterWheel.offsetHeight / 2;
    let closestOption = null;
    let closestDistance = Infinity;

    pickerOptions.forEach(option => {
        const optionCenter = option.offsetTop + option.offsetHeight / 2;
        const distance = Math.abs(centerY - optionCenter);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestOption = option;
        }
    });

    return closestOption;
}

// Слушатель прокрутки
filterWheel.addEventListener('scroll', () => {
    clearTimeout(filterWheel._scrollTimeout);
    filterWheel._scrollTimeout = setTimeout(() => {
        const centered = getCenteredOption();

        if (centered && centered.dataset.value !== lastSelectedValue) {
            lastSelectedValue = centered.dataset.value;

            pickerOptions.forEach(opt => opt.classList.remove('selected'));
            centered.classList.add('selected');

            applyFilter(lastSelectedValue);

            clickSound.currentTime = 0;
            clickSound.play();
        }
    }, 50);
});

// Применить фильтр
function applyFilter(value) {
    allItems.forEach(item => {
        const id = item.id;
        if (
            value === 'ALL' ||
            (value === 'FORGED' && id.startsWith('FORGED') && !id.startsWith('FORGEDSOLID') && !id.startsWith('FORGEDFULL')) ||
            (value === 'FORGEDSOLID' && id.startsWith('FORGEDSOLID')) ||
            (value === 'FORGEDFULL' && id === 'FORGEDFULL1') ||
            (value === 'HYBRID' && id.startsWith('HYBRID'))
        ) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Инициализация
window.addEventListener('load', () => {
    const allOption = filterWheel.querySelector('[data-value="ALL"]');
    if (allOption) {
        allOption.classList.add('selected');
        lastSelectedValue = 'ALL';
        applyFilter('ALL');
        setTimeout(() => {
            filterWheel.scrollTo({
                top: allOption.offsetTop - filterWheel.offsetHeight / 2 + allOption.offsetHeight / 2,
                behavior: 'smooth'
            });
        }, 100);
    }
});

// Скрытие filterPicker при клике вне кнопки или picker-а
document.addEventListener('click', function (e) {
    const isClickInsideButton = filterButton.contains(e.target);
    const isClickInsidePicker = filterPicker.contains(e.target);

    if (!isClickInsideButton && !isClickInsidePicker) {
        filterPicker.classList.add('hidden');
        filterButton.classList.remove('active');
    }
});
// Скрытие filterPicker при прокрутке страницы
window.addEventListener('scroll', () => {
    if (!filterPicker.classList.contains('hidden')) {
        filterPicker.classList.add('hidden');
        filterButton.classList.remove('active');
    }
});
















const ozonLinks1 = {
    "iPhone 16 Pro Max": "https://ozon.ru/t/632M186",
    "iPhone 16 Pro": "https://ozon.ru/t/VJ7cDuA",
    "iPhone 15 Pro Max": "https://ozon.ru/t/qy0Jmjr",
    "iPhone 15 Pro": "https://ozon.ru/t/MuFau0t",
    "iPhone 14 Pro Max": "https://ozon.ru/t/lQznGQN",
    "iPhone 14 Pro": "https://ozon.ru/t/hwUeEgU",
    "iPhone 13 Pro Max": "https://ozon.ru/t/8UcZ4Lg",
    "iPhone 13 Pro": "https://ozon.ru/t/97OCEou",
};
const ozonLinks6 = {
    "iPhone 16 Pro Max": "https://ozon.ru/t/7oqRBtN",
    "iPhone 16 Pro": "https://ozon.ru/t/GNthLvK",
    "iPhone 15 Pro Max": "https://ozon.ru/t/zDAp771",
    "iPhone 15 Pro": "https://ozon.ru/t/Q1Dr8Wn",
    "iPhone 14 Pro Max": "https://ozon.ru/t/6324gyL",
    "iPhone 14 Pro": "https://ozon.ru/t/EvnQa2c",
    "iPhone 13 Pro Max": "https://ozon.ru/t/I06WKXy",
    "iPhone 13 Pro": "https://ozon.ru/t/7oqRUNA",
};
const ozonLinks19 = {
    "iPhone 16 Pro Max": "https://ozon.ru/t/vIkowfF",
    "iPhone 16 Pro": "https://ozon.ru/t/ZgQsl54",
    "iPhone 15 Pro Max": "https://ozon.ru/t/7oq3jHx",
    "iPhone 15 Pro": "https://ozon.ru/t/amWXZ7n",
};
const ozonLinks20 = {
    "iPhone 16 Pro Max": "https://ozon.ru/t/ga1xNRc",
    "iPhone 16 Pro": "https://ozon.ru/t/8UcpmtC",
    "iPhone 15 Pro Max": "https://ozon.ru/t/j9HkLOg",
    "iPhone 15 Pro": "https://ozon.ru/t/sxRfQPC",
};
const ozonLinks2 = {
    "iPhone 16 Pro Max": "https://ozon.ru/t/pTiSBe5",
    "iPhone 16 Pro": "https://ozon.ru/t/lQzPum1",
    "iPhone 15 Pro Max": "https://ozon.ru/t/7oq36si",
    "iPhone 15 Pro": "https://ozon.ru/t/vIkoil1",
    "iPhone 14 Pro Max": "https://ozon.ru/t/7oq3jAQ",
    "iPhone 14 Pro": "https://ozon.ru/t/7oq3jKz",
    "iPhone 13 Pro Max": "https://ozon.ru/t/ytYzZtj",
    "iPhone 13 Pro": "https://ozon.ru/t/5zNgZPx",
};
const ozonLinks3 = {
    "iPhone 16 Pro Max": "https://ozon.ru/t/8UcaL3e",
    "iPhone 16 Pro": "https://ozon.ru/t/oGylQqS",
    "iPhone 15 Pro Max": "https://ozon.ru/t/BFrfXOB",
    "iPhone 15 Pro": "https://ozon.ru/t/cBKiNia",
    "iPhone 14 Pro Max": "https://ozon.ru/t/vIkoWd7",
    "iPhone 14 Pro": "https://ozon.ru/t/Evn7Gc0",
    "iPhone 13 Pro Max": "https://ozon.ru/t/7oq3lKz",
    "iPhone 13 Pro": "https://ozon.ru/t/unSUkrk",
};
const ozonLinks4 = {
    "iPhone 16 Pro Max": "https://ozon.ru/t/j9HKixE",
    "iPhone 16 Pro": "https://ozon.ru/t/ytYOtqa",
    "iPhone 15 Pro Max": "https://ozon.ru/t/zDAazdg",
    "iPhone 15 Pro": "https://ozon.ru/t/1WLliJF",
    "iPhone 14 Pro Max": "https://ozon.ru/t/97Or7Ae",
    "iPhone 14 Pro": "https://ozon.ru/t/GNtQiAa",
    "iPhone 13 Pro Max": "https://ozon.ru/t/j9HKQVF",
    "iPhone 13 Pro": "https://ozon.ru/t/iEuhNxJ",
};
const ozonLinks5 = {
    "iPhone 16 Pro Max": "https://ozon.ru/t/teZqP1S",
    "iPhone 16 Pro": "https://ozon.ru/t/GNt7BQG",
    "iPhone 15 Pro Max": "https://ozon.ru/t/sxRNXra",
    "iPhone 15 Pro": "https://ozon.ru/t/wiMdizq",
    "iPhone 14 Pro Max": "https://ozon.ru/t/1WLlG5r",
    "iPhone 14 Pro": "https://ozon.ru/t/1WLlEL2",
    "iPhone 13 Pro Max": "https://ozon.ru/t/7oq3kRe",
    "iPhone 13 Pro": "https://ozon.ru/t/L4x8azK",
};
const ozonLinks16 = {
    "iPhone 16 Pro Max": "https://ozon.ru/t/iEkiQXq",
    "iPhone 16 Pro": "https://ozon.ru/t/unJLwyZ",
    "iPhone 15 Pro Max": "https://ozon.ru/t/4CpyE8M",
    "iPhone 15 Pro": "https://ozon.ru/t/BF9AC2L",
    "iPhone 14 Pro Max": "https://ozon.ru/t/unJLBAL",
    "iPhone 14 Pro": "https://ozon.ru/t/nk24G4s",
    "iPhone 13 Pro Max": "https://ozon.ru/t/pTvgQen",
    "iPhone 13 Pro": "https://ozon.ru/t/j9qRSmM",
};
const ozonLinks17 = {
    "iPhone 16 Pro Max": "https://ozon.ru/t/gafghlp",
    "iPhone 16 Pro": "https://ozon.ru/t/CKTCHtj",
    "iPhone 15 Pro Max": "https://ozon.ru/t/sxhsCCl",
    "iPhone 15 Pro": "https://ozon.ru/t/Ev6EOPp",
    "iPhone 14 Pro Max": "https://ozon.ru/t/oGeokxA",
    "iPhone 14 Pro": "https://ozon.ru/t/winwC0D",
    "iPhone 13 Pro Max": "https://ozon.ru/t/cBjcdJo",
    "iPhone 13 Pro": "https://ozon.ru/t/teat2Tf",
};
const ozonLinks18 = {
    "iPhone 16 Pro Max": "https://ozon.ru/t/oGeo6fQ",
    "iPhone 16 Pro": "https://ozon.ru/t/vI3vdQs",
    "iPhone 15 Pro Max": "https://ozon.ru/t/HO0HX3M",
    "iPhone 15 Pro": "https://ozon.ru/t/L4bLpQ0",
    "iPhone 14 Pro Max": "https://ozon.ru/t/pTvp7o1",
    "iPhone 14 Pro": "https://ozon.ru/t/qyZqSul",
    "iPhone 13 Pro Max": "https://ozon.ru/t/7ot72Ch",
    "iPhone 13 Pro": "https://ozon.ru/t/m8Bm0ec",
};





const modelInfo1 = {
    "iPhone 16 Pro Max": "3699₽",
    "iPhone 16 Pro": "3699₽",
    "iPhone 15 Pro Max": "3699₽",
    "iPhone 15 Pro": "3699₽",
    "iPhone 14 Pro Max": "3699₽",
    "iPhone 14 Pro": "3699₽",
    "iPhone 13 Pro Max": "3699₽",
    "iPhone 13 Pro": "3699₽",
};

const modelInfo2 = {
    "iPhone 16 Pro Max": "4599₽",
    "iPhone 16 Pro": "4599₽",
    "iPhone 15 Pro Max": "4599₽",
    "iPhone 15 Pro": "4599₽",
};





const modelInfo3 = {
    "iPhone 16 Pro Max": "2399₽",
    "iPhone 16 Pro": "2399₽",
    "iPhone 16": "2399₽",
    "iPhone 15 Pro Max": "2399₽",
    "iPhone 15 Pro": "2399₽",
    "iPhone 15": "2399₽",
    "iPhone 14 Pro Max": "2399₽",
    "iPhone 14 Pro": "2399₽",
    "iPhone 14": "2399₽",
    "iPhone 13 Pro Max": "2399₽",
    "iPhone 13 Pro": "2399₽",
    "iPhone 13": "2399₽",
    "iPhone 12 Pro Max": "2399₽",
    "iPhone 12/12 Pro": "2399₽",
    "iPhone 11 Pro Max": "2399₽",
    "iPhone 11 Pro": "2399₽",
    "iPhone 11": "2399₽",
};


const modelInfo4 = {
    "AirPods Pro": "2499₽",
    "AirPods Pro 2": "2499₽",
    "AirPods 3": "2499₽",
    "AirPods 4": "2499₽",
};








document.addEventListener('DOMContentLoaded', function() {
    function initializeDeliveryButtons(groupId) {
        const buttons = document.querySelectorAll(`#${groupId} .airdelivery-btn1, .airdelivery-btn2, .airdelivery-btn3, .airdelivery-btn4, .airdelivery-btn5, .airdelivery-btn6, .airdelivery-btn7, .airdelivery-btn8, .delivery-btn1, .delivery-btn2, .delivery-btn3, .delivery-btn4, .delivery-btn5, .delivery-btn6, .delivery-btn7, .delivery-btn8, .delivery-btn9, .delivery-btn10, .delivery-btn11, .delivery-btn12, .delivery-btn13, .delivery-btn14, .delivery-btn15`);
        
        buttons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();  // Предотвращаем стандартное поведение

                // Убираем активный статус у всех кнопок в этой группе
                buttons.forEach(btn => {
                    btn.classList.remove('active');
                });

                // Активируем выбранную кнопку
                button.classList.add('active');
            });
        });

        // Устанавливаем начальное состояние: 5post активен
        document.querySelector(`#${groupId} .airdelivery-btn1, .airdelivery-btn2, .airdelivery-btn3, .airdelivery-btn4, .airdelivery-btn5, .airdelivery-btn6, .airdelivery-btn7, .airdelivery-btn8, .delivery-btn1, .delivery-btn2, .delivery-btn3, .delivery-btn4, .delivery-btn5, .delivery-btn6, .delivery-btn7, .delivery-btn8, .delivery-btn9, .delivery-btn10, .delivery-btn11, .delivery-btn12, .delivery-btn13, .delivery-btn14, .delivery-btn15`).classList.add('active');
    }

    // Инициализируем группы кнопок
    initializeDeliveryButtons('airdelivery-group-1');  // Первая группа на одной странице
});










const купить1 = document.getElementById("купить1");
const купить2 = document.getElementById("купить2");
const купить3 = document.getElementById("купить3");
const купить4 = document.getElementById("купить4");
const купить5 = document.getElementById("купить5");
const купить6 = document.getElementById("купить6");
const купить7 = document.getElementById("купить7");
const купить8 = document.getElementById("купить8");
const купить9 = document.getElementById("купить9");
const pufforder1 = document.getElementById("pufforder1");
const pufforder2 = document.getElementById("pufforder2");
const pufforder3 = document.getElementById("pufforder3");
const pufforder4 = document.getElementById("pufforder4");
const pufforder5 = document.getElementById("pufforder5");
const pufforder6 = document.getElementById("pufforder6");
const pufforder7 = document.getElementById("pufforder7");
const pufforder8 = document.getElementById("pufforder8");
const pufforder9 = document.getElementById("pufforder9");

// Получаем элементы кнопки "SIZE" и окна выбора моделей iPhone
const sizeButtonAir1 = document.getElementById("sizeButtonAir1");
const sizeButtonAir2 = document.getElementById("sizeButtonAir2");
const sizeButtonAir3 = document.getElementById("sizeButtonAir3");
const sizeButtonAir4 = document.getElementById("sizeButtonAir4");
const sizeButtonAir5 = document.getElementById("sizeButtonAir5");
const sizeButtonAir6 = document.getElementById("sizeButtonAir6");
const sizeButtonAir7 = document.getElementById("sizeButtonAir7");
const sizeButtonAir8 = document.getElementById("sizeButtonAir8");
const sizeButtonAir9 = document.getElementById("sizeButtonAir9");
const sizeButton = document.getElementById("sizeButton");
const sizeButton2 = document.getElementById("sizeButton2");
const sizeButton3 = document.getElementById("sizeButton3");
const sizeButton4 = document.getElementById("sizeButton4");
const sizeButton5 = document.getElementById("sizeButton5");
const sizeButton6 = document.getElementById("sizeButton6");
const sizeButton7 = document.getElementById("sizeButton7");
const sizeButton8 = document.getElementById("sizeButton8");
const sizeButton9 = document.getElementById("sizeButton9");
const sizeButton10 = document.getElementById("sizeButton10");
const sizeButton11 = document.getElementById("sizeButton11");
const sizeButton12 = document.getElementById("sizeButton12");
const sizeButton13 = document.getElementById("sizeButton13");
const sizeButton14 = document.getElementById("sizeButton14");
const sizeButton15 = document.getElementById("sizeButton15");
const sizeButton16 = document.getElementById("sizeButton16");
const sizeButton17 = document.getElementById("sizeButton17");
const sizeButton18 = document.getElementById("sizeButton18");
const sizeButton19 = document.getElementById("sizeButton19");
const sizeButton20 = document.getElementById("sizeButton20");
const iphoneModelsWindowAir1 = document.getElementById("iphoneModelsWindowAir1");
const iphoneModelsWindowAir2 = document.getElementById("iphoneModelsWindowAir2");
const iphoneModelsWindowAir3 = document.getElementById("iphoneModelsWindowAir3");
const iphoneModelsWindowAir4 = document.getElementById("iphoneModelsWindowAir4");
const iphoneModelsWindowAir5 = document.getElementById("iphoneModelsWindowAir5");
const iphoneModelsWindowAir6 = document.getElementById("iphoneModelsWindowAir6");
const iphoneModelsWindowAir7 = document.getElementById("iphoneModelsWindowAir7");
const iphoneModelsWindowAir8 = document.getElementById("iphoneModelsWindowAir8");
const iphoneModelsWindowAir9 = document.getElementById("iphoneModelsWindowAir9");
const iphoneModelsWindow = document.getElementById("iphoneModelsWindow");
const iphoneModelsWindow2 = document.getElementById("iphoneModelsWindow2");
const iphoneModelsWindow3 = document.getElementById("iphoneModelsWindow3");
const iphoneModelsWindow4 = document.getElementById("iphoneModelsWindow4");
const iphoneModelsWindow5 = document.getElementById("iphoneModelsWindow5");
const iphoneModelsWindow6 = document.getElementById("iphoneModelsWindow6");
const iphoneModelsWindow7 = document.getElementById("iphoneModelsWindow7");
const iphoneModelsWindow8 = document.getElementById("iphoneModelsWindow8");
const iphoneModelsWindow9 = document.getElementById("iphoneModelsWindow9");
const iphoneModelsWindow10 = document.getElementById("iphoneModelsWindow10");
const iphoneModelsWindow11 = document.getElementById("iphoneModelsWindow11");
const iphoneModelsWindow12 = document.getElementById("iphoneModelsWindow12");
const iphoneModelsWindow13 = document.getElementById("iphoneModelsWindow13");
const iphoneModelsWindow14 = document.getElementById("iphoneModelsWindow14");
const iphoneModelsWindow15 = document.getElementById("iphoneModelsWindow15");
const iphoneModelsWindow16 = document.getElementById("iphoneModelsWindow16");
const iphoneModelsWindow17 = document.getElementById("iphoneModelsWindow17");
const iphoneModelsWindow18 = document.getElementById("iphoneModelsWindow18");
const iphoneModelsWindow19 = document.getElementById("iphoneModelsWindow19");
const iphoneModelsWindow20 = document.getElementById("iphoneModelsWindow20");







купить1.addEventListener("click", () => {
    document.getElementById("pufferplanet").style.display = "none"
    document.getElementById("formplanet1").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model4").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButtonAir1.textContent = "Выберите размер";

    // Делаем кнопку "pufforder1" неактивной
    pufforder1.pufforderinactive = true;
    pufforder1.classList.add("pufforderinactive");

    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("pufferplanet").style.display = "block"; // Показываем "pufferplanet"
        document.getElementById("formplanet1").style.display = "none";   // Скрываем форму выбора модели
        backButton2.style.display = "none";   // Скрываем кнопку "Назад"
        backButton1.style.display = "block";  // Показываем кнопку "Назад" для первого экрана
        cartMessage.style.display = 'none';   // Скрываем сообщение
    
        // Скрываем окно выбора модели
        iphoneModelsWindowAir1.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model4").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButtonAir1.textContent = "Выберите размер";
    };
    
});


// Обработчик события для кнопки "SIZE"
sizeButtonAir1.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindowAir1.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model4").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindowAir1.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButtonAir1.textContent = `Размер: ${selectedModel}`;
    });
});

model4.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo4[selectedModel];

        // Удаляем границу у всех кнопок
        model4.forEach(btn => {
            btn.classList.remove("selected");
            btn.style.border = "none";
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");
                    
        // Обновляем стиль выбранной кнопки
        model.style.border = "1px solid black";

        pufforder1.pufforderinactive = false;
        pufforder1.classList.remove("pufforderinactive");

        priceElement.textContent = selectedPrice;
        priceElementFormplan1.textContent = selectedPrice;
                    
        selectedModel = model.textContent;
    });
});



pufforder1.disabled = false;

pufforder1.addEventListener("click", function (event) {
    event.preventDefault(); // Предотвращаем обновление страницы

    const selectedModel = document.querySelector(".model4.selected").textContent;
    const selectedPrice = parseFloat(modelInfo4[selectedModel].replace(/[^\d]/g, ''));

    addToCart({
        id: 1,
        name: "FORGED GLOSSY-OBSIDIAN",
        model: selectedModel,
        price: selectedPrice,
        quantity: 1,
        imageUrl: "air1.JPG",
    });

    updateCartDisplay();
    // Обновляем отображение количества товаров
    updateCartCounter();
        
    // Показываем сообщение "Добавлено в корзину"
    showCartMessage();
});








// Стандартная клавиатура для открытия чата
const keyboard = {
    inline_keyboard: [
        [
            { text: "Открыть чат с оператором", url: "https://t.me/carbonexpert" }
        ]
    ]
};

// Функция для отправки сообщения боту
async function sendTelegramMessage(botToken, chatId, text, replyMarkup = null) {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const data = new URLSearchParams({
        chat_id: chatId,
        text,
    });

    if (replyMarkup) {
        data.append('reply_markup', JSON.stringify(replyMarkup));
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: data.toString(),
        });
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.description || 'Ошибка при отправке сообщения');
        }
        console.log('Сообщение успешно отправлено:', result);
    } catch (error) {
        console.error('Ошибка отправки сообщения:', error);
    }
}

// Функция для отправки инструкции
async function sendInstructionMessage() {
    const instructionMessage = 'Скопируйте ваш заказ ниже и отправьте в чат с оператором';
    const botToken = "7941197919:AAEj5DmatlZnceB6uAQF1aQSZK1rwRkd3dU"; // Желательно переместить в переменные окружения
    const chatId = tg.initDataUnsafe.user.id;
    await sendTelegramMessage(botToken, chatId, instructionMessage);
}

// Функция для отправки сообщения с заказом
async function sendOrderMessage(orderData, deliveryMethod, deliveryPrice, stickerIncluded, totalPrice, keyboard, appliedPromoCode) {
    const botToken = "7941197919:AAEj5DmatlZnceB6uAQF1aQSZK1rwRkd3dU";
    const chatId = tg.initDataUnsafe.user.id;

    // Формируем текст заказа
    let message = orderData.map(item => 
        `Заказ: ${item.name}\nРазмер: ${item.model}\nЦена: ${item.price}₽${item.quantity >= 2 ? `\nКоличество: ${item.quantity}` : ''}`
    ).join('\n\n');

    message += `\n\nДоставка: ${deliveryMethod} - ${deliveryPrice}₽`;
    message += `\nСтикерпак: ${stickerIncluded ? 'да' : 'нет'}`;
    if (appliedPromoCode) {
        message += `\nСкидка: 10% (промокод - ${appliedPromoCode})`;
    }
    message += `\nОбщая цена: ${totalPrice}`;

    console.log("Отправляем сообщение с заказом: ", message);
    await sendTelegramMessage(botToken, chatId, message, keyboard);
}

// Обработка клика по MainButton
tg.MainButton.onClick(async () => {
    try {
        updateTotalPrice();

        const totalPrice = document.getElementById("new-price").textContent;
        const deliveryMethod = getDeliveryMethodName();
        const inputPromoCode = document.getElementById("promo-code").value.trim().toLowerCase();
        let appliedPromoCode = promoApplied && ["must10", "nesnimi26", "димон", "carbon10", "puffplan", "lexus10"].includes(inputPromoCode) ? inputPromoCode : null;

        // Лог для отладки
        console.log('MainButton Clicked! Промокод:', appliedPromoCode, 'Метод доставки:', deliveryMethod, 'Итоговая цена:', totalPrice);

        // Сначала отправляем сообщение с инструкцией, затем сообщение с заказом
        await sendInstructionMessage();
        await sendOrderMessage(cartItems, deliveryMethod, deliveryPrice, stickerIncluded, totalPrice, keyboard, appliedPromoCode);

        tg.close();
    } catch (error) {
        console.error('Ошибка при обработке MainButton:', error);
    }
});











купить2.addEventListener("click", () => {
    document.getElementById("pufferplanet").style.display = "none"
    document.getElementById("formplanet2").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model4").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButtonAir2.textContent = "Выберите размер";

    // Делаем кнопку "pufforder2" неактивной
    pufforder2.pufforderinactive = true;
    pufforder2.classList.add("pufforderinactive");
    
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("pufferplanet").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("formplanet2").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindowAir2.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model4").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButtonAir2.textContent = "Выберите размер";
    };
});

// Обработчик события для кнопки "SIZE"
sizeButtonAir2.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindowAir2.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model4").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindowAir2.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButtonAir2.textContent = `Размер: ${selectedModel}`;
    });
});

model4.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo4[selectedModel];

        // Удаляем границу у всех кнопок
        model4.forEach(btn => {
            btn.classList.remove("selected");
            btn.style.border = "none";
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");
                    
        // Обновляем стиль выбранной кнопки
        model.style.border = "1px solid black";

        pufforder2.pufforderinactive = false;
        pufforder2.classList.remove("pufforderinactive");

        priceElement.textContent = selectedPrice;
        priceElementFormplan2.textContent = selectedPrice;
                    
        selectedModel = model.textContent;
    });
});


// Добавьте обработчик события click для кнопки "Add"
// Добавьте обработчик события click для кнопки "Add"
pufforder2.disabled = false;
pufforder2.addEventListener("click", function (event) {
    event.preventDefault(); // Предотвращаем обновление страницы

    const selectedModel = document.querySelector(".model4.selected").textContent;
    const selectedPrice = parseFloat(modelInfo4[selectedModel].replace(/[^\d]/g, ''));

    addToCart({
        id: 2,
        name: "FORGED GLOSSY-SAPHIR",
        model: selectedModel,
        price: selectedPrice,
        quantity: 1,
        imageUrl: "air2.JPG",
    });

    updateCartDisplay();
    // Обновляем отображение количества товаров
    updateCartCounter();
        
    // Показываем сообщение "Добавлено в корзину"
    showCartMessage();
});


купить3.addEventListener("click", () => {
    document.getElementById("pufferplanet").style.display = "none"
    document.getElementById("formplanet3").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model4").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButtonAir3.textContent = "Выберите размер";

    // Делаем кнопку "pufforder3" неактивной
    pufforder3.pufforderinactive = true;
    pufforder3.classList.add("pufforderinactive");
    
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("pufferplanet").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("formplanet3").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindowAir3.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model4").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButtonAir3.textContent = "Выберите размер";
    };
});

// Обработчик события для кнопки "SIZE"
sizeButtonAir3.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindowAir3.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model4").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindowAir3.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButtonAir3.textContent = `Размер: ${selectedModel}`;
    });
});

model4.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo4[selectedModel];

        // Удаляем границу у всех кнопок
        model4.forEach(btn => {
            btn.classList.remove("selected");
            btn.style.border = "none";
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");
                    
        // Обновляем стиль выбранной кнопки
        model.style.border = "1px solid black";

        pufforder3.pufforderinactive = false;
        pufforder3.classList.remove("pufforderinactive");

        priceElement.textContent = selectedPrice;
        priceElementFormplan3.textContent = selectedPrice;
                    
        selectedModel = model.textContent;
    });
});


// Добавьте обработчик события click для кнопки "Add"
// Добавьте обработчик события click для кнопки "Add"
pufforder3.disabled = false;
pufforder3.addEventListener("click", function (event) {
    event.preventDefault(); // Предотвращаем обновление страницы

    const selectedModel = document.querySelector(".model4.selected").textContent;
    const selectedPrice = parseFloat(modelInfo4[selectedModel].replace(/[^\d]/g, ''));

    addToCart({
        id: 3,
        name: "FORGED GLOSSY-RUBIN",
        model: selectedModel,
        price: selectedPrice,
        quantity: 1,
        imageUrl: "air3.JPG",
    });

    updateCartDisplay();
    // Обновляем отображение количества товаров
    updateCartCounter();
        
    // Показываем сообщение "Добавлено в корзину"
    showCartMessage();
});

купить4.addEventListener("click", () => {
    document.getElementById("pufferplanet").style.display = "none"
    document.getElementById("formplanet4").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model4").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButtonAir4.textContent = "Выберите размер";

    // Делаем кнопку "pufforder3" неактивной
    pufforder4.pufforderinactive = true;
    pufforder4.classList.add("pufforderinactive");
    
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("pufferplanet").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("formplanet4").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindowAir4.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model4").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButtonAir4.textContent = "Выберите размер";
    };
});

// Обработчик события для кнопки "SIZE"
sizeButtonAir4.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindowAir4.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model4").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindowAir4.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButtonAir4.textContent = `Размер: ${selectedModel}`;
    });
});

model4.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo4[selectedModel];

        // Удаляем границу у всех кнопок
        model4.forEach(btn => {
            btn.classList.remove("selected");
            btn.style.border = "none";
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");
                    
        // Обновляем стиль выбранной кнопки
        model.style.border = "1px solid black";

        pufforder4.pufforderinactive = false;
        pufforder4.classList.remove("pufforderinactive");

        priceElement.textContent = selectedPrice;
        priceElementFormplan4.textContent = selectedPrice;
                    
        selectedModel = model.textContent;
    });
});


// Добавьте обработчик события click для кнопки "Add"
pufforder4.disabled = false;
pufforder4.addEventListener("click", function (event) {
    event.preventDefault(); // Предотвращаем обновление страницы

    const selectedModel = document.querySelector(".model4.selected").textContent;
    const selectedPrice = parseFloat(modelInfo4[selectedModel].replace(/[^\d]/g, ''));

    addToCart({
        id: 4,
        name: "FORGED GLOSSY-EMERALD",
        model: selectedModel,
        price: selectedPrice,
        quantity: 1,
        imageUrl: "air4.JPG",
    });

    updateCartDisplay();
    // Обновляем отображение количества товаров
    updateCartCounter();
        
    // Показываем сообщение "Добавлено в корзину"
    showCartMessage();
});

купить5.addEventListener("click", () => {
    document.getElementById("pufferplanet").style.display = "none"
    document.getElementById("formplanet5").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model4").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButtonAir5.textContent = "Выберите размер";

    // Делаем кнопку "pufforder5" неактивной
    pufforder5.pufforderinactive = true;
    pufforder5.classList.add("pufforderinactive");
    
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("pufferplanet").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("formplanet5").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindowAir5.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model4").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButtonAir5.textContent = "Выберите размер";
    };
});

// Обработчик события для кнопки "SIZE"
sizeButtonAir5.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindowAir5.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model4").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindowAir5.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButtonAir5.textContent = `Размер: ${selectedModel}`;
    });
});

model4.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo4[selectedModel];

        // Удаляем границу у всех кнопок
        model4.forEach(btn => {
            btn.classList.remove("selected");
            btn.style.border = "none";
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");
                    
        // Обновляем стиль выбранной кнопки
        model.style.border = "1px solid black";

        pufforder5.pufforderinactive = false;
        pufforder5.classList.remove("pufforderinactive");

        priceElement.textContent = selectedPrice;
        priceElementFormplan5.textContent = selectedPrice;
                    
        selectedModel = model.textContent;
    });
});


// Добавьте обработчик события click для кнопки "Add"
pufforder5.disabled = false;
pufforder5.addEventListener("click", function (event) {
    event.preventDefault(); // Предотвращаем обновление страницы

    const selectedModel = document.querySelector(".model4.selected").textContent;
    const selectedPrice = parseFloat(modelInfo4[selectedModel].replace(/[^\d]/g, ''));

    addToCart({
        id: 5,
        name: "FORGED GLOSSY-GOLD",
        model: selectedModel,
        price: selectedPrice,
        quantity: 1,
        imageUrl: "air5.JPG",
    });

    updateCartDisplay();
    // Обновляем отображение количества товаров
    updateCartCounter();
        
    // Показываем сообщение "Добавлено в корзину"
    showCartMessage();
});

купить6.addEventListener("click", () => {
    document.getElementById("pufferplanet").style.display = "none"
    document.getElementById("formplanet6").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model4").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButtonAir6.textContent = "Выберите размер";

    // Делаем кнопку "pufforder5" неактивной
    pufforder6.pufforderinactive = true;
    pufforder6.classList.add("pufforderinactive");
    
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("pufferplanet").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("formplanet6").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindowAir6.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model4").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButtonAir6.textContent = "Выберите размер";
    };
});

// Обработчик события для кнопки "SIZE"
sizeButtonAir6.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindowAir6.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model4").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindowAir6.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButtonAir6.textContent = `Размер: ${selectedModel}`;
    });
});

model4.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo4[selectedModel];

        // Удаляем границу у всех кнопок
        model4.forEach(btn => {
            btn.classList.remove("selected");
            btn.style.border = "none";
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");
                    
        // Обновляем стиль выбранной кнопки
        model.style.border = "1px solid black";

        pufforder6.pufforderinactive = false;
        pufforder6.classList.remove("pufforderinactive");

        priceElement.textContent = selectedPrice;
        priceElementFormplan6.textContent = selectedPrice;
                    
        selectedModel = model.textContent;
    });
});


// Добавьте обработчик события click для кнопки "Add"
pufforder6.disabled = false;
pufforder6.addEventListener("click", function (event) {
    event.preventDefault(); // Предотвращаем обновление страницы

    const selectedModel = document.querySelector(".model4.selected").textContent;
    const selectedPrice = parseFloat(modelInfo4[selectedModel].replace(/[^\d]/g, ''));

    addToCart({
        id: 6,
        name: "FORGED GLOSSY-AMETHYST",
        model: selectedModel,
        price: selectedPrice,
        quantity: 1,
        imageUrl: "air6.JPG",
    });

    updateCartDisplay();
    // Обновляем отображение количества товаров
    updateCartCounter();
        
    // Показываем сообщение "Добавлено в корзину"
    showCartMessage();
});

купить7.addEventListener("click", () => {
    document.getElementById("pufferplanet").style.display = "none"
    document.getElementById("formplanet7").style.display = "block"
    
    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model4").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButtonAir7.textContent = "Выберите размер";

    // Делаем кнопку "pufforder5" неактивной
    pufforder7.pufforderinactive = true;
    pufforder7.classList.add("pufforderinactive");
    
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("pufferplanet").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("formplanet7").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindowAir7.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model4").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButtonAir7.textContent = "Выберите размер";
    };
});

// Обработчик события для кнопки "SIZE"
sizeButtonAir7.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindowAir7.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model4").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindowAir7.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButtonAir7.textContent = `Размер: ${selectedModel}`;
    });
});

model4.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo4[selectedModel];

        // Удаляем границу у всех кнопок
        model4.forEach(btn => {
            btn.classList.remove("selected");
            btn.style.border = "none";
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");
                    
        // Обновляем стиль выбранной кнопки
        model.style.border = "1px solid black";

        pufforder7.pufforderinactive = false;
        pufforder7.classList.remove("pufforderinactive");

        priceElement.textContent = selectedPrice;
        priceElementFormplan7.textContent = selectedPrice;
                    
        selectedModel = model.textContent;
    });
});


// Добавьте обработчик события click для кнопки "Add"
pufforder7.disabled = false;
pufforder7.addEventListener("click", function (event) {
    event.preventDefault(); // Предотвращаем обновление страницы

    const selectedModel = document.querySelector(".model4.selected").textContent;
    const selectedPrice = parseFloat(modelInfo4[selectedModel].replace(/[^\d]/g, ''));

    addToCart({
        id: 7,
        name: "FORGED MATTE-OBSIDIAN",
        model: selectedModel,
        price: selectedPrice,
        quantity: 1,
        imageUrl: "air7.JPG",
    });

    updateCartDisplay();
    // Обновляем отображение количества товаров
    updateCartCounter();
        
    // Показываем сообщение "Добавлено в корзину"
    showCartMessage();
});

купить8.addEventListener("click", () => {
    document.getElementById("pufferplanet").style.display = "none"
    document.getElementById("formplanet8").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model4").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButtonAir8.textContent = "Выберите размер";

    // Делаем кнопку "pufforder5" неактивной
    pufforder8.pufforderinactive = true;
    pufforder8.classList.add("pufforderinactive");
    
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("pufferplanet").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("formplanet8").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindowAir8.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model4").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButtonAir8.textContent = "Выберите размер";
    };
});

// Обработчик события для кнопки "SIZE"
sizeButtonAir8.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindowAir8.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model4").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindowAir8.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButtonAir8.textContent = `Размер: ${selectedModel}`;
    });
});

model4.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo4[selectedModel];

        // Удаляем границу у всех кнопок
        model4.forEach(btn => {
            btn.classList.remove("selected");
            btn.style.border = "none";
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");
                    
        // Обновляем стиль выбранной кнопки
        model.style.border = "1px solid black";

        pufforder8.pufforderinactive = false;
        pufforder8.classList.remove("pufforderinactive");

        priceElement.textContent = selectedPrice;
        priceElementFormplan8.textContent = selectedPrice;
                    
        selectedModel = model.textContent;
    });
});


// Добавьте обработчик события click для кнопки "Add"
pufforder8.disabled = false;
pufforder8.addEventListener("click", function (event) {
    event.preventDefault(); // Предотвращаем обновление страницы

    const selectedModel = document.querySelector(".model4.selected").textContent;
    const selectedPrice = parseFloat(modelInfo4[selectedModel].replace(/[^\d]/g, ''));

    addToCart({
        id: 8,
        name: "FORGED GLOSSY-CLASSIC",
        model: selectedModel,
        price: selectedPrice,
        quantity: 1,
        imageUrl: "air8.JPG",
    });

    updateCartDisplay();
    // Обновляем отображение количества товаров
    updateCartCounter();
        
    // Показываем сообщение "Добавлено в корзину"
    showCartMessage();
});

купить9.addEventListener("click", () => {
    document.getElementById("pufferplanet").style.display = "none"
    document.getElementById("formplanet9").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model4").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButtonAir9.textContent = "Выберите размер";

    // Делаем кнопку "pufforder5" неактивной
    pufforder9.pufforderinactive = true;
    pufforder9.classList.add("pufforderinactive");
    
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("pufferplanet").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("formplanet9").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindowAir9.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model4").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButtonAir9.textContent = "Выберите размер";
    };
});

// Обработчик события для кнопки "SIZE"
sizeButtonAir9.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindowAir9.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model4").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindowAir9.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButtonAir9.textContent = `Размер: ${selectedModel}`;
    });
});

model4.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo4[selectedModel];

        // Удаляем границу у всех кнопок
        model4.forEach(btn => {
            btn.classList.remove("selected");
            btn.style.border = "none";
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");
                    
        // Обновляем стиль выбранной кнопки
        model.style.border = "1px solid black";

        pufforder9.pufforderinactive = false;
        pufforder9.classList.remove("pufforderinactive");

        priceElement.textContent = selectedPrice;
        priceElementFormplan9.textContent = selectedPrice;
                    
        selectedModel = model.textContent;
    });
});


// Добавьте обработчик события click для кнопки "Add"
pufforder9.disabled = false;
pufforder9.addEventListener("click", function (event) {
    event.preventDefault(); // Предотвращаем обновление страницы

    const selectedModel = document.querySelector(".model4.selected").textContent;
    const selectedPrice = parseFloat(modelInfo4[selectedModel].replace(/[^\d]/g, ''));

    addToCart({
        id: 9,
        name: "FORGED MATTE-CLASSIC",
        model: selectedModel,
        price: selectedPrice,
        quantity: 1,
        imageUrl: "air9.JPG",
    });

    updateCartDisplay();
    // Обновляем отображение количества товаров
    updateCartCounter();
        
    // Показываем сообщение "Добавлено в корзину"
    showCartMessage();
});

































        
//товар1zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn1.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form1").style.display = "block"
    
    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model1").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButton.textContent = "Выберите размер";


    // Делаем кнопку "order1" неактивной
    order1.orderinactive = true;
    order1.classList.add("orderinactive");

    orderozon1.orderinactive = true;
    orderozon1.classList.add("orderozoninactive");

    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("thepuffercase").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("form1").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindow.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model1").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButton.textContent = "Выберите размер";
    };
    


});



// Обработчик события для кнопки "SIZE"
sizeButton.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindow.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model1").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindow.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButton.textContent = `Размер: ${selectedModel}`;
    });
});

var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-icon'), // контейнер для анимации
    renderer: 'svg', // тип рендера (svg, canvas, html)
    loop: true, // зацикливание анимации
    autoplay: true, // автоматическое воспроизведение
    path: 'magsafe.json' // путь к вашему JSON-файлу
});










model1.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo1[selectedModel];

        // Удаляем границу у всех кнопок
        model1.forEach(btn => {
            btn.classList.remove("selected");
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");


        order1.orderinactive = false;
        order1.classList.remove("orderinactive");

        orderozon1.orderinactive = false;
        orderozon1.classList.remove("orderozoninactive");

        priceElement.textContent = selectedPrice;
        priceElementForm1.textContent = selectedPrice;
        
        selectedModel = model.textContent;
    });
});





// Добавьте обработчик события click для кнопки "Add"
order1.disabled = false;
order1.addEventListener("click", (event) => {
    if (!order1.disabled) {
        event.preventDefault();

        // Получаем выбранную модель и цену
        const selectedModel = document.querySelector(".model1.selected").textContent;
        const selectedPrice = parseFloat(modelInfo1[selectedModel].replace(/[^\d]/g, ''));

        // Добавляем товар в корзину
        addToCart({
            id: 11, // Уникальный ID товара
            name: "FORGED GLOSSY-OBSIDIAN",
            model: selectedModel,
            price: selectedPrice,
            quantity: 1,
            imageUrl: "FGB.JPG",
        });
        updateCartDisplay();
        // Обновляем отображение количества товаров
        updateCartCounter();
        
        // Показываем сообщение "Добавлено в корзину"
        showCartMessage();
    }
});

document.getElementById("orderozon1").addEventListener("click", () => {
    const selectedModelElement = document.querySelector(".model1.selected");
    if (selectedModelElement) {
        const selectedModel = selectedModelElement.textContent;
        const ozonLink = ozonLinks1[selectedModel];
        if (ozonLink) {
            window.open(ozonLink, "_blank"); // Открывает в новой вкладке
        } else {
            alert("Ссылка на Ozon для этой модели не найдена.");
        }
    } else {
        alert("Сначала выберите модель iPhone");
    }
});



//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//

//товар2zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn2.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form2").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model1").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButton2.textContent = "Выберите размер";


    // Делаем кнопку "order2" неактивной
    order2.orderinactive = true;
    order2.classList.add("orderinactive");

    orderozon2.orderinactive = true;
    orderozon2.classList.add("orderozoninactive");
    
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("thepuffercase").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("form2").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindow2.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model1").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButton2.textContent = "Выберите размер";
    };
});




// Обработчик события для кнопки "SIZE"
sizeButton2.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindow2.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model1").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindow2.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButton2.textContent = `Размер: ${selectedModel}`;
    });
});
var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-icon2'), // контейнер для анимации
    renderer: 'svg', // тип рендера (svg, canvas, html)
    loop: true, // зацикливание анимации
    autoplay: true, // автоматическое воспроизведение
    path: 'magsafe.json' // путь к вашему JSON-файлу
});

model1.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo1[selectedModel];

        // Удаляем границу у всех кнопок
        model1.forEach(btn => {
            btn.classList.remove("selected");
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");


        order2.orderinactive = false;
        order2.classList.remove("orderinactive");

        orderozon2.orderinactive = false;
        orderozon2.classList.remove("orderozoninactive");

        priceElement.textContent = selectedPrice;
        priceElementForm2.textContent = selectedPrice;
        
        selectedModel = model.textContent;
    });
});




// Добавьте обработчик события click для кнопки "Add"
order2.disabled = false;
order2.addEventListener("click", (event) => {
    if (!order2.disabled) {
        event.preventDefault();

        // Получаем выбранную модель и цену
        const selectedModel = document.querySelector(".model1.selected").textContent;
        const selectedPrice = parseFloat(modelInfo1[selectedModel].replace(/[^\d]/g, ''));

        // Добавляем товар в корзину
        addToCart({
            id: 12, // Уникальный ID товара
            name: "FORGED GLOSSY-SAPHIR",
            model: selectedModel,
            price: selectedPrice,
            quantity: 1,
            imageUrl: "SAPHIR.JPG",
        });
        updateCartDisplay();
        // Обновляем отображение количества товаров
        updateCartCounter();
        
        // Показываем сообщение "Добавлено в корзину"
        showCartMessage();
    }
});

document.getElementById("orderozon2").addEventListener("click", () => {
    const selectedModelElement = document.querySelector(".model1.selected");
    if (selectedModelElement) {
        const selectedModel = selectedModelElement.textContent;
        const ozonLink = ozonLinks2[selectedModel];
        if (ozonLink) {
            window.open(ozonLink, "_blank"); // Открывает в новой вкладке
        } else {
            alert("Ссылка на Ozon для этой модели не найдена.");
        }
    } else {
        alert("Сначала выберите модель iPhone");
    }
});
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//

//товар3zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn3.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form3").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model1").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButton3.textContent = "Выберите размер";


    // Делаем кнопку "order3" неактивной
    order3.orderinactive = true;
    order3.classList.add("orderinactive");

    orderozon3.orderinactive = true;
    orderozon3.classList.add("orderozoninactive");
    
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("thepuffercase").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("form3").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindow3.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model1").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButton3.textContent = "Выберите размер";
    };
});



// Обработчик события для кнопки "SIZE"
sizeButton3.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindow3.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model1").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindow3.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButton3.textContent = `Размер: ${selectedModel}`;
    });
});
var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-icon3'), // контейнер для анимации
    renderer: 'svg', // тип рендера (svg, canvas, html)
    loop: true, // зацикливание анимации
    autoplay: true, // автоматическое воспроизведение
    path: 'magsafe.json' // путь к вашему JSON-файлу
});

model1.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo1[selectedModel];

        // Удаляем границу у всех кнопок
        model1.forEach(btn => {
            btn.classList.remove("selected");
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");


        order3.orderinactive = false;
        order3.classList.remove("orderinactive");

        orderozon3.orderinactive = false;
        orderozon3.classList.remove("orderozoninactive");

        priceElement.textContent = selectedPrice;
        priceElementForm3.textContent = selectedPrice;
        
        selectedModel = model.textContent;
    });
});




// Добавьте обработчик события click для кнопки "Add"
order3.disabled = false;
order3.addEventListener("click", (event) => {
    if (!order3.disabled) {
        event.preventDefault();

        // Получаем выбранную модель и цену
        const selectedModel = document.querySelector(".model1.selected").textContent;
        const selectedPrice = parseFloat(modelInfo1[selectedModel].replace(/[^\d]/g, ''));

        // Добавляем товар в корзину
        addToCart({
            id: 13, // Уникальный ID товара
            name: "FORGED GLOSSY-RUBIN",
            model: selectedModel,
            price: selectedPrice,
            quantity: 1,
            imageUrl: "RUBIN.JPG",
        });
        updateCartDisplay();
        // Обновляем отображение количества товаров
        updateCartCounter();
        
        // Показываем сообщение "Добавлено в корзину"
        showCartMessage();
    }
});

document.getElementById("orderozon3").addEventListener("click", () => {
    const selectedModelElement = document.querySelector(".model1.selected");
    if (selectedModelElement) {
        const selectedModel = selectedModelElement.textContent;
        const ozonLink = ozonLinks3[selectedModel];
        if (ozonLink) {
            window.open(ozonLink, "_blank"); // Открывает в новой вкладке
        } else {
            alert("Ссылка на Ozon для этой модели не найдена.");
        }
    } else {
        alert("Сначала выберите модель iPhone");
    }
});
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//

//товар4zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn4.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form4").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model1").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButton4.textContent = "Выберите размер";


    // Делаем кнопку "order4" неактивной
    order4.orderinactive = true;
    order4.classList.add("orderinactive");

    orderozon4.orderinactive = true;
    orderozon4.classList.add("orderozoninactive");
    
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("thepuffercase").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("form4").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindow4.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model1").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButton4.textContent = "Выберите размер";
    };
});



// Обработчик события для кнопки "SIZE"
sizeButton4.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindow4.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model1").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindow4.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButton4.textContent = `Размер: ${selectedModel}`;
    });
});
var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-icon4'), // контейнер для анимации
    renderer: 'svg', // тип рендера (svg, canvas, html)
    loop: true, // зацикливание анимации
    autoplay: true, // автоматическое воспроизведение
    path: 'magsafe.json' // путь к вашему JSON-файлу
});

model1.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo1[selectedModel];

        // Удаляем границу у всех кнопок
        model1.forEach(btn => {
            btn.classList.remove("selected");
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");


        order4.orderinactive = false;
        order4.classList.remove("orderinactive");

        orderozon4.orderinactive = false;
        orderozon4.classList.remove("orderozoninactive");

        priceElement.textContent = selectedPrice;
        priceElementForm4.textContent = selectedPrice;
        
        selectedModel = model.textContent;
    });
});




// Добавьте обработчик события click для кнопки "Add"
order4.disabled = false;
order4.addEventListener("click", (event) => {
    if (!order4.disabled) {
        event.preventDefault();

        // Получаем выбранную модель и цену
        const selectedModel = document.querySelector(".model1.selected").textContent;
        const selectedPrice = parseFloat(modelInfo1[selectedModel].replace(/[^\d]/g, ''));

        // Добавляем товар в корзину
        addToCart({
            id: 14, // Уникальный ID товара
            name: "FORGED GLOSSY-EMERALD",
            model: selectedModel,
            price: selectedPrice,
            quantity: 1,
            imageUrl: "EMERALD.JPG",
        });
        updateCartDisplay();
        // Обновляем отображение количества товаров
        updateCartCounter();
        
        // Показываем сообщение "Добавлено в корзину"
        showCartMessage();
    }
});

document.getElementById("orderozon4").addEventListener("click", () => {
    const selectedModelElement = document.querySelector(".model1.selected");
    if (selectedModelElement) {
        const selectedModel = selectedModelElement.textContent;
        const ozonLink = ozonLinks4[selectedModel];
        if (ozonLink) {
            window.open(ozonLink, "_blank"); // Открывает в новой вкладке
        } else {
            alert("Ссылка на Ozon для этой модели не найдена.");
        }
    } else {
        alert("Сначала выберите модель iPhone");
    }
});
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//

//товар5zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn5.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form5").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model1").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButton5.textContent = "Выберите размер";


    // Делаем кнопку "order5" неактивной
    order5.orderinactive = true;
    order5.classList.add("orderinactive");

    orderozon5.orderinactive = true;
    orderozon5.classList.add("orderozoninactive");
    
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("thepuffercase").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("form5").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindow5.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model1").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButton5.textContent = "Выберите размер";
    };
});



// Обработчик события для кнопки "SIZE"
sizeButton5.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindow5.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model1").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindow5.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButton5.textContent = `Размер: ${selectedModel}`;
    });
});
var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-icon5'), // контейнер для анимации
    renderer: 'svg', // тип рендера (svg, canvas, html)
    loop: true, // зацикливание анимации
    autoplay: true, // автоматическое воспроизведение
    path: 'magsafe.json' // путь к вашему JSON-файлу
});

model1.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo1[selectedModel];

        // Удаляем границу у всех кнопок
        model1.forEach(btn => {
            btn.classList.remove("selected");
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");


        order5.orderinactive = false;
        order5.classList.remove("orderinactive");

        orderozon5.orderinactive = false;
        orderozon5.classList.remove("orderozoninactive");

        priceElement.textContent = selectedPrice;
        priceElementForm5.textContent = selectedPrice;
        
        selectedModel = model.textContent;
    });
});




// Добавьте обработчик события click для кнопки "Add"
order5.disabled = false;
order5.addEventListener("click", (event) => {
    if (!order5.disabled) {
        event.preventDefault();

        // Получаем выбранную модель и цену
        const selectedModel = document.querySelector(".model1.selected").textContent;
        const selectedPrice = parseFloat(modelInfo1[selectedModel].replace(/[^\d]/g, ''));

        // Добавляем товар в корзину
        addToCart({
            id: 15, // Уникальный ID товара
            name: "FORGED GLOSSY-GOLD",
            model: selectedModel,
            price: selectedPrice,
            quantity: 1,
            imageUrl: "GOLD.JPG",
        });
        updateCartDisplay();
        // Обновляем отображение количества товаров
        updateCartCounter();
        
        // Показываем сообщение "Добавлено в корзину"
        showCartMessage();
    }
});

document.getElementById("orderozon5").addEventListener("click", () => {
    const selectedModelElement = document.querySelector(".model1.selected");
    if (selectedModelElement) {
        const selectedModel = selectedModelElement.textContent;
        const ozonLink = ozonLinks5[selectedModel];
        if (ozonLink) {
            window.open(ozonLink, "_blank"); // Открывает в новой вкладке
        } else {
            alert("Ссылка на Ozon для этой модели не найдена.");
        }
    } else {
        alert("Сначала выберите модель iPhone");
    }
});
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//

//товар6zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn6.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form6").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model1").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButton6.textContent = "Выберите размер";


    // Делаем кнопку "order6" неактивной
    order6.orderinactive = true;
    order6.classList.add("orderinactive");

    orderozon6.orderinactive = true;
    orderozon6.classList.add("orderozoninactive");
    
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("thepuffercase").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("form6").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindow6.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model1").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButton6.textContent = "Выберите размер";
    };
});



// Обработчик события для кнопки "SIZE"
sizeButton6.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindow6.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model1").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindow6.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButton6.textContent = `Размер: ${selectedModel}`;
    });
});
var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-icon6'), // контейнер для анимации
    renderer: 'svg', // тип рендера (svg, canvas, html)
    loop: true, // зацикливание анимации
    autoplay: true, // автоматическое воспроизведение
    path: 'magsafe.json' // путь к вашему JSON-файлу
});

model1.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo1[selectedModel];

        // Удаляем границу у всех кнопок
        model1.forEach(btn => {
            btn.classList.remove("selected");
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");


        order6.orderinactive = false;
        order6.classList.remove("orderinactive");

        orderozon6.orderinactive = false;
        orderozon6.classList.remove("orderozoninactive");

        priceElement.textContent = selectedPrice;
        priceElementForm6.textContent = selectedPrice;
        
        selectedModel = model.textContent;
    });
});




// Добавьте обработчик события click для кнопки "Add"
order6.disabled = false;
order6.addEventListener("click", (event) => {
    if (!order6.disabled) {
        event.preventDefault();

        // Получаем выбранную модель и цену
        const selectedModel = document.querySelector(".model1.selected").textContent;
        const selectedPrice = parseFloat(modelInfo1[selectedModel].replace(/[^\d]/g, ''));

        // Добавляем товар в корзину
        addToCart({
            id: 16, // Уникальный ID товара
            name: "FORGED GLOSSY-AMETHYST",
            model: selectedModel,
            price: selectedPrice,
            quantity: 1,
            imageUrl: "FGAMETH.JPG",
        });
        updateCartDisplay();
        // Обновляем отображение количества товаров
        updateCartCounter();
        
        // Показываем сообщение "Добавлено в корзину"
        showCartMessage();
    }
});

document.getElementById("orderozon6").addEventListener("click", () => {
    const selectedModelElement = document.querySelector(".model1.selected");
    if (selectedModelElement) {
        const selectedModel = selectedModelElement.textContent;
        const ozonLink = ozonLinks6[selectedModel];
        if (ozonLink) {
            window.open(ozonLink, "_blank"); // Открывает в новой вкладке
        } else {
            alert("Ссылка на Ozon для этой модели не найдена.");
        }
    } else {
        alert("Сначала выберите модель iPhone");
    }
});
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//

//товар16zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn16.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form16").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model1").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButton16.textContent = "Выберите размер";


    // Делаем кнопку "order4" неактивной
    order16.orderinactive = true;
    order16.classList.add("orderinactive");

    orderozon16.orderinactive = true;
    orderozon16.classList.add("orderozoninactive");
    
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("thepuffercase").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("form16").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindow16.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model1").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButton16.textContent = "Выберите размер";
    };
});



// Обработчик события для кнопки "SIZE"
sizeButton16.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindow16.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model1").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindow16.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButton16.textContent = `Размер: ${selectedModel}`;
    });
});
var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-icon16'), // контейнер для анимации
    renderer: 'svg', // тип рендера (svg, canvas, html)
    loop: true, // зацикливание анимации
    autoplay: true, // автоматическое воспроизведение
    path: 'magsafe.json' // путь к вашему JSON-файлу
});

model1.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo1[selectedModel];

        // Удаляем границу у всех кнопок
        model1.forEach(btn => {
            btn.classList.remove("selected");
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");


        order16.orderinactive = false;
        order16.classList.remove("orderinactive");

        orderozon16.orderinactive = false;
        orderozon16.classList.remove("orderozoninactive");

        priceElement.textContent = selectedPrice;
        priceElementForm16.textContent = selectedPrice;
        
        selectedModel = model.textContent;
    });
});




// Добавьте обработчик события click для кнопки "Add"
order16.disabled = false;
order16.addEventListener("click", (event) => {
    if (!order16.disabled) {
        event.preventDefault();

        // Получаем выбранную модель и цену
        const selectedModel = document.querySelector(".model1.selected").textContent;
        const selectedPrice = parseFloat(modelInfo1[selectedModel].replace(/[^\d]/g, ''));

        // Добавляем товар в корзину
        addToCart({
            id: 26, // Уникальный ID товара
            name: "FORGED GLOSSY-CLASSIC",
            model: selectedModel,
            price: selectedPrice,
            quantity: 1,
            imageUrl: "fgCLASSIC.JPG",
        });
        updateCartDisplay();
        // Обновляем отображение количества товаров
        updateCartCounter();
        
        // Показываем сообщение "Добавлено в корзину"
        showCartMessage();
    }
});

document.getElementById("orderozon16").addEventListener("click", () => {
    const selectedModelElement = document.querySelector("#form16 .model1.selected");
    if (selectedModelElement) {
        const selectedModel = selectedModelElement.textContent;
        const ozonLink = ozonLinks16[selectedModel];
        if (ozonLink) {
            window.open(ozonLink, "_blank");
        } else {
            alert("Ссылка на Ozon для этой модели не найдена.");
        }
    } else {
        alert("Сначала выберите модель iPhone");
    }
});
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//

//товар17zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn17.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form17").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model1").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButton17.textContent = "Выберите размер";


    // Делаем кнопку "order6" неактивной
    order17.orderinactive = true;
    order17.classList.add("orderinactive");

    orderozon17.orderinactive = true;
    orderozon17.classList.add("orderozoninactive");
    
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("thepuffercase").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("form17").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindow17.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model1").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButton17.textContent = "Выберите размер";
    };
});



// Обработчик события для кнопки "SIZE"
sizeButton17.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindow17.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model1").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindow17.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButton17.textContent = `Размер: ${selectedModel}`;
    });
});
var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-icon6'), // контейнер для анимации
    renderer: 'svg', // тип рендера (svg, canvas, html)
    loop: true, // зацикливание анимации
    autoplay: true, // автоматическое воспроизведение
    path: 'magsafe.json' // путь к вашему JSON-файлу
});

model1.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo1[selectedModel];

        // Удаляем границу у всех кнопок
        model1.forEach(btn => {
            btn.classList.remove("selected");
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");


        order17.orderinactive = false;
        order17.classList.remove("orderinactive");

        orderozon17.orderinactive = false;
        orderozon17.classList.remove("orderozoninactive");

        priceElement.textContent = selectedPrice;
        priceElementForm17.textContent = selectedPrice;
        
        selectedModel = model.textContent;
    });
});




// Добавьте обработчик события click для кнопки "Add"
order17.disabled = false;
order17.addEventListener("click", (event) => {
    if (!order17.disabled) {
        event.preventDefault();

        // Получаем выбранную модель и цену
        const selectedModel = document.querySelector(".model1.selected").textContent;
        const selectedPrice = parseFloat(modelInfo1[selectedModel].replace(/[^\d]/g, ''));

        // Добавляем товар в корзину
        addToCart({
            id: 27, // Уникальный ID товара
            name: "FORGED MATTE-CLASSIC",
            model: selectedModel,
            price: selectedPrice,
            quantity: 1,
            imageUrl: "fMATCLASSIC.JPG",
        });
        updateCartDisplay();
        // Обновляем отображение количества товаров
        updateCartCounter();
        
        // Показываем сообщение "Добавлено в корзину"
        showCartMessage();
    }
});

document.getElementById("orderozon17").addEventListener("click", () => {
    const selectedModelElement = document.querySelector(".model1.selected");
    if (selectedModelElement) {
        const selectedModel = selectedModelElement.textContent;
        const ozonLink = ozonLinks17[selectedModel];
        if (ozonLink) {
            window.open(ozonLink, "_blank"); // Открывает в новой вкладке
        } else {
            alert("Ссылка на Ozon для этой модели не найдена.");
        }
    } else {
        alert("Сначала выберите модель iPhone");
    }
});

//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//

//товар18zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn18.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form18").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model1").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButton18.textContent = "Выберите размер";


    // Делаем кнопку "order2" неактивной
    order18.orderinactive = true;
    order18.classList.add("orderinactive");

    orderozon18.orderinactive = true;
    orderozon18.classList.add("orderozoninactive");
    
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("thepuffercase").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("form18").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindow18.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model1").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButton18.textContent = "Выберите размер";
    };
});




// Обработчик события для кнопки "SIZE"
sizeButton18.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindow18.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model1").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindow18.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButton18.textContent = `Размер: ${selectedModel}`;
    });
});
var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-icon18'), // контейнер для анимации
    renderer: 'svg', // тип рендера (svg, canvas, html)
    loop: true, // зацикливание анимации
    autoplay: true, // автоматическое воспроизведение
    path: 'magsafe.json' // путь к вашему JSON-файлу
});

model1.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo1[selectedModel];

        // Удаляем границу у всех кнопок
        model1.forEach(btn => {
            btn.classList.remove("selected");
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");


        order18.orderinactive = false;
        order18.classList.remove("orderinactive");

        orderozon18.orderinactive = false;
        orderozon18.classList.remove("orderozoninactive");

        priceElement.textContent = selectedPrice;
        priceElementForm18.textContent = selectedPrice;
        
        selectedModel = model.textContent;
    });
});




// Добавьте обработчик события click для кнопки "Add"
order18.disabled = false;
order18.addEventListener("click", (event) => {
    if (!order18.disabled) {
        event.preventDefault();

        // Получаем выбранную модель и цену
        const selectedModel = document.querySelector(".model1.selected").textContent;
        const selectedPrice = parseFloat(modelInfo1[selectedModel].replace(/[^\d]/g, ''));

        // Добавляем товар в корзину
        addToCart({
            id: 28, // Уникальный ID товара
            name: "FORGED MATTE-OBSIDIAN",
            model: selectedModel,
            price: selectedPrice,
            quantity: 1,
            imageUrl: "FMobsidian.JPG",
        });
        updateCartDisplay();
        // Обновляем отображение количества товаров
        updateCartCounter();
        
        // Показываем сообщение "Добавлено в корзину"
        showCartMessage();
    }
});

document.getElementById("orderozon18").addEventListener("click", () => {
    const selectedModelElement = document.querySelector(".model1.selected");
    if (selectedModelElement) {
        const selectedModel = selectedModelElement.textContent;
        const ozonLink = ozonLinks18[selectedModel];
        if (ozonLink) {
            window.open(ozonLink, "_blank"); // Открывает в новой вкладке
        } else {
            alert("Ссылка на Ozon для этой модели не найдена.");
        }
    } else {
        alert("Сначала выберите модель iPhone");
    }
});
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//




//товар9zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn9.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form9").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model1").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButton9.textContent = "Выберите размер";


    // Делаем кнопку "order9" неактивной
    order9.orderinactive = true;
    order9.classList.add("orderinactive");
    
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("thepuffercase").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("form9").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindow9.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model1").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButton9.textContent = "Выберите размер";
    };
});



// Обработчик события для кнопки "SIZE"
sizeButton9.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindow9.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model1").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindow9.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButton9.textContent = `Размер: ${selectedModel}`;
    });
});
var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-icon9'), // контейнер для анимации
    renderer: 'svg', // тип рендера (svg, canvas, html)
    loop: true, // зацикливание анимации
    autoplay: true, // автоматическое воспроизведение
    path: 'magsafe.json' // путь к вашему JSON-файлу
});

model1.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo3[selectedModel];

        // Удаляем границу у всех кнопок
        model1.forEach(btn => {
            btn.classList.remove("selected");
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");


        order9.orderinactive = false;
        order9.classList.remove("orderinactive");

        priceElement.textContent = selectedPrice;
        priceElementForm9.textContent = selectedPrice;
        
        selectedModel = model.textContent;
    });
});




// Добавьте обработчик события click для кнопки "Add"
order9.disabled = false;
order9.addEventListener("click", (event) => {
    if (!order9.disabled) {
        event.preventDefault();

        // Получаем выбранную модель и цену
        const selectedModel = document.querySelector(".model1.selected").textContent;
        const selectedPrice = parseFloat(modelInfo3[selectedModel].replace(/[^\d]/g, ''));

        // Добавляем товар в корзину
        addToCart({
            id: 19, // Уникальный ID товара
            name: "FORGED HYBRID-QUARTZ",
            model: selectedModel,
            price: selectedPrice,
            quantity: 1,
            imageUrl: "QUARTZ.JPG",
        });
        updateCartDisplay();
        // Обновляем отображение количества товаров
        updateCartCounter();
        
        // Показываем сообщение "Добавлено в корзину"
        showCartMessage();
    }
});
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//

//товар10zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn10.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form10").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model1").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButton10.textContent = "Выберите размер";


    // Делаем кнопку "order9" неактивной
    order10.orderinactive = true;
    order10.classList.add("orderinactive");
   
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("thepuffercase").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("form10").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindow10.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model1").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButton10.textContent = "Выберите размер";
    };
});



// Обработчик события для кнопки "SIZE"
sizeButton10.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindow10.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model1").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindow10.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButton10.textContent = `Размер: ${selectedModel}`;
    });
});
var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-icon10'), // контейнер для анимации
    renderer: 'svg', // тип рендера (svg, canvas, html)
    loop: true, // зацикливание анимации
    autoplay: true, // автоматическое воспроизведение
    path: 'magsafe.json' // путь к вашему JSON-файлу
});

model1.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo3[selectedModel];

        // Удаляем границу у всех кнопок
        model1.forEach(btn => {
            btn.classList.remove("selected");
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");


        order10.orderinactive = false;
        order10.classList.remove("orderinactive");

        priceElement.textContent = selectedPrice;
        priceElementForm9.textContent = selectedPrice;
        
        selectedModel = model.textContent;
    });
});




// Добавьте обработчик события click для кнопки "Add"
order10.disabled = false;
order10.addEventListener("click", (event) => {
    if (!order10.disabled) {
        event.preventDefault();

        // Получаем выбранную модель и цену
        const selectedModel = document.querySelector(".model1.selected").textContent;
        const selectedPrice = parseFloat(modelInfo3[selectedModel].replace(/[^\d]/g, ''));

        // Добавляем товар в корзину
        addToCart({
            id: 20, // Уникальный ID товара
            name: "FORGED HYBRID-SILBER",
            model: selectedModel,
            price: selectedPrice,
            quantity: 1,
            imageUrl: "SILBER.JPG",
        });
        updateCartDisplay();
        // Обновляем отображение количества товаров
        updateCartCounter();
        
        // Показываем сообщение "Добавлено в корзину"
        showCartMessage();
    }
});
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//

//товар11zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn11.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form11").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model1").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButton11.textContent = "Выберите размер";


    // Делаем кнопку "order9" неактивной
    order11.orderinactive = true;
    order11.classList.add("orderinactive");
    
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("thepuffercase").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("form11").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindow11.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model1").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButton11.textContent = "Выберите размер";
    };
});



// Обработчик события для кнопки "SIZE"
sizeButton11.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindow11.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model1").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindow11.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButton11.textContent = `Размер: ${selectedModel}`;
    });
});
var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-icon11'), // контейнер для анимации
    renderer: 'svg', // тип рендера (svg, canvas, html)
    loop: true, // зацикливание анимации
    autoplay: true, // автоматическое воспроизведение
    path: 'magsafe.json' // путь к вашему JSON-файлу
});

model1.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo3[selectedModel];

        // Удаляем границу у всех кнопок
        model1.forEach(btn => {
            btn.classList.remove("selected");
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");


        order11.orderinactive = false;
        order11.classList.remove("orderinactive");

        priceElement.textContent = selectedPrice;
        priceElementForm9.textContent = selectedPrice;
        
        selectedModel = model.textContent;
    });
});




// Добавьте обработчик события click для кнопки "Add"
order11.disabled = false;
order11.addEventListener("click", (event) => {
    if (!order11.disabled) {
        event.preventDefault();

        // Получаем выбранную модель и цену
        const selectedModel = document.querySelector(".model1.selected").textContent;
        const selectedPrice = parseFloat(modelInfo3[selectedModel].replace(/[^\d]/g, ''));

        // Добавляем товар в корзину
        addToCart({
            id: 21, // Уникальный ID товара
            name: "FORGED HYBRID-SAPHIR",
            model: selectedModel,
            price: selectedPrice,
            quantity: 1,
            imageUrl: "SAPHIRhybrid.JPG",
        });
        updateCartDisplay();
        // Обновляем отображение количества товаров
        updateCartCounter();
        
        // Показываем сообщение "Добавлено в корзину"
        showCartMessage();
    }
});
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//

//товар12zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn12.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form12").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model1").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButton12.textContent = "Выберите размер";


    // Делаем кнопку "order9" неактивной
    order12.orderinactive = true;
    order12.classList.add("orderinactive");
    
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("thepuffercase").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("form12").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindow12.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model1").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButton12.textContent = "Выберите размер";
    };
});



// Обработчик события для кнопки "SIZE"
sizeButton12.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindow12.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model1").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindow12.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButton12.textContent = `Размер: ${selectedModel}`;
    });
});
var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-icon12'), // контейнер для анимации
    renderer: 'svg', // тип рендера (svg, canvas, html)
    loop: true, // зацикливание анимации
    autoplay: true, // автоматическое воспроизведение
    path: 'magsafe.json' // путь к вашему JSON-файлу
});

model1.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo3[selectedModel];

        // Удаляем границу у всех кнопок
        model1.forEach(btn => {
            btn.classList.remove("selected");
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");


        order12.orderinactive = false;
        order12.classList.remove("orderinactive");

        priceElement.textContent = selectedPrice;
        priceElementForm9.textContent = selectedPrice;
        
        selectedModel = model.textContent;
    });
});




// Добавьте обработчик события click для кнопки "Add"
order12.disabled = false;
order12.addEventListener("click", (event) => {
    if (!order12.disabled) {
        event.preventDefault();

        // Получаем выбранную модель и цену
        const selectedModel = document.querySelector(".model1.selected").textContent;
        const selectedPrice = parseFloat(modelInfo3[selectedModel].replace(/[^\d]/g, ''));

        // Добавляем товар в корзину
        addToCart({
            id: 22, // Уникальный ID товара
            name: "FORGED HYBRID-AMETHYST",
            model: selectedModel,
            price: selectedPrice,
            quantity: 1,
            imageUrl: "AMETHYST.JPG",
        });
        updateCartDisplay();
        // Обновляем отображение количества товаров
        updateCartCounter();
        
        // Показываем сообщение "Добавлено в корзину"
        showCartMessage();
    }
});
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//

//товар13zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn13.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form13").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model1").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButton13.textContent = "Выберите размер";


    // Делаем кнопку "order9" неактивной
    order13.orderinactive = true;
    order13.classList.add("orderinactive");
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("thepuffercase").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("form13").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindow13.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model1").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButton13.textContent = "Выберите размер";
    };
});



// Обработчик события для кнопки "SIZE"
sizeButton13.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindow13.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model1").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindow13.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButton13.textContent = `Размер: ${selectedModel}`;
    });
});
var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-icon13'), // контейнер для анимации
    renderer: 'svg', // тип рендера (svg, canvas, html)
    loop: true, // зацикливание анимации
    autoplay: true, // автоматическое воспроизведение
    path: 'magsafe.json' // путь к вашему JSON-файлу
});

model1.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo3[selectedModel];

        // Удаляем границу у всех кнопок
        model1.forEach(btn => {
            btn.classList.remove("selected");
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");


        order13.orderinactive = false;
        order13.classList.remove("orderinactive");

        priceElement.textContent = selectedPrice;
        priceElementForm9.textContent = selectedPrice;
        
        selectedModel = model.textContent;
    });
});




// Добавьте обработчик события click для кнопки "Add"
order13.disabled = false;
order13.addEventListener("click", (event) => {
    if (!order13.disabled) {
        event.preventDefault();

        // Получаем выбранную модель и цену
        const selectedModel = document.querySelector(".model1.selected").textContent;
        const selectedPrice = parseFloat(modelInfo3[selectedModel].replace(/[^\d]/g, ''));

        // Добавляем товар в корзину
        addToCart({
            id: 23, // Уникальный ID товара
            name: "FORGED HYBRID-RUBIN",
            model: selectedModel,
            price: selectedPrice,
            quantity: 1,
            imageUrl: "RUBINhybrid.JPG",
        });
        updateCartDisplay();
        // Обновляем отображение количества товаров
        updateCartCounter();
        
        // Показываем сообщение "Добавлено в корзину"
        showCartMessage();
    }
});
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//

//товар14zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn14.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form14").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model1").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButton14.textContent = "Выберите размер";


    // Делаем кнопку "order9" неактивной
    order14.orderinactive = true;
    order14.classList.add("orderinactive");
    
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("thepuffercase").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("form14").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindow14.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model1").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButton14.textContent = "Выберите размер";
    };
});



// Обработчик события для кнопки "SIZE"
sizeButton14.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindow14.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model1").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindow14.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButton14.textContent = `Размер: ${selectedModel}`;
    });
});
var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-icon14'), // контейнер для анимации
    renderer: 'svg', // тип рендера (svg, canvas, html)
    loop: true, // зацикливание анимации
    autoplay: true, // автоматическое воспроизведение
    path: 'magsafe.json' // путь к вашему JSON-файлу
});

model1.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo3[selectedModel];

        // Удаляем границу у всех кнопок
        model1.forEach(btn => {
            btn.classList.remove("selected");
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");


        order14.orderinactive = false;
        order14.classList.remove("orderinactive");

        priceElement.textContent = selectedPrice;
        priceElementForm9.textContent = selectedPrice;
        
        selectedModel = model.textContent;
    });
});




// Добавьте обработчик события click для кнопки "Add"
order14.disabled = false;
order14.addEventListener("click", (event) => {
    if (!order14.disabled) {
        event.preventDefault();

        // Получаем выбранную модель и цену
        const selectedModel = document.querySelector(".model1.selected").textContent;
        const selectedPrice = parseFloat(modelInfo3[selectedModel].replace(/[^\d]/g, ''));

        // Добавляем товар в корзину
        addToCart({
            id: 24, // Уникальный ID товара
            name: "FORGED HYBRID-EMERALD",
            model: selectedModel,
            price: selectedPrice,
            quantity: 1,
            imageUrl: "EMERALDhybrid.JPG",
        });
        updateCartDisplay();
        // Обновляем отображение количества товаров
        updateCartCounter();
        
        // Показываем сообщение "Добавлено в корзину"
        showCartMessage();
    }
});
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//

//товар15zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn15.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form15").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model1").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButton15.textContent = "Выберите размер";


    // Делаем кнопку "order9" неактивной
    order15.orderinactive = true;
    order15.classList.add("orderinactive");
    
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("thepuffercase").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("form15").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindow15.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model1").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButton15.textContent = "Выберите размер";
    };
});



// Обработчик события для кнопки "SIZE"
sizeButton15.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindow15.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model1").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindow15.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButton15.textContent = `Размер: ${selectedModel}`;
    });
});
var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-icon15'), // контейнер для анимации
    renderer: 'svg', // тип рендера (svg, canvas, html)
    loop: true, // зацикливание анимации
    autoplay: true, // автоматическое воспроизведение
    path: 'magsafe.json' // путь к вашему JSON-файлу
});

model1.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo3[selectedModel];

        // Удаляем границу у всех кнопок
        model1.forEach(btn => {
            btn.classList.remove("selected");
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");


        order15.orderinactive = false;
        order15.classList.remove("orderinactive");

        priceElement.textContent = selectedPrice;
        priceElementForm9.textContent = selectedPrice;
        
        selectedModel = model.textContent;
    });
});




// Добавьте обработчик события click для кнопки "Add"
order15.disabled = false;
order15.addEventListener("click", (event) => {
    if (!order15.disabled) {
        event.preventDefault();

        // Получаем выбранную модель и цену
        const selectedModel = document.querySelector(".model1.selected").textContent;
        const selectedPrice = parseFloat(modelInfo3[selectedModel].replace(/[^\d]/g, ''));

        // Добавляем товар в корзину
        addToCart({
            id: 25, // Уникальный ID товара
            name: "FORGED HYBRID-GOLD",
            model: selectedModel,
            price: selectedPrice,
            quantity: 1,
            imageUrl: "GOLDhybrid.JPG",
        });
        updateCartDisplay();
        // Обновляем отображение количества товаров
        updateCartCounter();
        
        // Показываем сообщение "Добавлено в корзину"
        showCartMessage();
    }
});
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//

//товар19zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn19.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form19").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model1").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButton19.textContent = "Выберите размер";


    // Делаем кнопку "order4" неактивной
    order19.orderinactive = true;
    order19.classList.add("orderinactive");

    orderozon19.orderinactive = true;
    orderozon19.classList.add("orderozoninactive");
    
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("thepuffercase").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("form19").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindow19.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model1").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButton19.textContent = "Выберите размер";
    };
});



// Обработчик события для кнопки "SIZE"
sizeButton19.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindow19.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model1").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindow19.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButton19.textContent = `Размер: ${selectedModel}`;
    });
});
var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-icon19'), // контейнер для анимации
    renderer: 'svg', // тип рендера (svg, canvas, html)
    loop: true, // зацикливание анимации
    autoplay: true, // автоматическое воспроизведение
    path: 'magsafe.json' // путь к вашему JSON-файлу
});

model1.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo2[selectedModel];

        // Удаляем границу у всех кнопок
        model1.forEach(btn => {
            btn.classList.remove("selected");
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");


        order19.orderinactive = false;
        order19.classList.remove("orderinactive");

        orderozon19.orderinactive = false;
        orderozon19.classList.remove("orderozoninactive");

        priceElement.textContent = selectedPrice;
        priceElementForm19.textContent = selectedPrice;
        
        selectedModel = model.textContent;
    });
});




// Добавьте обработчик события click для кнопки "Add"
order19.disabled = false;
order19.addEventListener("click", (event) => {
    if (!order19.disabled) {
        event.preventDefault();

        // Получаем выбранную модель и цену
        const selectedModel = document.querySelector(".model1.selected").textContent;
        const selectedPrice = parseFloat(modelInfo2[selectedModel].replace(/[^\d]/g, ''));

        // Добавляем товар в корзину
        addToCart({
            id: 29, // Уникальный ID товара
            name: "FORGED SOLID GLOSSY-OBSIDIAN",
            model: selectedModel,
            price: selectedPrice,
            quantity: 1,
            imageUrl: "FSG.JPG",
        });
        updateCartDisplay();
        // Обновляем отображение количества товаров
        updateCartCounter();
        
        // Показываем сообщение "Добавлено в корзину"
        showCartMessage();
    }
});

document.getElementById("orderozon19").addEventListener("click", () => {
    const selectedModelElement = document.querySelector(".model1.selected");
    if (selectedModelElement) {
        const selectedModel = selectedModelElement.textContent;
        const ozonLink = ozonLinks19[selectedModel];
        if (ozonLink) {
            window.open(ozonLink, "_blank"); // Открывает в новой вкладке
        } else {
            alert("Ссылка на Ozon для этой модели не найдена.");
        }
    } else {
        alert("Сначала выберите модель iPhone");
    }
});
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//

//товар20zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn20.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form20").style.display = "block"

    // Удаляем класс 'selected' у всех моделей
    document.querySelectorAll(".model1").forEach(model => {
        model.classList.remove("selected");
        model.style.border = "none";
    });

    // Сбрасываем текст кнопки выбора размера
    sizeButton20.textContent = "Выберите размер";


    // Делаем кнопку "order4" неактивной
    order20.orderinactive = true;
    order20.classList.add("orderinactive");

    orderozon20.orderinactive = true;
    orderozon20.classList.add("orderozoninactive");
    
    // Показываем кнопку "Назад"
    backButton1.style.display = "none";
    backButton2.style.display = "block";

    // Логика для кнопки "Назад", возвращающая на "home"
    backButton2.onclick = () => {
        document.getElementById("thepuffercase").style.display = "block"; // Скрываем "pufferplanet"
        document.getElementById("form20").style.display = "none"; // Показываем "home"
        backButton2.style.display = "none"; // Скрываем кнопку "Назад"
        backButton1.style.display = "block";
        cartMessage.style.display = 'none';

        // Скрываем окно выбора модели
        iphoneModelsWindow20.style.display = "none";
    
        // Удаляем класс 'selected' у всех моделей
        document.querySelectorAll(".model1").forEach(model => {
            model.classList.remove("selected");
            model.style.border = "none";
        });
    
        // Сбрасываем текст кнопки выбора размера
        sizeButton20.textContent = "Выберите размер";
    };
});



// Обработчик события для кнопки "SIZE"
sizeButton20.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем действие по умолчанию (обновление страницы)
    
    // Показываем окно выбора модели iPhone
    iphoneModelsWindow20.style.display = "block";
});

// Добавляем обработчик события на каждую модель iPhone
document.querySelectorAll(".model1").forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault();

        // Сохраняем выбранную модель
        selectedModel = model.textContent;
        
        // Скрываем окно после выбора модели
        iphoneModelsWindow20.style.display = "none";

        // Изменяем текст кнопки "SIZE" на выбранную модель
        sizeButton20.textContent = `Размер: ${selectedModel}`;
    });
});
var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-icon20'), // контейнер для анимации
    renderer: 'svg', // тип рендера (svg, canvas, html)
    loop: true, // зацикливание анимации
    autoplay: true, // автоматическое воспроизведение
    path: 'magsafe.json' // путь к вашему JSON-файлу
});

model1.forEach(model => {
    model.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию (например, переход по ссылке)
                    
        selectedModel = model.textContent;
        selectedPrice = modelInfo2[selectedModel];

        // Удаляем границу у всех кнопок
        model1.forEach(btn => {
            btn.classList.remove("selected");
        });

        // Добавляем класс selected к выбранной кнопке
        model.classList.add("selected");


        order20.orderinactive = false;
        order20.classList.remove("orderinactive");

        orderozon20.orderinactive = false;
        orderozon20.classList.remove("orderozoninactive");

        priceElement.textContent = selectedPrice;
        priceElementForm20.textContent = selectedPrice;
        
        selectedModel = model.textContent;
    });
});




// Добавьте обработчик события click для кнопки "Add"
order20.disabled = false;
order20.addEventListener("click", (event) => {
    if (!order20.disabled) {
        event.preventDefault();

        // Получаем выбранную модель и цену
        const selectedModel = document.querySelector(".model1.selected").textContent;
        const selectedPrice = parseFloat(modelInfo2[selectedModel].replace(/[^\d]/g, ''));

        // Добавляем товар в корзину
        addToCart({
            id: 30, // Уникальный ID товара
            name: "FORGED SOLID MATTE-OBSIDIAN",
            model: selectedModel,
            price: selectedPrice,
            quantity: 1,
            imageUrl: "FSM.JPG",
        });
        updateCartDisplay();
        // Обновляем отображение количества товаров
        updateCartCounter();
        
        // Показываем сообщение "Добавлено в корзину"
        showCartMessage();
    }
});

document.getElementById("orderozon20").addEventListener("click", () => {
    const selectedModelElement = document.querySelector(".model1.selected");
    if (selectedModelElement) {
        const selectedModel = selectedModelElement.textContent;
        const ozonLink = ozonLinks20[selectedModel];
        if (ozonLink) {
            window.open(ozonLink, "_blank"); // Открывает в новой вкладке
        } else {
            alert("Ссылка на Ozon для этой модели не найдена.");
        }
    } else {
        alert("Сначала выберите модель iPhone");
    }
});
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//




























tg.expand();