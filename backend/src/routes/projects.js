import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// In-memory storage (replace with database in production)
let projects = [];

router.get('/', (req, res) => {
  res.json(projects);
});

router.post('/', [
  body('title').notEmpty().trim(),
  body('description').notEmpty().trim(),
  body('category').notEmpty().trim(),
  body('image').optional().isURL()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const project = {
    id: Date.now(),
    ...req.body,
    date: new Date().toISOString()
  };

  projects.push(project);
  res.status(201).json(project);
});

router.put('/:id', [
  body('title').optional().trim(),
  body('description').optional().trim(),
  body('category').optional().trim(),
  body('image').optional().isURL()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = parseInt(req.params.id);
  const index = projects.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Project not found' });
  }

  projects[index] = { ...projects[index], ...req.body };
  res.json(projects[index]);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = projects.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Project not found' });
  }

  projects = projects.filter(item => item.id !== id);
  res.status(204).send();
});

export { router as projectsRouter };