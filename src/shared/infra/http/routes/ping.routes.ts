import { Router } from 'express';

const pingRoutes = Router();

pingRoutes.get('/', (request, response) => {
  return response.json({ success: true, message: 'pong' });
});

export { pingRoutes };
