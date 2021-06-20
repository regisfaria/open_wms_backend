import { FakeItemsRepository } from '@modules/items/repositories/fakes/FakeItemsRepository';
import { FakeStockRepository } from '@modules/stocks/repositories/fakes/FakeStockRepository';
import { IStocksRepository } from '@modules/stocks/repositories/IStocksRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateStockUseCase } from './CreateStockUseCase';

let createStockUseCase: CreateStockUseCase;
let itemRepository: FakeItemsRepository;
let stockRepository: IStocksRepository;
describe('Create stock useCase', () => {
  beforeEach(() => {
    itemRepository = new FakeItemsRepository();
    stockRepository = new FakeStockRepository();
    createStockUseCase = new CreateStockUseCase(
      stockRepository,
      itemRepository,
    );
  });

  it('should be able to input in stock without expiration date', async () => {
    const item = await itemRepository.create({
      userId: '12345',
      name: 'Detergente',
      category: 'produtos de limpeza',
      measureUnity: 'QTD',
    });

    const stock = await createStockUseCase.execute({
      itemId: item.id,
      quantity: 10,
      value: 500,
      type: 'input',
    });

    expect(stock).toHaveProperty('id');
    expect(stock.type).toEqual('input');
  });

  it('should be able to input in stock with expiration date', async () => {
    const item = await itemRepository.create({
      userId: '12345',
      name: 'Detergente',
      category: 'produtos de limpeza',
      measureUnity: 'QTD',
    });

    const stock = await createStockUseCase.execute({
      itemId: item.id,
      quantity: 10,
      value: 500,
      type: 'input',
      expirationDate: '2021-07-20',
    });

    expect(stock).toHaveProperty('id');
  });

  it('should not be able to input in stock with invalid value', async () => {
    const item = await itemRepository.create({
      userId: '12345',
      name: 'Detergente',
      category: 'produtos de limpeza',
      measureUnity: 'QTD',
    });

    return expect(async () => {
      await createStockUseCase.execute({
        itemId: item.id,
        quantity: 10,
        value: -500,
        type: 'input',
        expirationDate: '2021-07-20',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to input in stock with invalid quantity', async () => {
    const item = await itemRepository.create({
      userId: '12345',
      name: 'Detergente',
      category: 'produtos de limpeza',
      measureUnity: 'QTD',
    });
    return expect(async () => {
      await createStockUseCase.execute({
        itemId: item.id,
        quantity: -10,
        value: 500,
        type: 'input',
        expirationDate: '2021-07-20',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to input in stock with invalid item', async () => {
    return expect(async () => {
      await createStockUseCase.execute({
        itemId: '12',
        quantity: -10,
        value: 500,
        type: 'input',
        expirationDate: '2021-07-20',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to output in stock', async () => {
    const item = await itemRepository.create({
      userId: '12345',
      name: 'Detergente',
      category: 'produtos de limpeza',
      measureUnity: 'QTD',
    });

    await createStockUseCase.execute({
      itemId: item.id,
      quantity: 10,
      value: 500,
      type: 'input',
    });

    const stock = await createStockUseCase.execute({
      itemId: item.id,
      quantity: 10,
      value: 500,
      type: 'output',
    });

    expect(stock).toHaveProperty('id');
    expect(stock.type).toEqual('output');
  });

  it('should not be able to output in stock with invalid stock quantity', async () => {
    const item = await itemRepository.create({
      userId: '12345',
      name: 'Detergente',
      category: 'produtos de limpeza',
      measureUnity: 'QTD',
    });

    await createStockUseCase.execute({
      itemId: item.id,
      quantity: 10,
      value: 500,
      type: 'input',
    });

    return expect(async () => {
      await createStockUseCase.execute({
        itemId: item.id,
        quantity: 11,
        value: 500,
        type: 'output',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
