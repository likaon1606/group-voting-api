// src/routes/group.routes.js
import { Router } from 'express';
import { GroupController } from '../controllers/group.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Crear grupo
router.post('/', verifyToken, GroupController.createGroup);

// Obtener todos los grupos
router.get('/', GroupController.getAllGroups);

// Obtener grupo por ID
router.get('/:groupId', GroupController.getGroupById);

// Agregar ruta POST para agregar miembro
router.post('/:groupId/addMembers', verifyToken, GroupController.addMember);

export default router;
