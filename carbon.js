let tg = window.Telegram.WebApp;
let sizes = document.querySelectorAll(".size");
let model1 = document.querySelectorAll(".model1");
let model2 = document.querySelectorAll(".model2");
let model3 = document.querySelectorAll(".model3");
let model4 = document.querySelectorAll(".model4");
let modelcompl = document.querySelectorAll(".modelcompl");
let modelcomplair = document.querySelectorAll(".modelcomplair");
let priceElement = document.querySelector(".price");
let form1 = document.getElementById("form1");
let form2 = document.getElementById("form2");
let form3 = document.getElementById("form3");
let form4 = document.getElementById("form4");
let form5 = document.getElementById("form5");
let form6 = document.getElementById("form6");
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let btn4 = document.getElementById("btn4");
let btn5 = document.getElementById("btn5");
let btn6 = document.getElementById("btn6");
let homeContent = document.getElementById("thepuffercase");
let order1 = document.getElementById("order1");
let order2 = document.getElementById("order2");
let order3 = document.getElementById("order3");
let order4 = document.getElementById("order4");
let order5 = document.getElementById("order5");
let order6 = document.getElementById("order6");
let selectedModel = ""; // Для хранения выбранной модели
let selectedRazmer = ""; // Для хранения выбранной модели
let selectedPrice = ""; // Для хранения выбранной цены
let priceElementFormplan1 = document.querySelector(".price1");
let priceElementFormplan2 = document.querySelector(".price2");
let priceElementFormplan3 = document.querySelector(".price3");
let priceElementForm1 = document.querySelector(".price1");
let priceElementForm2 = document.querySelector(".price2");
let priceElementForm3 = document.querySelector(".price3");
let priceElementForm4 = document.querySelector(".price4");
let priceElementForm5 = document.querySelector(".price5");
let priceElementForm6 = document.querySelector(".price6");

document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const video1 = document.getElementById('myVideo');
    const video2 = document.getElementById('myVideo3');
    const videos = [video1, video2];
    let resourcesLoaded = 0;
    const totalResources = videos.length + document.images.length;
    let videosReady = 0;

    // Функция для проверки состояния загрузки ресурсов
    function checkAllResourcesLoaded() {
        resourcesLoaded++;
        console.log(`Загружено ресурсов: ${resourcesLoaded}/${totalResources}`);

        if (resourcesLoaded >= totalResources && videosReady >= videos.length) {
            hideLoadingScreen();
        }
    }

    // Обработка загрузки всех изображений
    for (let i = 0; i < document.images.length; i++) {
        if (document.images[i].complete) {
            checkAllResourcesLoaded();
        } else {
            document.images[i].addEventListener('load', checkAllResourcesLoaded);
            document.images[i].addEventListener('error', checkAllResourcesLoaded); // В случае ошибки также учитываем как загруженное
        }
    }

    // Обработка загрузки каждого видео
    videos.forEach((video) => {
        video.preload = "auto"; // Начать загрузку видео только при старте страницы
        video.onloadeddata = () => {
            videosReady++;
            console.log(`Видео ${video.id} готово к воспроизведению.`);
            checkAllResourcesLoaded();
        };

        video.onerror = () => {
            console.error(`Ошибка загрузки видео: ${video.src}`);
            videosReady++;
            checkAllResourcesLoaded();
        };
    });

    // Таймаут на случай зависания загрузки
    setTimeout(() => {
        if (resourcesLoaded < totalResources || videosReady < videos.length) {
            console.warn('Загрузка заняла слишком много времени. Скрываем загрузочный экран принудительно.');
            hideLoadingScreen();
        }
    }, 10000); // Таймаут в 10 секунд (можно настроить)

    // Функция для скрытия загрузочного экрана и синхронного воспроизведения видео
    function hideLoadingScreen() {
        console.log('Все ресурсы загружены или истек таймаут. Скрываем загрузочный экран.');
        loadingScreen.style.display = 'none'; // Скрыть загрузочный экран

        // Воспроизвести оба видео одновременно
        videos.forEach((video) => {
            video.currentTime = 0; // Установить начальное время на 0, чтобы гарантировать синхронное воспроизведение
            video.play().catch((error) => {
                console.error('Ошибка воспроизведения видео:', error);
            });
        });
    }
});

