import { ICreateItemDTO } from '../dtos/ICreateItemDTO';
import { IListAvailableItemsDTO } from '../dtos/IListAvailableItemsDTO';
import { Item } from '../infra/typeorm/entities/Item';

export interface IItemsRepository {
  create(data: ICreateItemDTO): Promise<Item>;
  update(item: Item): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Item>;
  findByNameFromUser(name: string, userId: string): Promise<Item>;
  findAll(): Promise<Item[]>;
  listAvailableAllFromUser(data: IListAvailableItemsDTO): Promise<Item[]>;
}
