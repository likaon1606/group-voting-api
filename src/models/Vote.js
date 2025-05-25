import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  option: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export const Vote = mongoose.model('Vote', voteSchema);
