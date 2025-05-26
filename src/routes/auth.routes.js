import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = Router();

// Create a new user
router.post('/register', AuthController.register);

// Get all users (admin only)
router.get('/', verifyToken, authorizeRoles('admin'), AuthController.getAllUsers);

// Login user
router.post('/login', AuthController.login);

export default router;
