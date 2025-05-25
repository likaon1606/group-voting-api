import { Router } from 'express';
import { GroupController } from '../controllers/group.controller.js';

const router = Router();

router.post('/', GroupController.createGroup);

export default router;
