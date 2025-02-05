import { Router } from 'express';

import bookController from '../controllers/bookController.js';
import requireJwtAuth from '../middlewares/requireJwtAuth.js';
import requireOwnershipOrAdmin from '../middlewares/requireOwnershipOrAdmin.js';

const router = Router();

router.get('/:id', requireJwtAuth, bookController.getOne);
router.get('/', requireJwtAuth, bookController.get);
router.post('/', requireJwtAuth, bookController.create);
router.put(
  '/:id',
  requireJwtAuth,
  requireOwnershipOrAdmin,
  bookController.update,
);
router.delete(
  '/:id',
  requireJwtAuth,
  requireOwnershipOrAdmin,
  bookController.remove,
);
// NOTE: when verifying change owner to admin

export default router;
