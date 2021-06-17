import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateItemUseCase } from './CreateItemUseCase';

class CreateItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      category,
      measureUnity,
      userId, // NEED TO DELETE WHEN FINISH AUTH MIDDLEWARE
      daysToNotifyExpirationDate,
      image,
      minimumStock,
    } = request.body;

    const { id } = { id: '1245' }; // request.user NEED TO CHANGE WHEN FINISH AUTH MIDDLEWARE

    const createItem = container.resolve(CreateItemUseCase);

    const item = await createItem.execute({
      name,
      category,
      measureUnity,
      userId,
      daysToNotifyExpirationDate,
      image,
      minimumStock,
    });

    return response.status(201).json({ item });
  }
}

export { CreateItemController };
