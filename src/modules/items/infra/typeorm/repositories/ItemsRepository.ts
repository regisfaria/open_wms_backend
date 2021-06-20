import { getRepository, Repository } from 'typeorm';

import { ICreateItemDTO } from '@modules/items/dtos/ICreateItemDTO';
import { IListAvailableItemsDTO } from '@modules/items/dtos/IListAvailableItemsDTO';
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

  async update(item: Item): Promise<Item> {
    await this.repository.save(item);

    return item;
  }

  async findById(id: string): Promise<Item> {
    const item = await this.repository.findOne(id);

    return item;
  }

  async findAllFromUser(userId: string): Promise<Item[]> {
    const allItems = await this.repository.find({ where: { userId } });

    return allItems.map(item => {
      if (item.image) {
        item.imageUrl = `${process.env.APP_API_URL}/files/${item.image}`;
      }

      return item;
    });
  }

  async findByNameAndUserId(name: string, userId: string): Promise<Item> {
    const item = await this.repository.findOne({ where: { userId, name } });

    return item;
  }

  async findAllAvailableByUserId({
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
        'items.id as id, items.userId as userId, items.name as name, items.category, items.minimumStock, items.daysToNotifyExpirationDate,items.image as image, items.createdAt as createdAt, items.updatedAt as updatedAt, items.measureUnity as measureUnity',
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

    return items.map(item => {
      if (item.image) {
        item.imageUrl = `${process.env.APP_API_URL}/files/${item.image}`;
      }

      return item;
    });
  }

  async findAll(): Promise<Item[]> {
    const items = await this.repository.find();

    return items;
  }
}

export { ItemsRepository };
