import express from 'express';
import { 
  getStats, 
  getStatById, 
  createStat, 
  updateStat, 
  deleteStat 
} from '../controllers/statsController';
import upload from '../middleware/upload';

const router = express.Router();

router.get('/', getStats);
router.get('/:id', getStatById);
router.post('/', upload.single('image'), createStat);
router.put('/:id', upload.single('image'), updateStat);
router.delete('/:id', deleteStat);

export default router; 