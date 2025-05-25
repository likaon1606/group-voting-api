import { Group } from '../models/Group.js';

export class GroupController {
  static async createGroup(req, res) {
    try {
      const { name, description } = req.body;

      if (!name) {
        return res.status(400).json({ message: 'El nombre es obligatorio' });
      }

      const exists = await Group.findOne({ name });
      if (exists) {
        return res.status(409).json({ message: 'El grupo ya existe' });
      }

      const group = new Group({ name, description });
      await group.save();

      return res.status(201).json({ message: 'Grupo creado', group });
    } catch (error) {
      console.error('Error creando grupo:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}
