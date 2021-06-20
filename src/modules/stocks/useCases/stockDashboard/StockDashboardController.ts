import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { StockDashboardUseCase } from './StockDashboardUseCase';

class StockDashboardController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const dashboardStock = container.resolve(StockDashboardUseCase);

    const dashboardData = await dashboardStock.execute(id);

    return response.status(200).json({ dashboardData });
  }
}

export { StockDashboardController };
