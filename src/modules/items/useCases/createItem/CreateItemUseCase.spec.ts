import { FakeItemsRepository } from '@modules/items/repositories/fakes/FakeItemsRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateItemUseCase } from './CreateItemUseCase';

let itemsRepository: FakeItemsRepository;
let createItemUseCase: CreateItemUseCase;

describe('Create item useCase', () => {
  beforeEach(() => {
    itemsRepository = new FakeItemsRepository();

    createItemUseCase = new CreateItemUseCase(itemsRepository);
  });

  it('should be able to create a new item with all opcional fields ', async () => {
    const itemData = {
      userId: '12345',
      name: 'Massa de tomate',
      category: 'perecíveis',
      minimumStock: 10,
      daysToNotifyExpirationDate: 3,
      image: 'image6674438.png',
      measureUnity: 'QTD',
    };

    const item = await createItemUseCase.execute(itemData);

    expect(item).toHaveProperty('id');
  });

  it('should be able to create a new item with no opcional fields ', async () => {
    const itemData = {
      userId: '12345',
      name: 'Detergente',
      category: 'produtos de limpeza',
      measureUnity: 'QTD',
    };

    const item = await createItemUseCase.execute(itemData);

    expect(item).toHaveProperty('id');
  });

  it('should not be able to create a new item with same name and userId', async () => {
    return expect(async () => {
      const itemData = {
        userId: '12345',
        name: 'Sabão em pó',
        category: 'produtos de limpeza',
        measureUnity: 'QTD',
      };

      await createItemUseCase.execute(itemData);

      await createItemUseCase.execute(itemData);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new item with same name and different userId', async () => {
    const itemDataFirstUser = {
      userId: '12345',
      name: 'Sabão em pó',
      category: 'produtos de limpeza',
      measureUnity: 'QTD',
    };

    const itemDataSecondUser = {
      userId: '12345987',
      name: 'Sabão em pó',
      category: 'produtos de limpeza',
      measureUnity: 'QTD',
    };

    const itemToFirstUser = await createItemUseCase.execute(itemDataFirstUser);

    const itemToSecondUser = await createItemUseCase.execute(
      itemDataSecondUser,
    );

    expect(itemToFirstUser).toHaveProperty('id');
    expect(itemToSecondUser).toHaveProperty('id');
  });
});
