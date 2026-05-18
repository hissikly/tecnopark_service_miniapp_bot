import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const token = '8725872835:AAFo28eleg_GjzOeDubZNe6qP0VhA7i9pAo';
const bot = new TelegramBot(token, { polling: true });

// URL вашего Web App. Вам нужно заменить её на актуальную ngrok-ссылку!
// По умолчанию берем из .env, или используем заглушку, которую нужно поменять.
const webAppUrl = process.env.WEBAPP_URL || 'https://ВСТАВЬТЕ_ТУТ_ССЫЛКУ_NGROK.ngrok-free.app';

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Добро пожаловать в Технопарк! Нажмите кнопку ниже, чтобы открыть приложение.', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '📱 Открыть приложение', web_app: { url: webAppUrl } }]
      ]
    }
  });
});

console.log('Бот запущен. Отправьте /start в телеграме (ссылка: ' + webAppUrl + ')');
