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
    enum: ['Node.js', 'Django', 'Laravel'],
  },
}, { timestamps: true });

voteSchema.index({ user: 1, group: 1 }, { unique: true }); // one vote per user per group

export const Vote = mongoose.model('Vote', voteSchema);
