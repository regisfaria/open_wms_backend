import { getRepository, Repository } from 'typeorm';

import { IInputStockDTO } from '@modules/stocks/dtos/IInputStockDTO';
import { IStocksRepository } from '@modules/stocks/repositories/IStocksRepository';

import { Stock } from '../entities/Stock';

class StocksRepository implements IStocksRepository {
  private repository: Repository<Stock>;

  constructor() {
    this.repository = getRepository(Stock);
  }

  async input({
    itemId,
    quantity,
    value,
    expirationDate,
  }: IInputStockDTO): Promise<Stock> {
    const stock = this.repository.create({
      itemId,
      quantity,
      value,
      expirationDate,
      type: 'input',
    });

    await this.repository.save(stock);

    return stock;
  }
}

export { StocksRepository };
