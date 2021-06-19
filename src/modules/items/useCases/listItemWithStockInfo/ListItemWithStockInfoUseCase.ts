import { inject, injectable } from 'tsyringe';

import { Item } from '@modules/items/infra/typeorm/entities/Item';
import { IItemsRepository } from '@modules/items/repositories/IItemsRepository';
import { IStocksRepository } from '@modules/stocks/repositories/IStocksRepository';

interface IResponse {
  item: Item;
  total: number;
  balance: number;
}

@injectable()
class ListItemWithStockInfoUseCase {
  constructor(
    @inject('ItemsRepository')
    private itemRepository: IItemsRepository,
    @inject('StocksRepository')
    private stockRepository: IStocksRepository,
  ) {}
  async execute(userId: string): Promise<IResponse[]> {
    const items = await this.itemRepository.listAvailableAllFromUser({
      userId,
    });

    const itemsInfos = await Promise.all(
      items.map(async item => {
        console.log(item);

        const balance = await this.stockRepository.sumBalance(item.id);
        const sumInputQuantity = await this.stockRepository.sumInput(item.id);
        const sumOutputQuantity = await this.stockRepository.sumOutput(item.id);
        console.log(balance);

        const finish: IResponse = {
          item,
          total: sumOutputQuantity - sumInputQuantity,
          balance,
        };

        return finish;
      }),
    );

    return itemsInfos;
  }
}

export { ListItemWithStockInfoUseCase };
