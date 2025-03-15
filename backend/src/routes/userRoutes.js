import { Router } from 'express';

import userController from '../controllers/userController.js';
import requireJwtAuth from '../middlewares/requireJwtAuth.js';
import requireOwnershipOrAdmin from '../middlewares/requireOwnershipOrAdmin.js';
import User from '../models/user.js';

const router = Router();

router.get('/:id', requireJwtAuth, userController.getOne);
router.get('/', requireJwtAuth, userController.get);
router.put(
  '/:id',
  requireJwtAuth,
  requireOwnershipOrAdmin(User),
  userController.update,
);
router.delete(
  '/:id',
  requireJwtAuth,
  requireOwnershipOrAdmin(User),
  userController.remove,
);

export default router;
