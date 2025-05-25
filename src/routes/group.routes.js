// src/routes/group.routes.js
import { Router } from 'express';
import { GroupController } from '../controllers/group.controller.js';

const router = Router();

// Crear grupo
router.post('/', GroupController.createGroup);

// Obtener todos los grupos
router.get('/', GroupController.getGroups);

export default router;
