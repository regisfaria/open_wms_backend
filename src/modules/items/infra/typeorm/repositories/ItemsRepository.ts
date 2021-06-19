import { getRepository, Repository } from 'typeorm';

import { ICreateItemDTO } from '@modules/items/dtos/ICreateItemDTO';
import { IListAvailableItemsDTO } from '@modules/items/dtos/IListAvailableItemsDTO';
import { IItemsRepository } from '@modules/items/repositories/IItemsRepository';
import { AppError } from '@shared/errors/AppError';

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

  async listAvailableAllFromUser({
    userId,
    name,
    category,
    measureUnity,
  }: IListAvailableItemsDTO): Promise<Item[]> {
    const itemsQuery = this.repository
      .createQueryBuilder('items')
      .where('items.active = true')
      .andWhere('items.userId = :userId', { userId })
      .select(
        'items.id as id, items.userId as userId, items.name as name, items.category, items.minimumStock, items.daysToNotifyExpirationDate,items.image as image, items.active as active, items.createdAt as createdAt, items.updatedAt as updatedAt, items.measureUnity as measureUnity',
      );

    if (name) {
      itemsQuery.andWhere('items.name = :name', { name });
    }
    if (category) {
      itemsQuery.andWhere('items.category = :category', { category });
    }

    if (measureUnity) {
      itemsQuery.andWhere('items.measureUnity = :measureUnity', {
        measureUnity,
      });
    }

    const items = await itemsQuery.execute();

    return items;
  }
}

export { ItemsRepository };
