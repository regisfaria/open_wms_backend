import { getRepository, Repository } from 'typeorm';

import { IStockRecordDTO } from '@modules/stocks/dtos/IStockRecordDTO';
import { IStocksRepository } from '@modules/stocks/repositories/IStocksRepository';

import { Stock } from '../entities/Stock';

class StocksRepository implements IStocksRepository {
  private repository: Repository<Stock>;

  constructor() {
    this.repository = getRepository(Stock);
  }

  async create(data: IStockRecordDTO): Promise<Stock> {
    const stock = this.repository.create(data);

    await this.repository.save(stock);

    return stock;
  }

  async update(stock: Stock): Promise<Stock> {
    await this.repository.save(stock);

    return stock;
  }

  async sumBalance(itemId: string): Promise<number> {
    const stocks = await this.repository.find({ where: { itemId } });

    const balance = stocks.reduce((acc, stock) => {
      if (stock.type === 'input') {
        return acc + Number(stock.value);
      }

      return acc - Number(stock.value);
    }, 0);

    return balance;
  }

  async sumTotalQtd(itemId: string): Promise<number> {
    const stocks = await this.repository.find({ where: { itemId } });

    const totalQtd = stocks.reduce((acc, stock) => {
      if (stock.type === 'input') {
        return acc + stock.quantity;
      }

      return acc - stock.quantity;
    }, 0);

    return totalQtd;
  }

  async findAllByItemId(itemId: string): Promise<Stock[]> {
    const stocks = await this.repository.find({ where: { itemId } });

    return stocks;
  }
}

export { StocksRepository };
