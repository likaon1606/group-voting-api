import { Vote } from '../models/Vote.js';
import { Group } from '../models/Group.js';

export class VoteController {
  static async createVote(req, res) {
    try {
      const { groupId, option } = req.body;
      const userId = req.user.id; // obtenido del token

      const validOptions = ['Node.js', 'Django', 'Laravel'];
      if (!validOptions.includes(option)) {
        return res
          .status(400)
          .json({
            message: 'Opción inválida. Usa: Node.js, Django o Laravel.',
          });
      }

      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ message: 'Grupo no encontrado' });
      }

      const existingVote = await Vote.findOne({ user: userId, group: groupId });
      if (existingVote) {
        return res.status(409).json({ message: 'Ya has votado en este grupo' });
      }

      const newVote = new Vote({
        user: userId,
        group: groupId,
        option,
      });

      await newVote.save();

      return res
        .status(201)
        .json({ message: 'Voto registrado con éxito', vote: newVote });
    } catch (error) {
      console.error('Error al votar:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  static async getVotesByGroup(req, res) {
    try {
      const { groupId } = req.params;

      const votes = await Vote.find({ group: groupId }).populate(
        'user',
        'username'
      );

      return res.status(200).json({ votes });
    } catch (error) {
      console.error('Error al obtener votos:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}