const backButton = Telegram.WebApp.BackButton;


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



// Создаем инлайн клавиатуру с кнопкой "Открыть чат с оператором"
const keyboard = {
    inline_keyboard: [
        [
            {
                text: "Открыть чат с оператором",
                url: "https://t.me/operpuff",
            }
        ]
    ]
};




const tgoper = document.getElementById("tgoper");
tgoper.addEventListener("click", () => {
    window.open("https://t.me/operpuff", "_blank");
});

const tgkanal = document.getElementById("tgkanal");
tgkanal.addEventListener("click", () => {
    window.open("https://t.me/pufferplanet", "_blank");
});

const tginst = document.getElementById("tginst");
tginst.addEventListener("click", () => {
    window.open("https://www.instagram.com/pufferplanet/", "_blank");
});

const tgoper1 = document.getElementById("tgoper1");
tgoper1.addEventListener("click", () => {
    window.open("https://t.me/operpuff", "_blank");
});

const tgkanal1 = document.getElementById("tgkanal1");
tgkanal1.addEventListener("click", () => {
    window.open("https://t.me/pufferplanet", "_blank");
});

const tginst1 = document.getElementById("tginst1");
tginst1.addEventListener("click", () => {
    window.open("https://www.instagram.com/pufferplanet/", "_blank");
});

const tgoper2 = document.getElementById("tgoper2");
tgoper2.addEventListener("click", () => {
    window.open("https://t.me/operpuff", "_blank");
});

const tgkanal2 = document.getElementById("tgkanal2");
tgkanal2.addEventListener("click", () => {
    window.open("https://t.me/pufferplanet", "_blank");
});

const tginst2 = document.getElementById("tginst2");
tginst2.addEventListener("click", () => {
    window.open("https://www.instagram.com/pufferplanet/", "_blank");
});



const casepuffButton = document.getElementById("casepuff");

casepuffButton.addEventListener("click", () => {
    document.getElementById("home").style.display = "none";
    document.getElementById("thepuffercase").style.display = "block";


});

const pufferplanetButton = document.getElementById("puffplanet");

pufferplanetButton.addEventListener("click", () => {
    document.getElementById("home").style.display = "none";
    document.getElementById("pufferplanet").style.display = "block";

    
});




document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('myVideo');
    var video3 = document.getElementById('myVideo3');
    var secondVideo = document.getElementById('myVideo2');
    var isVideoPlayed = false;

    // Показываем первое видео сразу
    video.style.display = 'block';
    video3.style.display = 'block';

    // Задержка в 1 секунду перед воспроизведением первого видео
    setTimeout(function() {
        // Проверяем, что видео не было воспроизведено ранее
        if (!isVideoPlayed) {
            video.play().then(function() {
                // Видео успешно воспроизведено
                isVideoPlayed = true;
            }).catch(function(error) {
                // Воспроизведение может вызвать ошибку, если видео уже воспроизводится.
                // Игнорируем эту ошибку.
            });
            video3.play().then(function() {
                // Видео успешно воспроизведено
                isVideoPlayed = true;
            }).catch(function(error) {
                // Воспроизведение может вызвать ошибку, если видео уже воспроизводится.
                // Игнорируем эту ошибку.
            });
        }
    }, 1000);

    // Обработчик события при появлении контейнера
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Воспроизводим второе видео, когда контейнер становится видимым
                secondVideo.play().catch(function(error) {
                    // Воспроизведение может вызвать ошибку, если видео уже воспроизводится.
                    // Игнорируем эту ошибку.
                });
            }
        });
    });
    observer.observe(document.getElementById('thepuffercase'));
});









const razmerInfo1 = {
    "S": "2290₽",
    "M": "2290₽",
    "L": "2290₽",
};


const razmerInfo2 = {
    "S": "4990₽",
    "M": "4990₽",
    "L": "4990₽",
    "XL": "4990₽",
};



const razmerInfo3 = {
    "S": "3990₽",
    "M": "3990₽",
    "L": "3990₽",
    "XL": "3990₽",
};


