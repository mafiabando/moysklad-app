# МойСклад App

Веб-приложение для работы с API МойСклад - управление товарами, продажами и приёмками.

## Функции

- 📋 Просмотр товаров с остатками
- 👥 Управление контрагентами
- 💰 Создание отгрузок (продаж)
- 📦 Создание приёмок товара
- 📱 Telegram уведомления
- 📱 PWA поддержка (установка на телефон)

## Локальный запуск

```bash
# Установка зависимостей
npm install

# Запуск сервера
npm start
```

Приложение будет доступно по адресу: http://localhost:3001

## Настройка

1. Перейдите в раздел "Настройки"
2. Введите логин и пароль от МойСклад
3. Нажмите "Сохранить настройки"

## Telegram уведомления

Для работы Telegram уведомлений установите переменные окружения:
- `TELEGRAM_BOT_TOKEN` - токен вашего бота
- `TELEGRAM_CHAT_ID` - ID чата для уведомлений

## Деплой

Проект готов для деплоя на:
- Render
- Railway
- Vercel
- Heroku

### Переменные окружения для деплоя:
- `PORT` - порт сервера (автоматически)
- `TELEGRAM_BOT_TOKEN` - токен Telegram бота
- `TELEGRAM_CHAT_ID` - ID чата для уведомлений

## Технологии

- Node.js + Express
- Vanilla JavaScript
- PWA (Progressive Web App)
- МойСклад API
- Telegram Bot API

## 📱 Возможности приложения

### Основные модули:
- **Товары** - управление базой товаров
- **Контрагенты** - работа с клиентами и поставщиками
- **Отгрузки** - создание и управление продажами
- **Приемки** - поступление и оприходование товаров
- **Настройки** - подключение к API МойСклад

### Функции:
- ✅ Подключение к базе товаров МойСклад
- ✅ Создание отгрузок (продаж)
- ✅ Создание приёмок товара
- ✅ Выбор контрагентов в приёмках и отгрузках
- ✅ Установка пользовательских цен
- ✅ Безопасное хранение настроек подключения
- ✅ Поиск по товарам и контрагентам

## 🛠 Технический стек

- **React Native** - фреймворк для разработки мобильных приложений
- **Expo** - платформа для React Native разработки
- **TypeScript** - типизированный JavaScript
- **Expo Router** - файловая система роутинга
- **Axios** - HTTP клиент для API запросов
- **AsyncStorage** - локальное хранилище
- **Expo Vector Icons** - иконки

## 📋 API МойСклад

### Документация API
Официальная документация: https://dev.moysklad.ru/doc/api/remap/1.2/

### Основные эндпоинты:

#### Товары (`/entity/product`)
- `GET /entity/product` - получить список товаров
- `POST /entity/product` - создать товар
- `PUT /entity/product/{id}` - обновить товар
- `DELETE /entity/product/{id}` - удалить товар

#### Контрагенты (`/entity/counterparty`)
- `GET /entity/counterparty` - получить список контрагентов
- `POST /entity/counterparty` - создать контрагента
- `PUT /entity/counterparty/{id}` - обновить контрагента

#### Отгрузки (`/entity/demand`)
- `GET /entity/demand` - получить список отгрузок
- `POST /entity/demand` - создать отгрузку
- `PUT /entity/demand/{id}` - обновить отгрузку
- `GET /entity/demand/{id}/positions` - получить позиции отгрузки
- `POST /entity/demand/{id}/positions` - добавить позицию в отгрузку

#### Приемки (`/entity/supply`)
- `GET /entity/supply` - получить список приемок
- `POST /entity/supply` - создать приемку
- `PUT /entity/supply/{id}` - обновить приемку
- `GET /entity/supply/{id}/positions` - получить позиции приемки
- `POST /entity/supply/{id}/positions` - добавить позицию в приемку

#### Организации (`/entity/organization`)
- `GET /entity/organization` - получить список организаций

#### Склады (`/entity/store`)
- `GET /entity/store` - получить список складов

### Аутентификация
API использует Basic Authentication:
- Заголовок: `Authorization: Basic <base64(login:password)>`
- Обязательные заголовки:
  - `Content-Type: application/json`
  - `Accept-Encoding: gzip`

### Лимиты и ограничения
- Не более 45 запросов за 3 секундный период
- Не более 5 параллельных запросов от одного пользователя
- Не более 20 параллельных запросов от аккаунта
- Максимум 1000 элементов в одном массиве запроса

## 🚀 Установка и запуск

### Предварительные требования
- Node.js (версия 16 или выше)
- npm или yarn
- Expo CLI
- Android Studio (для Android) или Xcode (для iOS)

### Установка зависимостей
```bash
npm install
# или
yarn install
```

### Запуск приложения
```bash
# Запуск в режиме разработки
npm start

# Запуск на Android
npm run android

# Запуск на iOS  
npm run ios

# Запуск в веб-браузере
npm run web
```

## 📁 Структура проекта

