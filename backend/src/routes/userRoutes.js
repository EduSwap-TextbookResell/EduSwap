import { Router } from 'express';

import userController from '../controllers/userController.js';
import requireJwtAuth from '../middlewares/requireJwtAuth.js';

const router = Router();

router.get('/', requireJwtAuth, userController.get);
router.get('/:username', requireJwtAuth, userController.getOne);
router.put('/:id', requireJwtAuth, userController.update); // TODO: require admin or self
router.delete('/:id', requireJwtAuth, userController.remove); // TODO: require admin or self

export default router;
