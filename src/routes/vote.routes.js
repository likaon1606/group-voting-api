// src/routes/vote.routes.js
import { Router } from 'express';
import { VoteController } from '../controllers/vote.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = Router();

// Register a vote
router.post('/', verifyToken, authorizeRoles('user', 'admin'), VoteController.createVote);

// Getting votes from a group
router.get('/:groupId', verifyToken, VoteController.getVotesByGroup);

export default router;
