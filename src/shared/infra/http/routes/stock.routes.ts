import { Router } from 'express';

import { InputStockController } from '@modules/stocks/useCases/InputStock/InputStockController';
import { OutputStockController } from '@modules/stocks/useCases/outputStock/outputStockController';

const stockRoutes = Router();

const inputStockController = new InputStockController();
const outputStockController = new OutputStockController();

stockRoutes.post('/input', inputStockController.handle);
stockRoutes.post('/output', outputStockController.handle);

export { stockRoutes };
