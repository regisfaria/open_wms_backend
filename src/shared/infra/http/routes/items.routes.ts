import { Router } from 'express';

import { CreateItemController } from '@modules/items/useCases/createItem/CreateItemController';

const itemRoutes = Router();

const createItemController = new CreateItemController();

itemRoutes.post('/', createItemController.handle);

export { itemRoutes };
