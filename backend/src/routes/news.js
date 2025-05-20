import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// In-memory storage (replace with database in production)
let news = [];

router.get('/', (req, res) => {
  res.json(news);
});

router.post('/', [
  body('title').notEmpty().trim(),
  body('content').notEmpty().trim(),
  body('category').notEmpty().trim(),
  body('image').optional().isURL()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newsItem = {
    id: Date.now(),
    ...req.body,
    date: new Date().toISOString(),
    author: req.user.username
  };

  news.push(newsItem);
  res.status(201).json(newsItem);
});

router.put('/:id', [
  body('title').optional().trim(),
  body('content').optional().trim(),
  body('category').optional().trim(),
  body('image').optional().isURL()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = parseInt(req.params.id);
  const index = news.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'News not found' });
  }

  news[index] = { ...news[index], ...req.body };
  res.json(news[index]);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = news.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'News not found' });
  }

  news = news.filter(item => item.id !== id);
  res.status(204).send();
});

export { router as newsRouter };