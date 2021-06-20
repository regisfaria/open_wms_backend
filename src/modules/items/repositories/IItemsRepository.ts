import { ICreateItemDTO } from '../dtos/ICreateItemDTO';
import { IListAvailableItemsDTO } from '../dtos/IListAvailableItemsDTO';
import { Item } from '../infra/typeorm/entities/Item';

export interface IItemsRepository {
  create(data: ICreateItemDTO): Promise<Item>;
  update(item: Item): Promise<Item>;
  findById(id: string): Promise<Item>;
  findByNameAndUserId(name: string, userId: string): Promise<Item>;
  findAll(): Promise<Item[]>;
  findAllAvailableByUserId(data: IListAvailableItemsDTO): Promise<Item[]>;
}
