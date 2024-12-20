import { Router } from 'express';

import userController from '../controllers/userController.js';
import requireJwtAuth from '../middlewares/requireJwtAuth.js';
import requireOwnershipOrAdmin from '../middlewares/requireOwnershipOrAdmin.js';

const router = Router();

router.get('/:id', requireJwtAuth, userController.getOne);
router.get('/', requireJwtAuth, userController.get);
router.put(
  '/:id',
  requireJwtAuth,
  requireOwnershipOrAdmin,
  userController.update,
);
router.delete(
  '/:id',
  requireJwtAuth,
  requireOwnershipOrAdmin,
  userController.remove,
);

export default router;
