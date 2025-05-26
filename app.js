import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './src/docs/swagger.json' with { type: 'json' };

import authRoutes from './src/routes/auth.routes.js'; 
import groupRoutes from './src/routes/group.routes.js';
import voteRoutes from './src/routes/vote.routes.js';

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

    // swagger documentation
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Main routes
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/groups', groupRoutes);
    this.app.use('/api/votes', voteRoutes);
  }

  getApp() {
    return this.app;
  }
}

export default new App().getApp();
