import { Router } from 'express';

import postController from '../controllers/postController.js';
import requireJwtAuth from '../middlewares/requireJwtAuth.js';

const router = Router();

router.get('/:id', requireJwtAuth, postController.getOne);
router.get('/', requireJwtAuth, postController.get);
router.post('/', requireJwtAuth, postController.create);
router.put('/:id', requireJwtAuth, postController.update); // TODO: require admin or self
router.delete('/:id', requireJwtAuth, postController.remove); // TODO: require admin or self

export default router;
