// import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import { errorHandler } from '@shared/errors/errorHandler';
import createConnection from '@shared/infra/typeorm';

import swaggerFile from '../../../swagger.json';
import { router } from './routes';

import '@shared/container';

createConnection();

const app = express();

app.use(express.json());

app.use('/api_docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(errorHandler);

export { app };
