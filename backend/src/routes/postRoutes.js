import { Router } from 'express';

import postController from '../controllers/postController.js';
import requireJwtAuth from '../middlewares/requireJwtAuth.js';
import requireOwnershipOrAdmin from '../middlewares/requireOwnershipOrAdmin.js';

const router = Router();

router.get('/:id', requireJwtAuth, postController.getOne);
router.get('/', requireJwtAuth, postController.get);
router.post('/', requireJwtAuth, postController.create);
router.put(
  '/:id',
  requireJwtAuth,
  requireOwnershipOrAdmin,
  postController.update,
);
router.delete(
  '/:id',
  requireJwtAuth,
  requireOwnershipOrAdmin,
  postController.remove,
);

export default router;