const modelInfo1 = {
    "iPhone 15 Pro Max": "3699₽",
    "iPhone 15 Pro": "3699₽",
    "iPhone 15 Plus": "3699₽",
    "iPhone 15": "3699₽",
    "iPhone 14 Pro Max": "3699₽",
    "iPhone 14 Pro": "3699₽",
    "iPhone 14 Plus": "3699₽",
    "iPhone 14": "3699₽",
    "iPhone 13 Pro Max": "3699₽",
    "iPhone 13 Pro": "3699₽",
    "iPhone 13": "3699₽",
};


const modelInfo2 = {
    "iPhone 14 Pro Max": "1099₽",
    "iPhone 14 Pro": "999₽",
    "iPhone 14 Plus": "1099₽",
    "iPhone 14": "999₽",
    "iPhone 13 Pro Max": "1099₽",
    "iPhone 13 Pro": "999₽",
    "iPhone 13": "999₽",
    "iPhone 12 Pro Max": "1099₽",
    "iPhone 12 Pro": "999₽",
    "iPhone 12": "999₽",
    "iPhone 11 Pro Max": "1099₽",
    "iPhone 11 Pro": "999₽",
    "iPhone 11": "999₽",
    "iPhone Xs Max": "1099₽",
    "iPhone Xr": "999₽",
    "iPhone X/Xs": "999₽",
};


const modelInfo3 = {
    "iPhone 13 Pro Max": "1899₽",
    "iPhone 13 Pro": "1699₽",
    "iPhone 13": "1699₽",
    "iPhone 12 Pro Max": "1899₽",
    "iPhone 12/12 Pro": "1699₽",
    "iPhone 11": "1699₽",
};


const modelInfo4 = {
    "AirPods 1/2": "2299₽",
    "AirPods Pro/Pro(2)": "2299₽",
    "AirPods 3": "2299₽",
};


const modelcomplInfo5 = {
    "iPhone 15 Pro Max": "1890₽",
    "iPhone 15 Pro": "1710₽",
    "iPhone 15 Plus": "1890₽",
    "iPhone 15": "1710₽",
    "iPhone 14 Pro Max": "1890₽",
    "iPhone 14 Pro": "1710₽",
    "iPhone 14 Plus": "1890₽",
    "iPhone 14": "1710₽",
    "iPhone 13 Pro Max": "1890₽",
    "iPhone 13 Pro": "1710₽",
    "iPhone 13": "1710₽",
    "iPhone 13 mini": "1710₽",
    "iPhone 12 Pro Max": "1890₽",
    "iPhone 12/12 Pro": "1710₽",
    "iPhone 12 mini": "1710₽",
    "iPhone 11 Pro Max": "1890₽",
    "iPhone 11 Pro": "1710₽",
    "iPhone 11": "1710₽",
    "iPhone Xs Max": "1710₽",
    "iPhone Xr": "1530₽",
    "iPhone X/Xs": "1530₽",
    "iPhone 8 Plus/7 Plus": "1530₽",
    "iPhone 6/7/8/SE20": "1530₽",
};
const modelcomplairInfo6 = {
    "AirPods 1/2": "899₽",
    "AirPods Pro/Pro(2)": "899₽",
    "AirPods 3": "899₽",
};












const купить1 = document.getElementById("купить1");
const купить2 = document.getElementById("купить2");
const купить3 = document.getElementById("купить3");
const pufforder1 = document.getElementById("pufforder1");
const pufforder2 = document.getElementById("pufforder2");
const pufforder3 = document.getElementById("pufforder3");

