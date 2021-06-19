import { getRepository, Repository } from 'typeorm';

import { IStockRecordDTO } from '@modules/stocks/dtos/IStockRecordDTO';
import { IStocksRepository } from '@modules/stocks/repositories/IStocksRepository';

import { Stock } from '../entities/Stock';

class StocksRepository implements IStocksRepository {
  private repository: Repository<Stock>;

  constructor() {
    this.repository = getRepository(Stock);
  }

  async sumInput(itemId: string): Promise<number> {
    const stock = await this.repository.find({
      where: [{ itemId, type: 'input' }],
    });

    const quantity = stock.reduce(
      (accumulator, stock) => accumulator + stock.quantity,
      0,
    );

    return quantity;
  }

  async sumOutput(itemId: string): Promise<number> {
    const stock = await this.repository.find({
      where: [{ itemId, type: 'output' }],
    });

    const quantity = stock.reduce(
      (accumulator, stock) => accumulator + stock.quantity,
      0,
    );

    return quantity;
  }

  async output({
    itemId,
    quantity,
    value,
    expirationDate,
  }: IStockRecordDTO): Promise<Stock> {
    const stock = this.repository.create({
      itemId,
      quantity,
      value,
      expirationDate,
      type: 'output',
    });

    await this.repository.save(stock);

    return stock;
  }

  async input({
    itemId,
    quantity,
    value,
    expirationDate,
  }: IStockRecordDTO): Promise<Stock> {
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

  async sumBalance(itemId: string): Promise<number> {
    const stockOutput = await this.repository.find({
      where: [{ itemId, type: 'output' }],
    });

    const valueOutput = stockOutput.reduce(
      (accumulator, stock) => accumulator + stock.value,
      0,
    );

    const stockInput = await this.repository.find({
      where: [{ itemId, type: 'input' }],
    });

    const valueInput = stockInput.reduce(
      (accumulator, stock) => accumulator + stock.value,
      0,
    );

    return valueOutput - valueInput;
  }
}

export { StocksRepository };
