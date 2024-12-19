import { Router } from 'express';

import bookController from '../controllers/bookController.js';
import requireJwtAuth from '../middlewares/requireJwtAuth.js';

const router = Router();

router.get('/', requireJwtAuth, bookController.get);
router.get('/:book', requireJwtAuth, bookController.getOne);
router.post('/', requireJwtAuth, bookController.create);
router.put('/:id', requireJwtAuth, bookController.update); // TODO: require admin or self
router.delete('/:id', requireJwtAuth, bookController.remove); // TODO: require admin or self

export default router;