```
moysklad-app/
├── app/                          # Экраны приложения (Expo Router)
│   ├── _layout.tsx              # Корневой layout
│   ├── index.tsx                # Главный экран
│   └── settings.tsx             # Экран настроек
├── src/
│   ├── components/              # React Native компоненты
│   │   ├── ProductCard.tsx      # Карточка товара
│   │   ├── CounterpartyCard.tsx # Карточка контрагента
│   │   └── DocumentCard.tsx     # Карточка документа
│   ├── services/               # API сервисы
│   │   └── apiService.ts       # Основной сервис для работы с API
│   ├── types/                  # TypeScript типы
│   │   └── api.ts              # Типы для API
│   ├── screens/                # Экраны приложения
│   │   ├── ProductsScreen.tsx   # Экран товаров
│   │   ├── CounterpartiesScreen.tsx # Экран контрагентов
│   │   ├── SalesScreen.tsx      # Экран отгрузок
│   │   └── PurchasesScreen.tsx  # Экран приемок
│   ├── navigation/             # Навигация
│   └── utils/                  # Утилиты и хелперы
├── assets/                     # Ресурсы (изображения, шрифты)
├── package.json
├── app.json                    # Конфигурация Expo
├── tsconfig.json              # Конфигурация TypeScript
└── README.md
```

## ⚙️ Настройка подключения

### Получение доступа к API МойСклад

1. Войдите в ваш аккаунт МойСклад
2. Перейдите в **Настройки → Пользователи и права**
3. Создайте нового пользователя или выберите существующего
4. Включите опцию **"Доступ к API"**
5. Используйте логин и пароль этого пользователя в приложении

### Настройка в приложении

1. Откройте приложение
2. Перейдите в **Настройки** 
3. Введите данные:
   - **URL API**: `https://api.moysklad.ru/api/remap/1.2`
   - **Логин**: логин пользователя МойСклад
   - **Пароль**: пароль пользователя МойСклад
4. Нажмите **"Проверить подключение"**
5. При успешном подключении нажмите **"Сохранить настройки"**

## 🔧 Разработка

### Типы данных

Все основные типы для работы с API определены в `src/types/api.ts`:

- `Product` - товар
- `Counterparty` - контрагент  
- `Demand` - отгрузка (продажа)
- `Supply` - приемка
- `Organization` - организация
- `Store` - склад

### API Сервис

Основной сервис `apiService` содержит методы для:

- Инициализации подключения
- Работы с товарами
- Работы с контрагентами
- Создания отгрузок и приемок
- Поиска данных

### Добавление новых экранов

1. Создайте новый файл в папке `app/`
2. Добавьте маршрут в `_layout.tsx`
3. Реализуйте компонент экрана
4. Подключите необходимые API методы

## 🧪 Тестирование

### Проверка API подключения
```bash
# Проверить доступность API
curl -u "login:password" \
  -H "Accept-Encoding: gzip" \
  -H "Content-Type: application/json" \
  https://api.moysklad.ru/api/remap/1.2/entity/organization
```

### Основные сценарии тестирования

1. **Подключение к API**
   - Корректные данные авторизации
   - Некорректные данные
   - Проблемы с сетью

2. **Работа с товарами**
   - Загрузка списка товаров
   - Поиск товаров
   - Создание нового товара

3. **Создание документов**
   - Создание отгрузки с позициями
   - Создание приемки с позициями
   - Выбор контрагентов

## 📖 API Примеры

### Создание отгрузки
```typescript
const demand = await apiService.createDemand({
  name: "Отгрузка №001",
  organization: { meta: organizationMeta },
  agent: { meta: counterpartyMeta },
  store: { meta: storeMeta },
  positions: [
    {
      quantity: 2,
      price: 15000,
      assortment: { meta: productMeta }
    }
  ]
});
```

### Создание приемки
```typescript
const supply = await apiService.createSupply({
  name: "Приемка №001", 
  organization: { meta: organizationMeta },
  agent: { meta: supplierMeta },
  store: { meta: storeMeta },
  positions: [
    {
      quantity: 10,
      price: 12000,
      assortment: { meta: productMeta }
    }
  ]
});
```

### Поиск товаров
```typescript
const products = await apiService.getProducts({
  search: "iPhone",
  limit: 20
});
```

## 🔒 Безопасность

- Данные авторизации хранятся в AsyncStorage (зашифрованное хранилище)
- Все API запросы используют HTTPS
- Пароли не отображаются в интерфейсе
- Реализована проверка подключения перед сохранением

## 📞 Поддержка

- **Документация API**: https://dev.moysklad.ru/
- **Сообщество разработчиков**: https://t.me/+Pv89ztN_249kYjRi
- **Техподдержка МойСклад**: vendor.support@moysklad.ru

## 📄 Лицензия

MIT License

## 🤝 Участие в разработке

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/new-feature`)
3. Внесите изменения и создайте коммит (`git commit -am 'Add new feature'`)
4. Отправьте ветку в репозиторий (`git push origin feature/new-feature`)
5. Создайте Pull Request

---

**Версия**: 1.0.0  
**Дата обновления**: 28 октября 2025 г.