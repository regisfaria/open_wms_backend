import { FakeItemsRepository } from '@modules/items/repositories/fakes/FakeItemsRepository';
import { FakeStockRepository } from '@modules/stocks/repositories/fakes/FakeStockRepository';
import { IStocksRepository } from '@modules/stocks/repositories/IStocksRepository';
import { AppError } from '@shared/errors/AppError';

import { CalculateStockItemUseCase } from '../calculateStockItem/calculateStockItemUseCase';
import { OutputStockUseCase } from './outputStockUseCase';

let outputStockUseCase: OutputStockUseCase;
let calculateStockItemUseCase: CalculateStockItemUseCase;
let itemRepository: FakeItemsRepository;
let stockRepository: IStocksRepository;
describe('Output stock useCase', () => {
  beforeEach(() => {
    itemRepository = new FakeItemsRepository();
    stockRepository = new FakeStockRepository();
    calculateStockItemUseCase = new CalculateStockItemUseCase(stockRepository);
    outputStockUseCase = new OutputStockUseCase(
      stockRepository,
      itemRepository,
      calculateStockItemUseCase,
    );
  });

  it('should be able to output in stock without expiration date', async () => {
    const item = await itemRepository.create({
      userId: '12345',
      name: 'Detergente',
      category: 'produtos de limpeza',
      measureUnity: 'QTD',
    });

    stockRepository.input({
      itemId: item.id,
      quantity: 100,
      value: 500,
    });

    const stock = await outputStockUseCase.execute({
      itemId: item.id,
      quantity: 10,
      value: 5,
    });

    expect(stock).toHaveProperty('id');
    expect(stock.type).toEqual('output');
  });

  it('should be able to output in stock with expiration date', async () => {
    const item = await itemRepository.create({
      userId: '12345',
      name: 'Detergente',
      category: 'produtos de limpeza',
      measureUnity: 'QTD',
    });

    stockRepository.input({
      itemId: item.id,
      quantity: 100,
      value: 5,
    });

    const stock = await outputStockUseCase.execute({
      itemId: item.id,
      quantity: 100,
      value: 50,
      expirationDate: '2021-07-20',
    });

    expect(stock).toHaveProperty('id');
  });

  it('should not be able to output in stock with invalid quantity', async () => {
    const item = await itemRepository.create({
      userId: '12345',
      name: 'Detergente',
      category: 'produtos de limpeza',
      measureUnity: 'QTD',
    });
    stockRepository.input({
      itemId: item.id,
      quantity: 100,
      value: 5,
    });
    return expect(async () => {
      await outputStockUseCase.execute({
        itemId: item.id,
        quantity: 110,
        value: 500,
        expirationDate: '2021-07-20',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to output in stock with invalid item', async () => {
    return expect(async () => {
      await outputStockUseCase.execute({
        itemId: '12',
        quantity: 10,
        value: 500,
        expirationDate: '2021-07-20',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
