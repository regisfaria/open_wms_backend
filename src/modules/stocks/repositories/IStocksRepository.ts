import { IInputStockDTO } from '../dtos/IInputStockDTO';
import { Stock } from '../infra/typeorm/entities/Stock';

export interface IStocksRepository {
  input(data: IInputStockDTO): Promise<Stock>;
}
