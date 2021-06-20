import 'dotenv';
import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import { errorHandler } from '@shared/errors/errorHandler';
import createConnection from '@shared/infra/typeorm';

import swaggerFile from '../../../swagger.json';
import { cronApp, startCrons } from './cronjobs';
import { router } from './routes';

import '@shared/container';

createConnection().then(_connectionEstablished => {
  if (process.env.NODE_ENV !== 'test') {
    cronApp.listen(3332, () => {
      startCrons();

      console.info('🚀 CRONJOBS STARTED AT PORT 3332 🚀');
    });
  }
});

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api_docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(errorHandler);

export { app };
