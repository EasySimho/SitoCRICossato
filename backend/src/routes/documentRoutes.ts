import express from 'express';
import {
  getDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument
} from '../controllers/documentController';
import { authMiddleware } from '../middleware/auth.js';
import upload from '../middleware/upload';

const router = express.Router();

// Public routes
router.get('/', getDocuments);
router.get('/:id', getDocumentById);

// Protected routes (admin only)
router.post('/', authMiddleware, upload.single('file'), createDocument);
router.put('/:id', authMiddleware, upload.single('file'), updateDocument);
router.delete('/:id', authMiddleware, deleteDocument);

export default router; 