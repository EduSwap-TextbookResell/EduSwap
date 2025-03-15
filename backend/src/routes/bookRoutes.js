import { Router } from 'express';

import bookController from '../controllers/bookController.js';
import requireJwtAuth from '../middlewares/requireJwtAuth.js';
import requireOwnershipOrAdmin from '../middlewares/requireOwnershipOrAdmin.js';
import Book from '../models/book.js';

const router = Router();

router.get('/:id', requireJwtAuth, bookController.getOne);
router.get('/', requireJwtAuth, bookController.get);
router.post('/', requireJwtAuth, bookController.create);
router.put(
  '/:id',
  requireJwtAuth,
  requireOwnershipOrAdmin(Book),
  bookController.update,
);
router.delete(
  '/:id',
  requireJwtAuth,
  requireOwnershipOrAdmin(Book),
  bookController.remove,
);
// NOTE: when verifying change owner to admin

export default router;
