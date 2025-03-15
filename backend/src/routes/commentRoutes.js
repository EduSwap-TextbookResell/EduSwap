import { Router } from 'express';

import commentController from '../controllers/commentController.js';
import requireJwtAuth from '../middlewares/requireJwtAuth.js';
import requireOwnershipOrAdmin from '../middlewares/requireOwnershipOrAdmin.js';
import Comment from '../models/comment.js';

const router = Router({ mergeParams: true });

router.get('/', requireJwtAuth, commentController.get);
router.post('/', requireJwtAuth, commentController.create);
router.delete(
  '/:id',
  requireJwtAuth,
  requireOwnershipOrAdmin(Comment),
  commentController.remove,
);

export default router;
