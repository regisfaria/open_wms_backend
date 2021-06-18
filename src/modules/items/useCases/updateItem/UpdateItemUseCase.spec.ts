import { FakeItemsRepository } from '@modules/items/repositories/fakes/FakeItemsRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateItemUseCase } from '../createItem/CreateItemUseCase';
import { UpdateItemUseCase } from './UpdateItemUseCase';

let itemRepository: FakeItemsRepository;
let updateItemUseCase: UpdateItemUseCase;
let createItemUseCase: CreateItemUseCase;

describe('Update item useCase', () => {
  beforeEach(() => {
    itemRepository = new FakeItemsRepository();

    updateItemUseCase = new UpdateItemUseCase(itemRepository);
    createItemUseCase = new CreateItemUseCase(itemRepository);
  });

  it('should be able to update item data', async () => {
    const itemData = {
      userId: '12345',
      name: 'Massa de tomate',
      category: 'perecíveis',
      minimumStock: 10,
      daysToNotifyExpirationDate: 3,
      image: 'image6674438.png',
      measureUnity: 'QTD',
    };

    const oldItem = await createItemUseCase.execute(itemData);

    const updatedUser = await updateItemUseCase.execute({
      id: oldItem.id,
      category: 'Temperos',
      daysToNotifyExpirationDate: 15,
      image: 'tomato.png',
      measureUnity: 'Unidade',
      minimumStock: 10,
      name: 'Massa de tomate 500ml',
      userId: '12345',
    });

    expect(updatedUser.name).toBe('Massa de tomate 500ml');
    expect(updatedUser.minimumStock).toBe(10);
    expect(updatedUser.measureUnity).toBe('Unidade');
    expect(updatedUser.image).toBe('tomato.png');
    expect(updatedUser.daysToNotifyExpirationDate).toBe(15);
    expect(updatedUser.category).toBe('Temperos');
  });

  it('should be able to update only one item information', async () => {
    const itemData = {
      userId: '12345',
      name: 'Massa de tomate',
      category: 'perecíveis',
      minimumStock: 10,
      daysToNotifyExpirationDate: 3,
      image: 'image6674438.png',
      measureUnity: 'QTD',
    };

    const oldItem = await createItemUseCase.execute(itemData);

    const updatedUser = await updateItemUseCase.execute({
      id: oldItem.id,
      category: 'Molhos',
      userId: '12345',
    });

    expect(updatedUser.category).toBe('Molhos');
  });

  it('should not be able to update one item without passing any new values', async () => {
    const itemData = {
      userId: '12345',
      name: 'Massa de tomate',
      category: 'perecíveis',
      minimumStock: 10,
      daysToNotifyExpirationDate: 3,
      image: 'image6674438.png',
      measureUnity: 'QTD',
    };

    const oldItem = await createItemUseCase.execute(itemData);

    await expect(
      updateItemUseCase.execute({
        id: oldItem.id,
        userId: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a non-existing item', async () => {
    await expect(
      updateItemUseCase.execute({
        id: 'non-existing-id',
        name: 'Carne',
        userId: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update one item with invalid day to notify expiration date', async () => {
    const itemData = {
      userId: '12345',
      name: 'Massa de tomate',
      category: 'perecíveis',
      minimumStock: 10,
      daysToNotifyExpirationDate: 3,
      image: 'image6674438.png',
      measureUnity: 'QTD',
    };

    const oldItem = await createItemUseCase.execute(itemData);

    await expect(
      updateItemUseCase.execute({
        id: oldItem.id,
        userId: '12345',
        daysToNotifyExpirationDate: -1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update one item with invalid minimum stock', async () => {
    const itemData = {
      userId: '12345',
      name: 'Massa de tomate',
      category: 'perecíveis',
      minimumStock: 10,
      daysToNotifyExpirationDate: 3,
      image: 'image6674438.png',
      measureUnity: 'QTD',
    };

    const oldItem = await createItemUseCase.execute(itemData);

    await expect(
      updateItemUseCase.execute({
        id: oldItem.id,
        userId: '12345',
        minimumStock: -1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
