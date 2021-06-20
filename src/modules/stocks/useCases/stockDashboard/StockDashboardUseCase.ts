import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import { Item } from '@modules/items/infra/typeorm/entities/Item';
import { IItemsRepository } from '@modules/items/repositories/IItemsRepository';
import { IStocksRepository } from '@modules/stocks/repositories/IStocksRepository';

interface IResponse {
  item: Item;
  totalQtd: number;
  balance: number;
}

@injectable()
class StockDashboardUseCase {
  constructor(
    @inject('StocksRepository')
    private stocksRepository: IStocksRepository,

    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  async execute(userId: string): Promise<IResponse[]> {
    const items = await this.itemsRepository.findAllAvailableByUserId({
      userId,
    });

    const response: IResponse[] = [];

    for (const item of items) {
      const balance = await this.stocksRepository.sumBalance(item.id);

      const totalQtd = await this.stocksRepository.sumTotalQtd(item.id);

      response.push({ balance, totalQtd, item });
    }

    return response;
  }
}

export { StockDashboardUseCase };
