import { Router } from 'express';

import postController from '../controllers/postController.js';
import requireJwtAuth from '../middlewares/requireJwtAuth.js';

const router = Router();

router.get('/', requireJwtAuth, postController.get);
router.get('/:book', requireJwtAuth, postController.getOne);
router.post('/', requireJwtAuth, postController.create);
router.put('/:id', requireJwtAuth, postController.update); // TODO: require admin or self
router.delete('/:id', requireJwtAuth, postController.remove); // TODO: require admin or self

export default router;
