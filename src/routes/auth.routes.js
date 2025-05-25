// src/routes/auth.routes.js
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Crear un nuevo usuario
router.post('/register', AuthController.register);

// Obtener todos los usuarios (sin contraseña visible)
router.get('/', verifyToken, AuthController.getAllUsers);

// Iniciar sesión
router.post('/login', AuthController.login);

export default router;
