import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.js';
import serverless from 'serverless-http';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'https://portfolio-opal-nine-93.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use('/api/contact', contactRoutes);

export default serverless(app); // ← important pour Vercel