import { inject, injectable } from 'tsyringe';

import { IItemsRepository } from '@modules/items/repositories/IItemsRepository';
import { Stock } from '@modules/stocks/infra/typeorm/entities/Stock';
import { IStocksRepository } from '@modules/stocks/repositories/IStocksRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class ListStocksUseCase {
  constructor(
    @inject('StocksRepository')
    private stocksRepository: IStocksRepository,

    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  async execute(itemId: string): Promise<Stock[]> {
    const itemExists = await this.itemsRepository.findById(itemId);

    if (!itemExists) {
      throw new AppError('Nenhum item com esse ID existente');
    }

    const stocks = await this.stocksRepository.findAllByItemId(itemId);

    return stocks;
  }
}

export { ListStocksUseCase };
