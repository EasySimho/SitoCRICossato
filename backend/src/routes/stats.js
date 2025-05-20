import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// In-memory storage (replace with database in production)
let stats = [
  {
    id: 1,
    value: 150,
    label: "Volontari attivi"
  },
  {
    id: 2,
    value: 12,
    label: "Veicoli disponibili"
  },
  {
    id: 3,
    value: 35,
    label: "Anni di servizio",
    suffix: "+"
  },
  {
    id: 4,
    value: 5000,
    label: "Interventi annuali",
    suffix: "+"
  }
];

router.get('/', (req, res) => {
  res.json(stats);
});

router.put('/:id', [
  body('value').isNumeric(),
  body('label').optional().trim(),
  body('suffix').optional().trim()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = parseInt(req.params.id);
  const index = stats.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Stat not found' });
  }

  stats[index] = { ...stats[index], ...req.body };
  res.json(stats[index]);
});

export { router as statsRouter };