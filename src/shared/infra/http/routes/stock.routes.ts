import { Router } from 'express';

import { InputStockController } from '@modules/stocks/useCases/InputStock/InputStockController';

const stockRoutes = Router();

const inputStockController = new InputStockController();

stockRoutes.post('/input', inputStockController.handle);

export { stockRoutes };
