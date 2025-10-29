# Инструкция по деплою МойСклад App

## 🚀 Деплой на Render (рекомендуется)

### Шаг 1: Подготовка GitHub репозитория

```bash
# Инициализируем git (если еще не сделано)
git init
git add .
git commit -m "Подготовка к деплою"

# Создайте репозиторий на GitHub и пушьте код
git remote add origin https://github.com/ваш-username/moysklad-app.git
git branch -M main
git push -u origin main
```

### Шаг 2: Деплой на Render

1. Зайдите на https://render.com
2. Зарегистрируйтесь через GitHub
3. Нажмите "New" → "Web Service"
4. Подключите ваш GitHub репозиторий `moysklad-app`
5. Заполните настройки:
   - **Name**: `moysklad-app` (или любое другое)
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Шаг 3: Переменные окружения

В разделе "Environment Variables" добавьте:
- `TELEGRAM_BOT_TOKEN`: `8276593755:AAErp_L3c6glsiJmovdc8i1aON5aasIfMI0`
- `TELEGRAM_CHAT_ID`: `616956857`

### Шаг 4: Деплой
Нажмите "Deploy Web Service" и дождитесь завершения.

---

## 🌐 Альтернативные платформы

### Railway
1. Зайдите на https://railway.app
2. Подключите GitHub репозиторий
3. Добавьте переменные окружения
4. Автоматический деплой готов

### Vercel + Railway
- **Vercel**: для статических файлов (frontend)
- **Railway**: для Node.js сервера (backend)

---

## 📱 После деплоя

1. **Получите URL**: например `https://moysklad-app.onrender.com`
2. **Протестируйте**: откройте URL в браузере
3. **Установите на телефон**: 
   - Android: Chrome → Меню → "Добавить на домашний экран"
   - iOS: Safari → Поделиться → "На экран «Домой»"

---

## 🔧 Настройка после деплоя

1. Откройте приложение по URL
2. Перейдите в "Настройки"
3. Введите логин/пароль МойСклад
4. Сохраните настройки
5. Протестируйте создание отгрузки с Telegram уведомлением

---

## ✅ Готово!

Ваше приложение теперь доступно:
- 🌐 Веб-версия по URL
- 📱 Мобильная версия через установку PWA
- 📧 Telegram уведомления работают
- 💾 Настройки сохраняются в браузере