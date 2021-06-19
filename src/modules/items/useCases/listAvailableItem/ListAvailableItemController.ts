import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableItemUseCase } from './ListAvailableItemUseCase';

class ListAvailableItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category, measureUnity, name } = request.query;

    const { id: userId } = request.user;

    const listAvailableItemUseCase = container.resolve(
      ListAvailableItemUseCase,
    );

    const items = await listAvailableItemUseCase.execute({
      category: category as string,
      measureUnity: measureUnity as string,
      name: name as string,
      userId,
    });

    return response.json({ items }).status(200);
  }
}

export { ListAvailableItemController };
