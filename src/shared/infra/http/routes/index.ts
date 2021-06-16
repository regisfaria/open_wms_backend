import { Router } from 'express';

import { pingRoutes } from './ping.routes';
import { userRoutes } from './users.routes';

const router = Router();

router.use('/ping', pingRoutes);
router.use('/users', userRoutes);

export { router };
