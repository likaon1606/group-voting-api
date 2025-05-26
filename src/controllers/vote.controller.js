import { Vote } from '../models/Vote.js';
import { Group } from '../models/Group.js';

export class VoteController {
  static async createVote(req, res) {
    try {
      const { option, groupId } = req.body;
      const userId = req.user.id; 

      if (!option || !groupId) {
        return res
          .status(400)
          .json({ message: 'Faltan datos para registrar el voto' });
      }

      // Check if the group exists
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ message: 'Grupo no encontrado' });
      }

      // Check if the user is a member of the group
      const isMember = group.members.includes(userId);
      if (!isMember) {
        return res
          .status(403)
          .json({ message: 'No eres miembro de este grupo' });
      }

      // Check if the user voted alredy
      const alreadyVoted = await Vote.findOne({ user: userId, groupId });
      if (alreadyVoted) {
        return res.status(400).json({ message: 'Ya has votado en este grupo' });
      }

      // Check if the user has already voted in this group
      const existingVote = await Vote.findOne({ user: userId, group: groupId });
      if (existingVote) {
        return res.status(400).json({ message: 'Ya has votado en este grupo' });
      }

      // Register the vote
      const newVote = new Vote({ user: userId, group: groupId, option });
      await newVote.save();

      return res.status(201).json({ message: 'Voto registrado correctamente' });
    } catch (error) {
      console.error('Error al registrar voto:', error);
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
