import { Router } from 'express';

import { pingRoutes } from './ping.routes';

const router = Router();

router.use('/ping', pingRoutes);

export { router };
