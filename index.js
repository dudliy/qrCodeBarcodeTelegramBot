require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const QRCode = require('qrcode');
const bwipjs = require('bwip-js');

const token = process.env.BOT_TOKEN;

if (!token) {
    console.error('Ошибка: не задан BOT_TOKEN в файле .env');
    process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const text = `Привет! Я бот, который генерирует QR-коды и штрихкоды EAN13.

Команды:
1) QR-код:
   /qr ТЕКСТ_ИЛИ_ССЫЛКА
   Пример: /qr https://google.com

2) Штрихкод EAN13:
   /ean13 13_ЦИФР
   Пример: /ean13 5901234123457`;
    bot.sendMessage(chatId, text);
});

bot.onText(/\/qr (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const data = match[1].trim();

    if (!data) {
        return bot.sendMessage(chatId, 'Пожалуйста, укажи текст или ссылку после
 команды /qr');
    }
    
    try {
        const buffer = await QRCode.toBuffer(data, {
            type: 'png',
            errorCorrectionLevel: 'H',
            margin: 1,
            scale: 6,
        });

        await bot.sendPhoto(chatId, buffer, { caption: `QR-код для: ${data}` });
    } catch (err) {
        console.error('Ошибка генерации QR-кода:', err);
        bot.sendMessage(chatId, 'Произошла ошибка при генерации QR-кода.');
    }
});

bot.onText(/\/ean13 (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const code = (match[1] || '').replace(/\s+/g, '');

    if (!/^\d{13}$/.test(code)) {
        return bot.sendMessage(
            chatId,
            'Нужно указать ровно 13 цифр для EAN13.\nПример: /ean13 590123412345
7'
        );
    }

    try {
        const png = await bwipjs.toBuffer({
            bcid:        'ean13',
            text:        code,
            scale:       3,
            height:      10,
            includetext: true,
            textxalign:  'center',
        });

       

        await bot.sendPhoto(chatId, png, { caption: `EAN13: ${code}` });
    } catch (err) {
        console.error('Ошибка генерации штрихкода:', err);
        bot.sendMessage(chatId, 'Произошла ошибка при генерации штрихкода EAN13.
');
    }
});

bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});


