// src/routes/auth.routes.js
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', AuthController.register);

export default router;
