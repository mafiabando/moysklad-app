const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 3001;

// Статические файлы из папки web
app.use(express.static(path.join(__dirname, 'web')));

// Простой прокси для МойСклад API
const apiProxy = createProxyMiddleware({
  target: 'https://api.moysklad.ru',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api/remap/1.2', // переписываем путь
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Proxying: ${req.method} ${req.url} -> ${proxyReq.path}`);
    
    // Убираем лишние заголовки
    proxyReq.removeHeader('origin');
    proxyReq.removeHeader('referer');
    
    // Устанавливаем правильный User-Agent
    proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (compatible; MoySkald-App)');
  },
  onError: (err, req, res) => {
    console.error('Proxy Error:', err);
    res.status(500).json({ error: 'Proxy Error: ' + err.message });
  },
  logLevel: 'debug'
});

app.use('/api', apiProxy);

// Основной маршрут
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'app.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
  console.log(`API прокси доступен на http://localhost:${PORT}/api/*`);
});