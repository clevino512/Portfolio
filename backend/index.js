import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contact.js';
import serverless from 'serverless-http';

const app = express();

// CORS
app.use(cors({
  origin: 'https://rabenantenaina-clevin.vercel.app',
  methods: ['POST', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// Health check + vérification variables
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

// Routes
app.use('/api/contact', contactRoutes);

// Gestion erreurs globale
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.stack);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

export default serverless(app);