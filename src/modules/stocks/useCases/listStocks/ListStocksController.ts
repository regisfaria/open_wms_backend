import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListStocksUseCase } from './ListStocksUseCase';

class ListStocksController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { itemId } = request.params;

    const listStocks = container.resolve(ListStocksUseCase);

    const data = await listStocks.execute(itemId);

    return response.status(200).json(data);
  }
}

export { ListStocksController };
