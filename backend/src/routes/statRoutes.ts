import express from 'express';
import {
  getStats,
  getStatById,
  createStat,
  updateStat,
  deleteStat
} from '../controllers/statController';

const router = express.Router();

// GET /api/stats - Get all stats
router.get('/', getStats);

// GET /api/stats/:id - Get single stat
router.get('/:id', getStatById);

// POST /api/stats - Create new stat
router.post('/', createStat);

// PUT /api/stats/:id - Update stat
router.put('/:id', updateStat);

// DELETE /api/stats/:id - Delete stat
router.delete('/:id', deleteStat);

export default router; 