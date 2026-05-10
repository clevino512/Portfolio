import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contact.js';
import serverless from 'serverless-http';

const app = express();

app.use(cors({
  origin: 'https://rabenantenaina-clevin.vercel.app',
  methods: ['POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Gestion explicite des OPTIONS pour les requêtes preflight
app.options('*', cors({
  origin: 'https://rabenantenaina-clevin.vercel.app',
  methods: ['POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Fix BadRequestError
app.use((req, res, next) => {
  express.json({ limit: '10kb' })(req, res, (err) => {
    if (err) return res.status(400).json({ error: 'Invalid JSON', details: err.message });
    next();
  });
});

app.get('/', (req, res) => {
  res.status(200).json({
    status: '✅ Backend running',
    env: {
      MAIL_HOST:         process.env.MAIL_HOST         ? '✅' : '❌ manquant',
      MAIL_PORT:         process.env.MAIL_PORT         ? '✅' : '❌ manquant',
      MAIL_USERNAME:     process.env.MAIL_USERNAME     ? '✅' : '❌ manquant',
      MAIL_PASSWORD:     process.env.MAIL_PASSWORD     ? '✅' : '❌ manquant',
      MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS ? '✅' : '❌ manquant',
    }
  });
});

app.use('/api/contact', contactRoutes);

app.use((err, req, res, next) => {
  console.error('[ERROR]', err.stack);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

// ✅ Fix : requestBodyLimit désactivé pour éviter double lecture
export default serverless(app, { requestBodyLimit: '10mb' });