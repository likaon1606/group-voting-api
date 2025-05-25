import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  option: {
    type: String,
    required: true,
    enum: ['Node.js', 'Django', 'Laravel'], // ✅ validación de opciones
  },
}, { timestamps: true });

voteSchema.index({ user: 1, group: 1 }, { unique: true }); // 1 voto por usuario por grupo

export const Vote = mongoose.model('Vote', voteSchema);
