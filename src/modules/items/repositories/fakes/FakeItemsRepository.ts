import { v4 as uuid } from 'uuid';

import { ICreateItemDTO } from '@modules/items/dtos/ICreateItemDTO';
import { IListAvailableItemsDTO } from '@modules/items/dtos/IListAvailableItemsDTO';
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

  async update(item: Item): Promise<void> {
    const itemIndex = this.items.findIndex(
      itemToFind => itemToFind.id === item.id,
    );

    this.items[itemIndex] = item;
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<Item> {
    return this.items.find(item => item.id === id);
  }

  async findByNameAndUserId(name: string, userId: string): Promise<Item> {
    return this.items.find(
      item => item.name === name && item.userId === userId,
    );
  }

  async findAllAvailableByUserId({
    userId,
    category,
    measureUnity,
    name,
  }: IListAvailableItemsDTO): Promise<Item[]> {
    const items = this.items.filter(item => {
      if (
        (category && item.category === category) ||
        (measureUnity && item.measureUnity === measureUnity) ||
        (name && item.name === name && item.userId === userId)
      ) {
        return item;
      }

      if (!category && !measureUnity && !name && item.userId === userId) {
        return item;
      }

      return null;
    });

    return items;
  }

  async findAll(): Promise<Item[]> {
    return this.items;
  }
}
