import { v4 as uuid } from 'uuid';

import { IStockRecordDTO } from '@modules/stocks/dtos/IStockRecordDTO';
import { Stock } from '@modules/stocks/infra/typeorm/entities/Stock';

import { IStocksRepository } from '../IStocksRepository';

class FakeStockRepository implements IStocksRepository {
  private stocks: Stock[] = [];

  async create(data: IStockRecordDTO): Promise<Stock> {
    const stock = new Stock();

    Object.assign(stock, {
      id: uuid(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.stocks.push(stock);

    return stock;
  }

  async update(stock: Stock): Promise<Stock> {
    const stockIndex = this.stocks.findIndex(
      stockToFind => stockToFind.id === stock.id,
    );

    this.stocks[stockIndex] = stock;

    return stock;
  }

  async findAllByItemId(itemId: string): Promise<Stock[]> {
    const stocks = this.stocks.filter(stock => stock.itemId === itemId);

    return stocks;
  }

  async sumTotalQtd(itemId: string): Promise<number> {
    const totalQtd = this.stocks.reduce((acc, stock) => {
      if (stock.itemId === itemId) {
        if (stock.type === 'input') {
          return acc + stock.quantity;
        }

        return acc - stock.quantity;
      }

      return acc;
    }, 0);

    return totalQtd;
  }

  async sumBalance(itemId: string): Promise<number> {
    const balance = this.stocks.reduce((acc, stock) => {
      if (stock.itemId === itemId) {
        if (stock.type === 'input') {
          return acc + stock.value;
        }

        return acc - stock.value;
      }

      return acc;
    }, 0);

    return balance;
  }
}

export { FakeStockRepository };
