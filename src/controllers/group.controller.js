// src/controllers/group.controller.js
import { Group } from '../models/Group.js';

export class GroupController {
  static async createGroup(req, res) {
    try {
      const { name, description, members } = req.body;

      if (!name) {
        return res.status(400).json({ message: 'El nombre es requerido' });
      }

      const group = new Group({ name, description, members });
      await group.save();

      return res.status(201).json({
        message: 'Grupo creado con éxito',
        group,
      });
    } catch (error) {
      console.error('Error al crear grupo:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  static async getGroups(req, res) {
    try {
      const groups = await Group.find().populate('members', 'username email');
      return res.status(200).json(groups);
    } catch (error) {
      console.error('Error al obtener grupos:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}
