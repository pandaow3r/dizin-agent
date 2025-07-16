// CORS destekli Mastra Cloud proxy sunucusu
// Gereksinimler: npm install express node-fetch

import express from 'express';
import fetch from 'node-fetch';

const app = express();
const MASRTA_CLOUD_BASE = 'https://numerous-most-caravan-0995b8b7-6668-443d-bff0-f2efd8ae7cb0.mastra.cloud';

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS header'larını ekle
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Tüm /api altı istekleri proxy'le
app.use('/api', async (req, res) => {
  try {
    const targetUrl = MASRTA_CLOUD_BASE + req.originalUrl;
    const headers = { ...req.headers };
    delete headers['host'];
    delete headers['connection'];

    const options = {
      method: req.method,
      headers,
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body),
    };

    const response = await fetch(targetUrl, options);
    const data = await response.text();

    // Orijinal response header'larını ilet
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    res.status(response.status);
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
});

app.listen(3001, () => {
  console.log('CORS proxy listening on http://localhost:3001');
}); 