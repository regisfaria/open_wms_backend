import { IStockRecordDTO } from '../dtos/IStockRecordDTO';
import { Stock } from '../infra/typeorm/entities/Stock';

interface IStocksRepository {
  create(data: IStockRecordDTO): Promise<Stock>;
  update(stock: Stock): Promise<Stock>;
  sumTotalQtd(itemId: string): Promise<number>;
  sumBalance(itemId: string): Promise<number>;
  findAllByItemId(itemId: string): Promise<Stock[]>;
}

export { IStocksRepository };
