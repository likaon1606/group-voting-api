import { Router } from 'express';
import { VoteController } from '../controllers/vote.controller.js';

const router = Router();

router.post('/', VoteController.createVote);

export default router;
