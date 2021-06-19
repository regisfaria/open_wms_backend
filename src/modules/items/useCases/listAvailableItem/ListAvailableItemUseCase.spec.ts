import { FakeItemsRepository } from '@modules/items/repositories/fakes/FakeItemsRepository';

import { ListAvailableItemUseCase } from './ListAvailableItemUseCase';

let itemsRepository: FakeItemsRepository;
let listAvailableItemUseCase: ListAvailableItemUseCase;
describe('List item useCase', () => {
  beforeEach(() => {
    itemsRepository = new FakeItemsRepository();
    listAvailableItemUseCase = new ListAvailableItemUseCase(itemsRepository);
  });
  it('should be able to list all available items', async () => {
    const item = await itemsRepository.create({
      category: 'Pneus',
      measureUnity: 'QTD',
      name: 'Pneu aro 15',
      userId: '124',
      daysToNotifyExpirationDate: 1,
      minimumStock: 10,
    });

    const items = await listAvailableItemUseCase.execute({ userId: '124' });

    expect(items).toEqual([item]);
  });

  it('should be able to list all available items by name', async () => {
    await itemsRepository.create({
      category: 'Pneus',
      measureUnity: 'QTD',
      name: 'Pneu aro 15',
      userId: '124',
      daysToNotifyExpirationDate: 1,
      minimumStock: 10,
    });

    const item = await itemsRepository.create({
      category: 'Pneus',
      measureUnity: 'QTD',
      name: 'Pneu aro 14',
      userId: '124',
      daysToNotifyExpirationDate: 1,
      minimumStock: 10,
    });

    const items = await listAvailableItemUseCase.execute({
      userId: '124',
      name: 'Pneu aro 14',
    });

    expect(items).toEqual([item]);
  });

  it('should be able to list all available items by category', async () => {
    await itemsRepository.create({
      category: 'Pneus',
      measureUnity: 'QTD',
      name: 'Pneu aro 15',
      userId: '124',
      daysToNotifyExpirationDate: 1,
      minimumStock: 10,
    });

    const item = await itemsRepository.create({
      category: 'Suspensão',
      measureUnity: 'QTD',
      name: 'Suspensão de sedan',
      userId: '124',
      daysToNotifyExpirationDate: 1,
      minimumStock: 10,
    });

    const items = await listAvailableItemUseCase.execute({
      userId: '124',
      category: 'Suspensão',
    });

    expect(items).toEqual([item]);
  });

  it('should be able to list all available items by measureUnity', async () => {
    await itemsRepository.create({
      category: 'Oleo',
      measureUnity: 'Litros',
      name: 'Oleo marca x',
      userId: '124',
      daysToNotifyExpirationDate: 1,
      minimumStock: 10,
    });

    const item = await itemsRepository.create({
      category: 'Pneus',
      measureUnity: 'QTD',
      name: 'Pneu aro 14',
      userId: '124',
      daysToNotifyExpirationDate: 1,
      minimumStock: 10,
    });

    const items = await listAvailableItemUseCase.execute({
      userId: '124',
      measureUnity: 'QTD',
    });

    expect(items).toEqual([item]);
  });

  it('should not be able to list available items to other user', async () => {
    await itemsRepository.create({
      category: 'Oleo',
      measureUnity: 'Litros',
      name: 'Oleo marca x',
      userId: '125',
      daysToNotifyExpirationDate: 1,
      minimumStock: 10,
    });

    const item = await itemsRepository.create({
      category: 'Pneus',
      measureUnity: 'QTD',
      name: 'Pneu aro 14',
      userId: '124',
      daysToNotifyExpirationDate: 1,
      minimumStock: 10,
    });

    const items = await listAvailableItemUseCase.execute({
      userId: '124',
    });

    expect(items).toEqual([item]);
  });
});
