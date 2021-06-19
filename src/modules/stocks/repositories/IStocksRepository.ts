import { IStockRecordDTO } from '../dtos/IStockRecordDTO';
import { Stock } from '../infra/typeorm/entities/Stock';

interface IStocksRepository {
  input(data: IStockRecordDTO): Promise<Stock>;
  output(data: IStockRecordDTO): Promise<Stock>;
  sumInput(itemId: string): Promise<number>;
  sumOutput(itemId: string): Promise<number>;
  sumBalance(itemId: string): Promise<number>;
}

export { IStocksRepository };
