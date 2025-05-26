import { Router } from 'express';
import { GroupController } from '../controllers/group.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = Router();

// Create group
router.post('/', verifyToken, authorizeRoles('admin'), GroupController.createGroup);

// Get all groups
router.get('/', GroupController.getAllGroups);

// Get group by ID
router.get('/:groupId', GroupController.getGroupById);

// ADD a member to a group
router.post('/:groupId/addMembers', verifyToken, authorizeRoles('admin'), GroupController.addMember);

export default router;
