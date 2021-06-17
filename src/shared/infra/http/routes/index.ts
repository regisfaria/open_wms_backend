import { Router } from 'express';

import { itemRoutes } from './items.routes';
import { pingRoutes } from './ping.routes';
import { userRoutes } from './users.routes';

const router = Router();

router.use('/ping', pingRoutes);
router.use('/users', userRoutes);
router.use('/items', itemRoutes);

export { router };
