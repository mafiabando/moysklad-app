const express = require('express');
const cors = require('cors');
const https = require('https');
const http = require('http');
const path = require('path');
const { URL } = require('url');

const app = express();
const PORT = process.env.PORT || 3001;

// Настройки Telegram бота
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Включаем CORS для всех запросов
app.use(cors());
app.use(express.json());

// Статические файлы из папки web
app.use(express.static(path.join(__dirname, 'web')));

// Главная страница
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'app.html'));
});

// Обработчик для получения chat_id (временный)
app.get('/api/telegram/getchatid', async (req, res) => {
  try {
    const updatesUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`;
    
    const response = await new Promise((resolve, reject) => {
      https.get(updatesUrl, (apiRes) => {
        let data = '';
        apiRes.on('data', chunk => data += chunk);
        apiRes.on('end', () => resolve(JSON.parse(data)));
        apiRes.on('error', reject);
      });
    });
    
    if (response.ok && response.result.length > 0) {
      const chatIds = response.result.map(update => ({
        chat_id: update.message?.chat?.id,
        username: update.message?.from?.username,
        first_name: update.message?.from?.first_name,
        message: update.message?.text
      })).filter(item => item.chat_id);
      
      res.json({ success: true, chats: chatIds });
    } else {
      res.json({ success: false, message: 'Нет сообщений. Отправьте сообщение боту сначала.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ошибка получения chat_id', details: error.message });
  }
});

// Обработчик для отправки сообщений в Telegram
app.post('/api/telegram/send', (req, res) => {
  const { message } = req.body;
  
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Valid message is required' });
  }
  
  // Проверяем настройки
  if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN') {
    return res.status(200).json({ message: 'Telegram not configured' });
  }
  
  if (!TELEGRAM_CHAT_ID || TELEGRAM_CHAT_ID === 'YOUR_CHAT_ID') {
    return res.status(500).json({ error: 'Telegram chat_id not configured' });
  }
  
  // Очищаем сообщение только от управляющих символов, но сохраняем переносы строк
  const cleanMessage = message.trim().replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '');
  
  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const data = JSON.stringify({
    chat_id: parseInt(TELEGRAM_CHAT_ID),
    text: cleanMessage
  });
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data, 'utf8')
    }
  };
  
  const telegramReq = https.request(telegramUrl, options, (telegramRes) => {
    let responseData = '';
    
    telegramRes.on('data', (chunk) => {
      responseData += chunk;
    });
    
    telegramRes.on('end', () => {
      if (telegramRes.statusCode === 200) {
        res.json({ success: true, message: 'Message sent to Telegram' });
      } else {
        res.status(500).json({ error: 'Failed to send message to Telegram' });
      }
    });
  });
  
  telegramReq.on('error', (err) => {
    res.status(500).json({ error: 'Error sending message to Telegram' });
  });
  
  telegramReq.write(data);
  telegramReq.end();
});

// Прокси для МойСклад API (исключаем Telegram endpoints)
app.use('/api', async (req, res, next) => {
  // Пропускаем Telegram запросы к общему прокси
  if (req.path.startsWith('/telegram/')) {
    return next();
  }
  
  try {
    const moySkladUrl = 'https://api.moysklad.ru/api/remap/1.2' + req.url;
    const urlObj = new URL(moySkladUrl);
    
    const headers = {
      'User-Agent': 'curl/7.68.0',
      'Accept': 'application/json;charset=utf-8',
      'Accept-Encoding': 'gzip'
    };
    
    // Добавляем авторизацию если есть
    if (req.headers.authorization) {
      headers['Authorization'] = req.headers.authorization;
    }
    
    // Content-Type только для POST/PUT запросов с телом
    const requestData = req.body ? JSON.stringify(req.body) : null;
    if (requestData && (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH')) {
      headers['Content-Type'] = 'application/json';
      headers['Content-Length'] = Buffer.byteLength(requestData);
    }
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname + urlObj.search,
      method: req.method,
      headers: headers
    };

    const proxyReq = https.request(options, (proxyRes) => {
      res.status(proxyRes.statusCode || 500);
      
      // Копируем заголовки ответа (кроме CORS)
      Object.keys(proxyRes.headers).forEach(key => {
        if (!key.toLowerCase().startsWith('access-control')) {
          res.set(key, proxyRes.headers[key]);
        }
      });
      
      // Перенаправляем тело ответа
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (error) => {
      res.status(500).json({ error: 'Ошибка прокси сервера: ' + error.message });
    });

    // Отправляем данные запроса если есть
    if (requestData) {
      proxyReq.write(requestData);
    }
    
    proxyReq.end();
    
  } catch (error) {
    res.status(500).json({ error: 'Ошибка прокси сервера: ' + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  
  if (TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN') {
    console.log('⚠️  Telegram уведомления не настроены');
  } else {
    console.log('📱 Telegram уведомления активны');
  }
});