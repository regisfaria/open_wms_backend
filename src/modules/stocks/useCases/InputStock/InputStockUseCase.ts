import { inject, injectable } from 'tsyringe';

import { IItemsRepository } from '@modules/items/repositories/IItemsRepository';
import { IInputStockDTO } from '@modules/stocks/dtos/IInputStockDTO';
import { Stock } from '@modules/stocks/infra/typeorm/entities/Stock';
import { IStocksRepository } from '@modules/stocks/repositories/IStocksRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class InputStockUseCase {
  constructor(
    @inject('StocksRepository')
    private stockRepository: IStocksRepository,
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  async execute({
    itemId,
    quantity,
    value,
    expirationDate,
  }: IInputStockDTO): Promise<Stock> {
    const itemExist = await this.itemsRepository.findById(itemId);

    if (!itemExist) {
      throw new AppError('Item não existe');
    }

    if (quantity < 1 || !Number.isInteger(quantity)) {
      throw new AppError('Quantidade a ser inserida invalida');
    }

    if (value < 1) {
      throw new AppError('Valor do estoque invalido');
    }

    const stock = await this.stockRepository.input({
      itemId,
      quantity,
      value,
      expirationDate,
    });

    return stock;
  }
}

export { InputStockUseCase };
