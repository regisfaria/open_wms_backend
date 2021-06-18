import express, { Router } from 'express';

import { uploadsFolder } from '@config/upload';

import { itemRoutes } from './items.routes';
import { pingRoutes } from './ping.routes';
import { sessionsRoutes } from './sessions.routes';
import { userRoutes } from './users.routes';

const router = Router();

router.use('/files', express.static(uploadsFolder));
router.use('/ping', pingRoutes);
router.use('/users', userRoutes);
router.use('/sessions', sessionsRoutes);
router.use('/items', itemRoutes);

export { router };
