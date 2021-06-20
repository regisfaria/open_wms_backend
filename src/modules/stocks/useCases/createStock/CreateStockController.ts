import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateStockUseCase } from './CreateStockUseCase';

class CreateStockController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type } = request.params;
    const { itemId, quantity, value, expirationDate } = request.body;

    const createStockUseCase = container.resolve(CreateStockUseCase);

    const stock = await createStockUseCase.execute({
      itemId,
      quantity,
      value,
      expirationDate,
      type: type as 'input' | 'output',
    });

    return response.status(201).json({ stock });
  }
}

export { CreateStockController };
