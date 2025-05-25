// src/controllers/auth.controller.js
import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';

export class AuthController {
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;

      // Validar datos básicos
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
      }

      // Verificar si usuario ya existe
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(409).json({ message: 'El usuario ya existe' });
      }

      // Hashear contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Crear usuario nuevo
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      // Respuesta exitosa (no enviamos password)
      return res.status(201).json({
        message: 'Usuario creado con éxito',
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error('Error en register:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}

// Exporta la función estática para usarla en las rutas
export const registerUser = AuthController.register;
