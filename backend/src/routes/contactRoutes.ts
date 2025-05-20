import express from 'express';
import {
  submitContact,
  getContacts,
  getContactById,
  deleteContact,
  updateContact
} from '../controllers/contactController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Public route
router.post('/', submitContact);

// Protected routes (admin only)
router.get('/', authMiddleware, getContacts);
router.get('/:id', authMiddleware, getContactById);
router.put('/:id', authMiddleware, updateContact);
router.delete('/:id', authMiddleware, deleteContact);

export default router; 