import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateItemUseCase } from './CreateItemUseCase';

class CreateItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      category,
      measureUnity,
      daysToNotifyExpirationDate,
      minimumStock,
    } = request.body;

    const { id: userId } = request.user;

    const createItem = container.resolve(CreateItemUseCase);

    const item = await createItem.execute({
      name,
      category,
      measureUnity,
      userId,
      daysToNotifyExpirationDate,
      minimumStock,
    });

    return response.status(201).json({ item });
  }
}

export { CreateItemController };
