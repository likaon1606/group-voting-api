import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';

export class AuthController {
  static async register(req, res) {
    try {
      const { username, email, password, role: requestedRole } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
      }

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(409).json({ message: 'El usuario ya existe' });
      }

      // veryfy if an admin already exists
      const adminExists = await User.findOne({ role: 'admin' });

      // If an admin exists, the new user will be a regular user
      let role = 'user';
      if (requestedRole === 'admin' && !adminExists) {
        role = 'admin';
      }

      const newUser = new User({ username, email, password, role });
      await newUser.save();

      return res.status(201).json({
        message: 'Usuario creado con éxito',
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
      });
    } catch (error) {
      console.error('Error en register:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const votes = await User.find({}, '-password'); // excludes the password field
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
        {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
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

export const registerUser = AuthController.register;
