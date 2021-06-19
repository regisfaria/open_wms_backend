import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListItemWithStockInfoUseCase } from './ListItemWithStockInfoUseCase';

class ListItemWithStockInfoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listItemWithStockInfoUseCase = container.resolve(
      ListItemWithStockInfoUseCase,
    );

    const itemsStockInfo = await listItemWithStockInfoUseCase.execute(id);

    return response.json(itemsStockInfo).status(200);
  }
}

export { ListItemWithStockInfoController };