// Получаем элементы кнопки "SIZE" и окна выбора моделей iPhone
const sizeButtonAir1 = document.getElementById("sizeButtonAir1");
const sizeButtonAir2 = document.getElementById("sizeButtonAir2");
const sizeButtonAir3 = document.getElementById("sizeButtonAir3");
const sizeButton = document.getElementById("sizeButton");
const sizeButton2 = document.getElementById("sizeButton2");
const sizeButton3 = document.getElementById("sizeButton3");
const sizeButton4 = document.getElementById("sizeButton4");
const sizeButton5 = document.getElementById("sizeButton5");
const sizeButton6 = document.getElementById("sizeButton6");
const iphoneModelsWindowAir1 = document.getElementById("iphoneModelsWindowAir1");
const iphoneModelsWindowAir2 = document.getElementById("iphoneModelsWindowAir2");
const iphoneModelsWindowAir3 = document.getElementById("iphoneModelsWindowAir3");
const iphoneModelsWindow = document.getElementById("iphoneModelsWindow");
const iphoneModelsWindow2 = document.getElementById("iphoneModelsWindow2");
const iphoneModelsWindow3 = document.getElementById("iphoneModelsWindow3");
const iphoneModelsWindow4 = document.getElementById("iphoneModelsWindow4");
const iphoneModelsWindow5 = document.getElementById("iphoneModelsWindow5");
const iphoneModelsWindow6 = document.getElementById("iphoneModelsWindow6");







