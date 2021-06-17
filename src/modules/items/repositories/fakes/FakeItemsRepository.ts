import { v4 as uuid } from 'uuid';

import { ICreateItemDTO } from '@modules/items/dtos/ICreateItemDTO';
import { Item } from '@modules/items/infra/typeorm/entities/Item';

import { IItemsRepository } from '../IItemsRepository';

export class FakeItemsRepository implements IItemsRepository {
  private items: Item[] = [];

  async create(data: ICreateItemDTO): Promise<Item> {
    const item = new Item();

    Object.assign(item, { id: uuid(), ...data });

    this.items.push(item);

    return item;
  }

  update(item: Item): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<Item> {
    throw new Error('Method not implemented.');
  }

  findAllFromUser(userId: string): Promise<Item[]> {
    throw new Error('Method not implemented.');
  }

  async findByNameFromUser(name: string, userId: string): Promise<Item> {
    return this.items.find(
      item => item.name === name && item.userId === userId,
    );
  }
}
