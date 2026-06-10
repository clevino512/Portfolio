import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contact.js';
import serverless from 'serverless-http';

const app = express();

app.use(express.json({ limit: '10kb' }));

const corsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.status(200).json({
    status: '✅ Backend running',
    env: {
      MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS ? '✅' : '❌ manquant',
      RESEND_API_KEY:    process.env.RESEND_API_KEY    ? '✅' : '❌ manquant',
    }
  });
});

app.use('/api/contact', contactRoutes);

app.use((err, req, res, next) => {
  console.error('[ERROR]', err.stack);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

const serverlessHandler = serverless(app, { requestBodyLimit: '10mb' });

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
}

export default serverlessHandler;