купить1.addEventListener("click", () => {
    document.getElementById("pufferplanet").style.display = "none"
    document.getElementById("formplanet1").style.display = "block"

    // Делаем кнопку "pufforder1" неактивной
    pufforder1.pufforderinactive = true;
    pufforder1.classList.add("pufforderinactive");
    backButton.show();

    backButton.onClick(() => {
        document.getElementById("pufferplanet").style.display = "block";
        document.getElementById("formplanet1").style.display = "none";
        tg.MainButton.hide();
        backButton.hide();
    });
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


// Добавьте обработчик события click для кнопки "Add"
// Добавьте обработчик события click для кнопки "Add"
pufforder1.disabled = false;
pufforder1.addEventListener("click", (event) => {
    if (!pufforder1.disabled) {
        event.preventDefault();
        
        // Получаем выбранную модель и цену
        const selectedModel = document.querySelector(".model4.selected").textContent;
        const selectedPrice = modelInfo4[selectedModel];

        // Вычисляем общую цену
        const deliveryPrice = "199₽";
        const totalPrice = calculateTotalPrice(selectedPrice, deliveryPrice);
        
        // Обновляем текст и видимость кнопки MainButton
        tg.MainButton.text = "Оплатить через оператора";
        tg.MainButton.show();
        
        // Сохраняем выбранные данные для передачи боту
        const itemName = "FORGED GLOSSY-OBSIDIAN";
        const instructionMessage = 'Скопируйте ваш заказ ниже и отправьте в чат с оператором';
        const message = `
            Заказ: ${itemName}
            Размер: ${selectedModel}
            Цена: ${selectedPrice}
            Доставка: ${deliveryPrice}
            Общая цена: ${totalPrice}
        `;
        
        // Добавьте обработчик для кнопки MainButton
        tg.MainButton.onClick(async () => {
            await sendMessageToBot(instructionMessage);
            await sendMessageToBotWithKeyboard(message, keyboard);
            
            tg.close();
        });
    }   
});

// Функция для вычисления общей цены
function calculateTotalPrice(price1, price2) {
    const price1Numeric = parseInt(price1.replace("₽", "").replace(",", ""));
    const price2Numeric = parseInt(price2.replace("₽", "").replace(",", ""));
    const total = price1Numeric + price2Numeric;
    return total + "₽";
}

async function sendMessageToBot(instructionMessage) {
    const botToken = "7514969997:AAHHKwynx9Zkyy_UOVMeaxUBqYzZFGzpkXE";
    const chatId = tg.initDataUnsafe.user.id;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const data = new URLSearchParams({
        chat_id: chatId,
        text: instructionMessage,
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: data,
        });

        const result = await response.json();
        console.log('Message sent:', result);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Функция для отправки сообщения в бота
async function sendMessageToBotWithKeyboard(message, keyboard) {
    const botToken = "7514969997:AAHHKwynx9Zkyy_UOVMeaxUBqYzZFGzpkXE"; // Замените на ваш токен бота
    const chatId = tg.initDataUnsafe.user.id; // Замените на ваш ID чата
                
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const data = new URLSearchParams({
        chat_id: chatId,
        text: message,
        reply_markup: JSON.stringify(keyboard),
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: data,
        });
                    
        const result = await response.json();
        console.log('Message sent with keyboard:', result);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}




купить2.addEventListener("click", () => {
    document.getElementById("pufferplanet").style.display = "none"
    document.getElementById("formplanet2").style.display = "block"

    // Делаем кнопку "pufforder2" неактивной
    pufforder2.pufforderinactive = true;
    pufforder2.classList.add("pufforderinactive");
    backButton.show();

    backButton.onClick(() => {
        document.getElementById("pufferplanet").style.display = "block";
        document.getElementById("formplanet2").style.display = "none";
        tg.MainButton.hide();
        backButton.hide();
    });
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
pufforder2.addEventListener("click", (event) => {
    if (!pufforder2.disabled) {
        event.preventDefault();
        
        // Получаем выбранную модель и цену
        const selectedModel = document.querySelector(".model4.selected").textContent;
        const selectedPrice = modelInfo4[selectedModel];

        // Вычисляем общую цену
        const deliveryPrice = "199₽";
        const totalPrice = calculateTotalPrice(selectedPrice, deliveryPrice);
        
        // Обновляем текст и видимость кнопки MainButton
        tg.MainButton.text = "Оплатить через оператора";
        tg.MainButton.show();
        
        // Сохраняем выбранные данные для передачи боту
        const itemName = "FORGED GLOSSY-ONYX";
        const instructionMessage = 'Скопируйте ваш заказ ниже и отправьте в чат с оператором';
        const message = `
            Заказ: ${itemName}
            Размер: ${selectedModel}
            Цена: ${selectedPrice}
            Доставка: ${deliveryPrice}
            Общая цена: ${totalPrice}
        `;
        
        // Добавьте обработчик для кнопки MainButton
        tg.MainButton.onClick(async () => {
            await sendMessageToBot(instructionMessage);
            await sendMessageToBotWithKeyboard(message, keyboard);
            
            tg.close();
        });
    }   
});


купить3.addEventListener("click", () => {
    document.getElementById("pufferplanet").style.display = "none"
    document.getElementById("formplanet3").style.display = "block"

    // Делаем кнопку "pufforder3" неактивной
    pufforder3.pufforderinactive = true;
    pufforder3.classList.add("pufforderinactive");
    backButton.show();

    backButton.onClick(() => {
        document.getElementById("pufferplanet").style.display = "block";
        document.getElementById("formplanet3").style.display = "none";
        tg.MainButton.hide();
        backButton.hide();
    });
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
pufforder3.addEventListener("click", (event) => {
    if (!pufforder3.disabled) {
        event.preventDefault();
        
        // Получаем выбранную модель и цену
        const selectedModel = document.querySelector(".model4.selected").textContent;
        const selectedPrice = modelInfo4[selectedModel];

        // Вычисляем общую цену
        const deliveryPrice = "199₽";
        const totalPrice = calculateTotalPrice(selectedPrice, deliveryPrice);
        
        // Обновляем текст и видимость кнопки MainButton
        tg.MainButton.text = "Оплатить через оператора";
        tg.MainButton.show();
        
        // Сохраняем выбранные данные для передачи боту
        const itemName = "FORGED GLOSSY-CLASSIC";
        const instructionMessage = 'Скопируйте ваш заказ ниже и отправьте в чат с оператором';
        const message = `
            Заказ: ${itemName}
            Размер: ${selectedModel}
            Цена: ${selectedPrice}
            Доставка: ${deliveryPrice}
            Общая цена: ${totalPrice}
        `;
        
        // Добавьте обработчик для кнопки MainButton
        tg.MainButton.onClick(async () => {
            await sendMessageToBot(instructionMessage);
            await sendMessageToBotWithKeyboard(message, keyboard);
            
            tg.close();
        });
    }   
});















        
//товар1zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn1.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form1").style.display = "block"


    // Делаем кнопку "order1" неактивной
    order1.orderinactive = true;
    order1.classList.add("orderinactive");
    backButton.show();

    backButton.onClick(() => {
        document.getElementById("thepuffercase").style.display = "block";
        document.getElementById("form1").style.display = "none";
        tg.MainButton.hide();
        backButton.hide();
    });


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
        const selectedPrice = modelInfo1[selectedModel];

        // Вычисляем общую цену
        const deliveryPrice = "199₽";
        const totalPrice = calculateTotalPrice(selectedPrice, deliveryPrice);
        
        // Обновляем текст и видимость кнопки MainButton
        tg.MainButton.text = "Оплатить через оператора";
        tg.MainButton.show();
        
        // Сохраняем выбранные данные для передачи боту
        const itemName = "FORGED GLOSSY-OBSIDIAN-";
        const instructionMessage = 'Скопируйте ваш заказ ниже и отправьте в чат с оператором';
        const message = `
            Заказ: ${itemName}
            Размер: ${selectedModel}
            Цена: ${selectedPrice}
            Доставка: ${deliveryPrice}
            Общая цена: ${totalPrice}
        `;
        // Добавьте обработчик для кнопки MainButton
        tg.MainButton.onClick(async () => {
            await sendMessageToBot(instructionMessage);
            await sendMessageToBotWithKeyboard(message, keyboard);
            
            tg.close();
        });
    }   
});
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//

//товар2zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn2.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form2").style.display = "block"


    // Делаем кнопку "order2" неактивной
    order2.orderinactive = true;
    order2.classList.add("orderinactive");
    backButton.show();

    backButton.onClick(() => {
        document.getElementById("thepuffercase").style.display = "block";
        document.getElementById("form2").style.display = "none";
        tg.MainButton.hide();
        backButton.hide();
    });


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
        const selectedPrice = modelInfo1[selectedModel];

        // Вычисляем общую цену
        const deliveryPrice = "199₽";
        const totalPrice = calculateTotalPrice(selectedPrice, deliveryPrice);
        
        // Обновляем текст и видимость кнопки MainButton
        tg.MainButton.text = "Оплатить через оператора";
        tg.MainButton.show();
        
        // Сохраняем выбранные данные для передачи боту
        const itemName = "FORGED GLOSSY-SAPHIR";
        const instructionMessage = 'Скопируйте ваш заказ ниже и отправьте в чат с оператором';
        const message = `
            Заказ: ${itemName}
            Размер: ${selectedModel}
            Цена: ${selectedPrice}
            Доставка: ${deliveryPrice}
            Общая цена: ${totalPrice}
        `;
        // Добавьте обработчик для кнопки MainButton
        tg.MainButton.onClick(async () => {
            await sendMessageToBot(instructionMessage);
            await sendMessageToBotWithKeyboard(message, keyboard);
            
            tg.close();
        });
    }   
});
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//

//товар3zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn3.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form3").style.display = "block"


    // Делаем кнопку "order3" неактивной
    order3.orderinactive = true;
    order3.classList.add("orderinactive");
    backButton.show();

    backButton.onClick(() => {
        document.getElementById("thepuffercase").style.display = "block";
        document.getElementById("form3").style.display = "none";
        tg.MainButton.hide();
        backButton.hide();
    });


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
        const selectedPrice = modelInfo1[selectedModel];

        // Вычисляем общую цену
        const deliveryPrice = "199₽";
        const totalPrice = calculateTotalPrice(selectedPrice, deliveryPrice);
        
        // Обновляем текст и видимость кнопки MainButton
        tg.MainButton.text = "Оплатить через оператора";
        tg.MainButton.show();
        
        // Сохраняем выбранные данные для передачи боту
        const itemName = "FORGED GLOSSY-RUBIN";
        const instructionMessage = 'Скопируйте ваш заказ ниже и отправьте в чат с оператором';
        const message = `
            Заказ: ${itemName}
            Размер: ${selectedModel}
            Цена: ${selectedPrice}
            Доставка: ${deliveryPrice}
            Общая цена: ${totalPrice}
        `;
        // Добавьте обработчик для кнопки MainButton
        tg.MainButton.onClick(async () => {
            await sendMessageToBot(instructionMessage);
            await sendMessageToBotWithKeyboard(message, keyboard);
            
            tg.close();
        });
    }   
});
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//

