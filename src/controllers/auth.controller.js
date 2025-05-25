// src/controllers/auth.controller.js
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';

export class AuthController {
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
      }

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(409).json({ message: 'El usuario ya existe' });
      }

      const newUser = new User({ username, email, password }); // ← sin hashing

      await newUser.save();

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

  static async getAllUsers(req, res) {
    try {
      const votes = await User.find({}, '-password'); // Excluir el campo password
      return res.status(200).json(votes);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      const token = jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      return res.status(200).json({
        message: 'Inicio de sesión exitoso',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Error en login:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}

// Exporta la función estática para usarla en las rutas
export const registerUser = AuthController.register;
