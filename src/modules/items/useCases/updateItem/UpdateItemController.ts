import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateItemUseCase } from './UpdateItemUseCase';

class UpdateItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      category,
      daysToNotifyExpirationDate,
      measureUnity,
      minimumStock,
      name,
    } = request.body;

    const { id } = request.params;
    const { id: userId } = request.user;

    const updateItemUseCase = container.resolve(UpdateItemUseCase);

    const item = await updateItemUseCase.execute({
      category,
      daysToNotifyExpirationDate,
      measureUnity,
      minimumStock,
      name,
      id,
      userId,
    });

    return response.json({ item }).status(200);
  }
}

export { UpdateItemController };
