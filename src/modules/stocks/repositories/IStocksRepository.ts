import { ICreateStockDTO } from '../dtos/ICreateStockDTO';
import { IFindAllFromUserDTO } from '../dtos/IFindAllFromUserDTO';
import { Stock } from '../infra/typeorm/entities/Stock';

export interface IStocksRepository {
  create(data: ICreateStockDTO): Promise<Stock>;
  // update(item: Item): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Stock>;
  findAllFromUser(data: IFindAllFromUserDTO): Promise<Stock[]>;
}
