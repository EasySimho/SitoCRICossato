import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.js';
import { newsRouter } from './routes/news.js';
import { projectsRouter } from './routes/projects.js';
import { statsRouter } from './routes/stats.js';
import { authMiddleware } from './middleware/auth.js';

dotenv.config();
 
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/auth', authRouter);

// Protected routes
app.use('/api/news', authMiddleware, newsRouter);
app.use('/api/projects', authMiddleware, projectsRouter);
app.use('/api/stats', authMiddleware, statsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});