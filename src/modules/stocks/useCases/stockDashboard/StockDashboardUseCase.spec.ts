import { FakeItemsRepository } from '@modules/items/repositories/fakes/FakeItemsRepository';
import { FakeStockRepository } from '@modules/stocks/repositories/fakes/FakeStockRepository';
import { IStocksRepository } from '@modules/stocks/repositories/IStocksRepository';

import { StockDashboardUseCase } from './StockDashboardUseCase';

let stockDashboardUseCase: StockDashboardUseCase;
let itemRepository: FakeItemsRepository;
let stockRepository: IStocksRepository;

describe('Stock dashboard useCase', () => {
  beforeEach(() => {
    itemRepository = new FakeItemsRepository();
    stockRepository = new FakeStockRepository();
    stockDashboardUseCase = new StockDashboardUseCase(
      stockRepository,
      itemRepository,
    );
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

    await stockRepository.create({
      itemId: item.id,
      quantity: 1,
      type: 'output',
      value: 50,
    });

    const stock = await stockDashboardUseCase.execute('12345');

    expect(stock[0].item).toHaveProperty('id');
    expect(stock[0].totalQtd).toEqual(9);
    expect(stock[0].balance).toEqual(450);
    expect(stock.length).toEqual(1);
  });
});
