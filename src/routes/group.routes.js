// src/routes/group.routes.js
import { Router } from 'express';
import { GroupController } from '../controllers/group.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = Router();

// Crear grupo
router.post('/', verifyToken, authorizeRoles('admin'), GroupController.createGroup);

// Obtener todos los grupos
router.get('/', GroupController.getAllGroups);

// Obtener grupo por ID
router.get('/:groupId', GroupController.getGroupById);

// Agregar ruta POST para agregar miembro
router.post('/:groupId/addMembers', verifyToken, authorizeRoles('admin'), GroupController.addMember);

export default router;
