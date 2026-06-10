import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, '../data/testimonials.json');

const COLORS = [
  'from-primary-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-violet-500 to-purple-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-sky-500 to-blue-600',
  'from-fuchsia-500 to-pink-600',
  'from-lime-500 to-green-600',
];

const readData = async () => {
  try {
    const raw = await readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const writeData = async (data) => {
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
};

const getInitials = (name) => {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
};

export const getAllTestimonials = async (req, res) => {
  try {
    const data = await readData();
    const approved = data.filter((t) => t.status === 'approved');
    res.status(200).json(approved);
  } catch (error) {
    console.error('[Testimonials GET]', error);
    res.status(500).json({ error: 'Erreur lors de la récupération.' });
  }
};

export const createTestimonial = async (req, res) => {
  const { name, role, company, text, rating, relation } = req.body;

  if (!name?.trim() || !role?.trim() || !text?.trim() || !rating) {
    return res.status(400).json({ error: 'Champs requis manquants (nom, rôle, texte, note).' });
  }

  if (text.trim().length < 30) {
    return res.status(400).json({ error: 'Le témoignage doit contenir au moins 30 caractères.' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'La note doit être entre 1 et 5.' });
  }

  try {
    const data = await readData();

    const colorIdx = data.length % COLORS.length;
    const newTestimonial = {
      id: randomUUID(),
      name: name.trim(),
      role: role.trim(),
      company: company?.trim() || '',
      avatar: getInitials(name.trim()),
      color: COLORS[colorIdx],
      text: text.trim(),
      rating: Number(rating),
      relation: relation?.trim() || 'Client',
      submittedAt: new Date().toISOString(),
      status: 'approved',
    };

    data.push(newTestimonial);
    await writeData(data);

    res.status(201).json({ success: true, testimonial: newTestimonial });
  } catch (error) {
    console.error('[Testimonials POST]', error);
    res.status(500).json({ error: "Erreur lors de l'enregistrement." });
  }
};

export const deleteTestimonial = async (req, res) => {
  const { id } = req.params;
  const adminKey = req.headers['x-admin-key'];
  const expectedKey = process.env.ADMIN_KEY || 'RC_admin_2026';

  if (!adminKey || adminKey !== expectedKey) {
    return res.status(401).json({ error: 'Clé administrateur invalide.' });
  }

  try {
    const data = await readData();
    const idx = data.findIndex((t) => t.id === id);

    if (idx === -1) {
      return res.status(404).json({ error: 'Témoignage introuvable.' });
    }

    data.splice(idx, 1);
    await writeData(data);

    res.status(200).json({ success: true, message: 'Témoignage supprimé.' });
  } catch (error) {
    console.error('[Testimonials DELETE]', error);
    res.status(500).json({ error: 'Erreur lors de la suppression.' });
  }
};
