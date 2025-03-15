import { Router } from 'express';

import commentRoutes from './commentRoutes.js';
import postController from '../controllers/postController.js';
import requireJwtAuth from '../middlewares/requireJwtAuth.js';
import requireOwnershipOrAdmin from '../middlewares/requireOwnershipOrAdmin.js';
import Post from '../models/post.js';

const router = Router();

router.get('/:id', requireJwtAuth, postController.getOne);
router.get('/', requireJwtAuth, postController.get);
router.post('/', requireJwtAuth, postController.create);
router.put(
  '/:id',
  requireJwtAuth,
  requireOwnershipOrAdmin(Post),
  postController.update,
);
router.delete(
  '/:id',
  requireJwtAuth,
  requireOwnershipOrAdmin(Post),
  postController.remove,
);

router.use('/:postId/comments', commentRoutes);

export default router;
