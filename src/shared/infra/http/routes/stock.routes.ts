import { Router } from 'express';

import { CreateStockController } from '@modules/stocks/useCases/createStock/CreateStockController';
import { StockDashboardController } from '@modules/stocks/useCases/stockDashboard/StockDashboardController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const stockRoutes = Router();

const createStockController = new CreateStockController();
const dashboardStockController = new StockDashboardController();

stockRoutes.use(ensureAuthenticated);

stockRoutes.post('/:type', createStockController.handle);

stockRoutes.get('/dashboard', dashboardStockController.handle);

export { stockRoutes };
