import { inject, injectable } from 'tsyringe';

import { IItemsRepository } from '@modules/items/repositories/IItemsRepository';
import { IStocksRepository } from '@modules/stocks/repositories/IStocksRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CalculateStockItemUseCase {
  constructor(
    @inject('StocksRepository')
    private stockRepository: IStocksRepository,
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  async execute(itemId: string): Promise<number> {
    const itemExist = await this.itemsRepository.findById(itemId);

    if (!itemExist) {
      throw new AppError('Item não existe');
    }

    const inputStock = await this.stockRepository.sumInput(itemId);

    const outputStock = await this.stockRepository.sumOutput(itemId);

    return inputStock - outputStock;
  }
}

export { CalculateStockItemUseCase };
