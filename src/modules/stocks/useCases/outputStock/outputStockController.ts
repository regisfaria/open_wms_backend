import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { OutputStockUseCase } from './outputStockUseCase';

class OutputStockController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { itemId, quantity, value, expirationDate } = request.body;

    const outputStockUseCase = container.resolve(OutputStockUseCase);

    const stock = await outputStockUseCase.execute({
      itemId,
      quantity,
      value,
      expirationDate,
    });

    return response.json(stock).status(201);
  }
}

export { OutputStockController };
