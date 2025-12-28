# qrCodeBarcodeTelegramBot
Simple bot for telegram, qr-code and barcode generator

# Telegram QR и EAN13 Бот

Простой Telegram-бот, который генерирует QR-коды и штрихкоды EAN13 по команде.

## Возможности

- Генерация QR-кода по тексту или ссылке
- Генерация штрихкода EAN13 

## Установка

1. *Клонируйте репозиторий:*
   ```
   git clone https://github.com/dudliy/qrCodeBarcodeTelegramBot.git
   cd qrCodeBarcodeTelegramBot.git
   ```

2. *Установите зависимости:*
   ```
   npm install
   ```

3. *Создайте файл `.env` на основе `.env.example`:*
   ```
   cp .env.example .env
   ```
   Укажите ваш Telegram bot token в файле `.env`:
   ```
   BOT_TOKEN=ваш_токен_бота
   ```

4. *Запустите бота:*
   ```
   npm start
   ```

## Использование

- Для генерации QR-кода:
  ```
  /qr ТЕКСТ_ИЛИ_ССЫЛКА
  Пример: /qr https://google.com
  ```

- Для генерации штрихкода EAN13:
  ```
  /ean13 13_ЦИФР
  Пример: /ean13 5901234123457
  ```
