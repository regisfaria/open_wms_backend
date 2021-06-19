import { v4 as uuid } from 'uuid';

import { IInputStockDTO } from '@modules/stocks/dtos/IInputStockDTO';
import { Stock } from '@modules/stocks/infra/typeorm/entities/Stock';

import { IStocksRepository } from '../IStocksRepository';

class FakeStockRepository implements IStocksRepository {
  private stocks: Stock[] = [];
  async input(data: IInputStockDTO): Promise<Stock> {
    const stock = new Stock();

    Object.assign(stock, { id: uuid(), ...data, type: 'input' });

    this.stocks.push(stock);

    return stock;
  }
}

export { FakeStockRepository };
