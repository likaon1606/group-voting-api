import { Group } from '../models/Group.js';

export class GroupController {

  static async createGroup(req, res) {
    try {
      const { name, description } = req.body;

      if (!name || !description) {
        return res
          .status(400)
          .json({ message: 'Nombre y descripción son requeridos' });
      }

      const newGroup = new Group({ name, description });
      await newGroup.save();

      return res
        .status(201)
        .json({ message: 'Grupo creado con éxito', group: newGroup });
    } catch (error) {
      console.error('Error al crear grupo:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  static async getGroupById(req, res) {
    try {
      const { groupId } = req.params;

      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ message: 'Grupo no encontrado' });
      }

      return res.status(200).json({ group });
    } catch (error) {
      console.error('Error al obtener grupo:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  static async getAllGroups(_req, res) {
    try {
      const groups = await Group.find();
      return res.status(200).json({ groups });
    } catch (error) {
      console.error('Error al obtener grupos:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

static async addMember(req, res) {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'Falta el userId para agregar' });
    }

    // Bring the UNPOPULATED group to compare IDs correctly
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }

    // Validate if the user is already a member
    if (group.members.some(m => m.toString() === userId)) {
      return res.status(400).json({ message: 'El Usuario ya es miembro del grupo' });
    }

    // Add the user to the group
    group.members.push(userId);
    await group.save();

    // Populate the members field to return user details
    await group.populate('members', 'username email');

    return res.status(200).json({ message: 'Miembro agregado', group });
  } catch (error) {
    console.error('Error al agregar miembro:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

}
