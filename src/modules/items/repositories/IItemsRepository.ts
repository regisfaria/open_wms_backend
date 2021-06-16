import { ICreateItemDTO } from '../dtos/ICreateItemDTO';
import { Item } from '../infra/typeorm/entities/Item';

export interface IItemsRepository {
  create(data: ICreateItemDTO): Promise<Item>;
  update(item: Item): Promise<Item>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Item>;
  findAllFromUser(userId: string): Promise<Item[]>;
}