//товар4zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn4.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form4").style.display = "block"


    // Делаем кнопку "order4" неактивной
    order4.orderinactive = true;
    order4.classList.add("orderinactive");
    backButton.show();

    backButton.onClick(() => {
        document.getElementById("thepuffercase").style.display = "block";
        document.getElementById("form4").style.display = "none";
        tg.MainButton.hide();
        backButton.hide();
    });


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
        const selectedPrice = modelInfo1[selectedModel];

        // Вычисляем общую цену
        const deliveryPrice = "199₽";
        const totalPrice = calculateTotalPrice(selectedPrice, deliveryPrice);
        
        // Обновляем текст и видимость кнопки MainButton
        tg.MainButton.text = "Оплатить через оператора";
        tg.MainButton.show();
        
        // Сохраняем выбранные данные для передачи боту
        const itemName = "FORGED GLOSSY-EMERALD";
        const instructionMessage = 'Скопируйте ваш заказ ниже и отправьте в чат с оператором';
        const message = `
            Заказ: ${itemName}
            Размер: ${selectedModel}
            Цена: ${selectedPrice}
            Доставка: ${deliveryPrice}
            Общая цена: ${totalPrice}
        `;
        // Добавьте обработчик для кнопки MainButton
        tg.MainButton.onClick(async () => {
            await sendMessageToBot(instructionMessage);
            await sendMessageToBotWithKeyboard(message, keyboard);
            
            tg.close();
        });
    }   
});
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//

