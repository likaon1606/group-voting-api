import { Vote } from '../models/Vote.js';

export class VoteController {
  static async createVote(req, res) {
    try {
      const { group, user, option } = req.body;

      if (!group || !user || !option) {
        return res.status(400).json({ message: 'Faltan datos para votar' });
      }

      // Aquí podrías agregar lógica para verificar si el usuario ya votó, etc.

      const vote = new Vote({ group, user, option });
      await vote.save();

      return res.status(201).json({ message: 'Voto registrado', vote });
    } catch (error) {
      console.error('Error registrando voto:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}
