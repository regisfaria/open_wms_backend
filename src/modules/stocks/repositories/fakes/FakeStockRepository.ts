// import { v4 as uuid } from 'uuid';

// import { IStockRecordDTO } from '@modules/stocks/dtos/IStockRecordDTO';
// import { Stock } from '@modules/stocks/infra/typeorm/entities/Stock';

// import { IStocksRepository } from '../IStocksRepository';

// class FakeStockRepository implements IStocksRepository {
//   private stocks: Stock[] = [];

//   async sumInput(itemId: string): Promise<number> {
//     const allQuantity: number[] = [];
//     this.stocks.filter(stock => {
//       if (stock.itemId === itemId && stock.type === 'input') {
//         allQuantity.push(stock.quantity);
//       }
//       return stock;
//     });

//     const quantity = allQuantity.reduce(
//       (accumulator, currentValue) => accumulator + currentValue,
//       0,
//     );

//     return quantity;
//   }

//   async sumOutput(itemId: string): Promise<number> {
//     const allQuantity: number[] = [];
//     this.stocks.filter(stock => {
//       if (stock.itemId === itemId && stock.type === 'output') {
//         allQuantity.push(stock.quantity);
//       }
//       return stock;
//     });

//     const quantity = allQuantity.reduce(
//       (accumulator, currentValue) => accumulator + currentValue,
//       0,
//     );

//     return quantity;
//   }

//   async input(data: IStockRecordDTO): Promise<Stock> {
//     const stock = new Stock();

//     Object.assign(stock, { id: uuid(), ...data, type: 'input' });

//     this.stocks.push(stock);

//     return stock;
//   }

//   async output(data: IStockRecordDTO): Promise<Stock> {
//     const stock = new Stock();

//     Object.assign(stock, { id: uuid(), ...data, type: 'output' });

//     this.stocks.push(stock);

//     return stock;
//   }

//   async sumBalance(itemId: string): Promise<number> {
//     const valueOutput: number[] = [];
//     this.stocks.filter(stock => {
//       if (stock.itemId === itemId && stock.type === 'output') {
//         valueOutput.push(stock.value);
//       }
//       return stock;
//     });

//     const sumValueOutput = valueOutput.reduce(
//       (accumulator, currentValue) => accumulator + currentValue,
//       0,
//     );

//     const valueInput: number[] = [];
//     this.stocks.filter(stock => {
//       if (stock.itemId === itemId && stock.type === 'input') {
//         valueInput.push(stock.value);
//       }
//       return stock;
//     });

//     const sumValueInput = valueInput.reduce(
//       (accumulator, currentValue) => accumulator + currentValue,
//       0,
//     );

//     return sumValueOutput - sumValueInput;
//   }
// }

// export { FakeStockRepository };
