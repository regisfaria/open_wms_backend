import { ICreateItemDTO } from '../dtos/ICreateItemDTO';
import { Item } from '../infra/typeorm/entities/Item';

export interface IItemsRepository {
  create(data: ICreateItemDTO): Promise<Item>;
  update(item: Item): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Item>;
  findAllFromUser(userId: string): Promise<Item[]>;
  findByNameFromUser(name: string, userId: string): Promise<Item>;
}
