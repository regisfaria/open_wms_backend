import { Router } from 'express';

import { CreateStockController } from '@modules/stocks/useCases/createStock/CreateStockController';
import { ListStocksController } from '@modules/stocks/useCases/listStocks/ListStocksController';
import { StockDashboardController } from '@modules/stocks/useCases/stockDashboard/StockDashboardController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const stockRoutes = Router();

const createStockController = new CreateStockController();
const dashboardStockController = new StockDashboardController();
const listStocksController = new ListStocksController();

stockRoutes.use(ensureAuthenticated);

stockRoutes.post('/:type', createStockController.handle);

stockRoutes.get('/dashboard', dashboardStockController.handle);

stockRoutes.get('/byItem/:itemId', listStocksController.handle);

export { stockRoutes };
