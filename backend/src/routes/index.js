import { Router } from 'express';

import logger from '../services/logger.js';
import authRoutes from './authRoutes.js';
import bookRoutes from './bookRoutes.js';
import postRoutes from './postRoutes.js';
import userRoutes from './userRoutes.js';

const router = Router();

router.get('/api', (req, res) => {
  res.status(200).json({ message: 'ok' });
});

router.use('/api/auth', authRoutes);
router.use('/api/user', userRoutes);
router.use('/api/book', bookRoutes);
router.use('/api/post', postRoutes);

router.all('*', (req, res) =>
  res.status(404).json({ message: `No route for ${req.originalUrl}` }),
);

router.use((err, req, res, _next) => {
  logger.error(err);

  res.status(err.statusCode || 500).json({
    error: err.message,
  });
});

export default router;