//товар3zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn5.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form5").style.display = "block"


    // Делаем кнопку "order5" неактивной
    order5.orderinactive = true;
    order5.classList.add("orderinactive");
    backButton.show();

    backButton.onClick(() => {
        document.getElementById("thepuffercase").style.display = "block";
        document.getElementById("form5").style.display = "none";
        tg.MainButton.hide();
        backButton.hide();
    });


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
        const selectedPrice = modelInfo1[selectedModel];

        // Вычисляем общую цену
        const deliveryPrice = "199₽";
        const totalPrice = calculateTotalPrice(selectedPrice, deliveryPrice);
        
        // Обновляем текст и видимость кнопки MainButton
        tg.MainButton.text = "Оплатить через оператора";
        tg.MainButton.show();
        
        // Сохраняем выбранные данные для передачи боту
        const itemName = "FORGED GLOSSY-GOLD";
        const instructionMessage = 'Скопируйте ваш заказ ниже и отправьте в чат с оператором';
        const message = `
            Заказ: ${itemName}
            Размер: ${selectedModel}
            Цена: ${selectedPrice}
            Доставка: ${deliveryPrice}
            Общая цена: ${totalPrice}
        `;
        // Добавьте обработчик для кнопки MainButton
        tg.MainButton.onClick(async () => {
            await sendMessageToBot(instructionMessage);
            await sendMessageToBotWithKeyboard(message, keyboard);
            
            tg.close();
        });
    }   
});
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//

//товар3zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//
btn6.addEventListener("click", () => {
    document.getElementById("thepuffercase").style.display = "none"
    document.getElementById("form6").style.display = "block"


    // Делаем кнопку "order6" неактивной
    order6.orderinactive = true;
    order6.classList.add("orderinactive");
    backButton.show();

    backButton.onClick(() => {
        document.getElementById("thepuffercase").style.display = "block";
        document.getElementById("form6").style.display = "none";
        tg.MainButton.hide();
        backButton.hide();
    });


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
        const selectedPrice = modelInfo1[selectedModel];

        // Вычисляем общую цену
        const deliveryPrice = "199₽";
        const totalPrice = calculateTotalPrice(selectedPrice, deliveryPrice);
        
        // Обновляем текст и видимость кнопки MainButton
        tg.MainButton.text = "Оплатить через оператора";
        tg.MainButton.show();
        
        // Сохраняем выбранные данные для передачи боту
        const itemName = "FORGED GLOSSY-OPAL";
        const instructionMessage = 'Скопируйте ваш заказ ниже и отправьте в чат с оператором';
        const message = `
            Заказ: ${itemName}
            Размер: ${selectedModel}
            Цена: ${selectedPrice}
            Доставка: ${deliveryPrice}
            Общая цена: ${totalPrice}
        `;
        // Добавьте обработчик для кнопки MainButton
        tg.MainButton.onClick(async () => {
            await sendMessageToBot(instructionMessage);
            await sendMessageToBotWithKeyboard(message, keyboard);
            
            tg.close();
        });
    }   
});
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz//


























tg.expand();