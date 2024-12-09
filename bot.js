const TelegramBot = require('node-telegram-bot-api');

// Указываем токен бота
const token = '7514969997:AAHHKwynx9Zkyy_UOVMeaxUBqYzZFGzpkXE';

// Создаем бота с режимом long polling
const bot = new TelegramBot(token, { polling: true });

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Новый текст для отправки пользователю
  const text = `Привет! Это наш мини-сайт, встроенный в бота. Нажав на кнопку, ты откроешь окно с полным ассортиментом наших чехлов. Здесь ты сможешь выбрать модель, подходящую именно для твоего iPhone.

Важно: оплата и оформление доставки происходят через нашего оператора в личных сообщениях — @carbonexpert. Мини-сайт служит только для выбора чехла и предварительного ознакомления.

Чтобы открыть сайт, нажми на кнопку «Open» внизу слева.`;

  // Отправляем сообщение с новым текстом
  bot.sendMessage(chatId, text);
});