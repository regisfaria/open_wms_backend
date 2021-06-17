import { getRepository, Repository } from 'typeorm';

import { ICreateItemDTO } from '@modules/items/dtos/ICreateItemDTO';
import { IItemsRepository } from '@modules/items/repositories/IItemsRepository';

import { Item } from '../entities/Item';

class ItemsRepository implements IItemsRepository {
  private repository: Repository<Item>;

  constructor() {
    this.repository = getRepository(Item);
  }

  async create({
    category,
    measureUnity,
    name,
    userId,
    daysToNotifyExpirationDate,
    image,
    minimumStock,
  }: ICreateItemDTO): Promise<Item> {
    const item = this.repository.create({
      category,
      measureUnity,
      name,
      userId,
      daysToNotifyExpirationDate,
      image,
      minimumStock,
    });

    await this.repository.save(item);

    return item;
  }

  async update(item: Item): Promise<void> {
    await this.repository.save(item);
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<Item> {
    const item = await this.repository.findOne(id);

    return item;
  }
  findAllFromUser(userId: string): Promise<Item[]> {
    throw new Error('Method not implemented.');
  }
  async findByNameFromUser(name: string, userId: string): Promise<Item> {
    const item = await this.repository.findOne({ where: { userId, name } });

    return item;
  }
}

export { ItemsRepository };
