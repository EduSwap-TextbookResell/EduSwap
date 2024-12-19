import { Router } from 'express';

import bookController from '../controllers/bookController.js';
import requireJwtAuth from '../middlewares/requireJwtAuth.js';

const router = Router();

router.get('/:id', requireJwtAuth, bookController.getOne);
router.get('/', requireJwtAuth, bookController.get);
router.post('/', requireJwtAuth, bookController.create);
router.put('/:id', requireJwtAuth, bookController.update); // TODO: require admin or self, when verified only admin
router.delete('/:id', requireJwtAuth, bookController.remove); // TODO: require admin or self, when verified only admin

export default router;
