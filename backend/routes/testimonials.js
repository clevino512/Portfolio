import express from 'express';
import {
  getAllTestimonials,
  createTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialsController.js';

const router = express.Router();

router.get('/', getAllTestimonials);
router.post('/', createTestimonial);
router.delete('/:id', deleteTestimonial);

export default router;
