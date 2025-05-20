import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController';
import upload from '../middleware/upload';

const router = express.Router();

// GET /api/projects - Get all projects
router.get('/', getProjects);

// GET /api/projects/:id - Get single project
router.get('/:id', getProjectById);

// POST /api/projects - Create new project
router.post('/', upload.single('image'), createProject);

// PUT /api/projects/:id - Update project
router.put('/:id', upload.single('image'), updateProject);

// DELETE /api/projects/:id - Delete project
router.delete('/:id', deleteProject);

export default router; 