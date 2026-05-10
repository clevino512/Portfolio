import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.js';
import serverless from 'serverless-http';

dotenv.config();

const app = express();

// Configuration CORS plus robuste pour Vercel
app.use(cors({
  origin: 'https://rabenantenaina-clevin.vercel.app',
  methods: ['POST', 'OPTIONS'],
  credentials: true
}));

// Route de base pour éviter les timeouts 504 sur "/"
app.get('/', (req, res) => {
  res.status(200).send("Backend Portfolio is running...");
});

app.use(express.json());

// Tes routes
app.use('/api/contact', contactRoutes);

// Gestion d'erreur globale pour attraper les crashs silencieux
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

export default serverless(app);