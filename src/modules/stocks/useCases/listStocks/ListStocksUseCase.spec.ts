import { FakeItemsRepository } from '@modules/items/repositories/fakes/FakeItemsRepository';
import { FakeStockRepository } from '@modules/stocks/repositories/fakes/FakeStockRepository';
import { IStocksRepository } from '@modules/stocks/repositories/IStocksRepository';
import { AppError } from '@shared/errors/AppError';

import { ListStocksUseCase } from './ListStocksUseCase';

let listStockUseCase: ListStocksUseCase;
let itemRepository: FakeItemsRepository;
let stockRepository: IStocksRepository;
describe('List stock useCase', () => {
  beforeEach(() => {
    itemRepository = new FakeItemsRepository();
    stockRepository = new FakeStockRepository();
    listStockUseCase = new ListStocksUseCase(stockRepository, itemRepository);
  });

  it('should be able to list stock of items', async () => {
    const item = await itemRepository.create({
      userId: '12345',
      name: 'Detergente',
      category: 'produtos de limpeza',
      measureUnity: 'QTD',
    });

    await stockRepository.create({
      itemId: item.id,
      quantity: 10,
      type: 'input',
      value: 500,
    });

    const response = await listStockUseCase.execute(item.id);

    expect(response.stocks[0]).toHaveProperty('id');
    expect(response).toHaveProperty('item');
    expect(response.stocks.length).toEqual(1);
  });

  it('should be able to list stock of items', async () => {
    const item = await itemRepository.create({
      userId: '12345',
      name: 'Detergente',
      category: 'produtos de limpeza',
      measureUnity: 'QTD',
    });

    const response = await listStockUseCase.execute(item.id);

    expect(response.stocks.length).toEqual(0);
  });

  it('should not be able to list stock of invalid item', async () => {
    return expect(async () => {
      await listStockUseCase.execute('invalidId');
    }).rejects.toBeInstanceOf(AppError);
  });
});
