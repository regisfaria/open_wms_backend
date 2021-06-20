import { inject, injectable } from 'tsyringe';

import { Item } from '@modules/items/infra/typeorm/entities/Item';
import { IItemsRepository } from '@modules/items/repositories/IItemsRepository';
import { Stock } from '@modules/stocks/infra/typeorm/entities/Stock';
import { IStocksRepository } from '@modules/stocks/repositories/IStocksRepository';
import { AppError } from '@shared/errors/AppError';

interface IResponse {
  stocks: Stock[];
  item: Item;
}

@injectable()
class ListStocksUseCase {
  constructor(
    @inject('StocksRepository')
    private stocksRepository: IStocksRepository,

    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  async execute(itemId: string): Promise<IResponse> {
    const item = await this.itemsRepository.findById(itemId);

    if (!item) {
      throw new AppError('Nenhum item com esse ID existente');
    }

    const stocks = await this.stocksRepository.findAllByItemId(itemId);

    return { stocks, item };
  }
}

export { ListStocksUseCase };
