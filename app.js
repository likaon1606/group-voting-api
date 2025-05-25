import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './src/routes/auth.routes.js'; // quitar src extra
import groupRoutes from './src/routes/group.routes.js'
import voteRoutes from './src/routes/vote.routes.js'

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
  }

  routes() {
    this.app.get('/', (req, res) => {
      res.send('API de votación en grupos 🚀');
    });

    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/groups', groupRoutes);
    this.app.use('/api/votes', voteRoutes);
  }

  getApp() {
    return this.app;
  }
}

export default new App().getApp();
