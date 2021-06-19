import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { InputStockUseCase } from './InputStockUseCase';

class InputStockController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { itemId, quantity, value, expirationDate } = request.body;

    const inputStockUseCase = container.resolve(InputStockUseCase);

    const stock = await inputStockUseCase.execute({
      itemId,
      quantity,
      value,
      expirationDate,
    });

    return response.json(stock).status(201);
  }
}

export { InputStockController };
