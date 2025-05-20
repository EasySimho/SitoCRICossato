import express from 'express';
import {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
} from '../controllers/newsController';
import upload from '../middleware/upload';

const router = express.Router();

// GET /api/news - Get all news
router.get('/', getNews);

// GET /api/news/:id - Get single news
router.get('/:id', getNewsById);

// POST /api/news - Create new news
router.post('/', upload.single('image'), createNews);

// PUT /api/news/:id - Update news
router.put('/:id', upload.single('image'), updateNews);

// DELETE /api/news/:id - Delete news
router.delete('/:id', deleteNews);

export default router; 