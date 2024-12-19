import { Router } from 'express';

import userController from '../controllers/userController.js';
import requireJwtAuth from '../middlewares/requireJwtAuth.js';

const router = Router();

router.get('/:id', requireJwtAuth, userController.getOne);
router.get('/', requireJwtAuth, userController.get);
router.put('/:id', requireJwtAuth, userController.update); // TODO: require admin or self
router.delete('/:id', requireJwtAuth, userController.remove); // TODO: require admin or self

export default router;
