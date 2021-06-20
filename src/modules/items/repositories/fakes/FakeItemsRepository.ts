import { v4 as uuid } from 'uuid';

import { ICreateItemDTO } from '@modules/items/dtos/ICreateItemDTO';
import { IListAvailableItemsDTO } from '@modules/items/dtos/IListAvailableItemsDTO';
import { Item } from '@modules/items/infra/typeorm/entities/Item';

import { IItemsRepository } from '../IItemsRepository';

export class FakeItemsRepository implements IItemsRepository {
  private items: Item[] = [];

  async create(data: ICreateItemDTO): Promise<Item> {
    const item = new Item();

    Object.assign(item, {
      id: uuid(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.items.push(item);

    return item;
  }

  async update(item: Item): Promise<Item> {
    const itemIndex = this.items.findIndex(
      itemToFind => itemToFind.id === item.id,
    );

    this.items[itemIndex] = item;

    return item;
  }

  async findById(id: string): Promise<Item> {
    const item = this.items.find(item => item.id === id);

    return item;
  }

  async findByNameAndUserId(name: string, userId: string): Promise<Item> {
    const item = this.items.find(
      item => item.name === name && item.userId === userId,
    );

    return item;
  }

  async findAllAvailableByUserId({
    userId,
    category,
    measureUnity,
    name,
  }: IListAvailableItemsDTO): Promise<Item[]> {
    let items = this.items.filter(
      item => item.userId === userId && item.active,
    );

    if (name) {
      items = this.items.filter(item => item.name === name);
    }

    if (category) {
      items = this.items.filter(item => item.category === category);
    }

    if (measureUnity) {
      items = this.items.filter(item => item.measureUnity === measureUnity);
    }

    return items;
  }

  async findAll(): Promise<Item[]> {
    return this.items;
  }
}
