import { inject, injectable } from 'tsyringe';

import { IItemsRepository } from '@modules/items/repositories/IItemsRepository';
import { IStockRecordDTO } from '@modules/stocks/dtos/IStockRecordDTO';
import { Stock } from '@modules/stocks/infra/typeorm/entities/Stock';
import { IStocksRepository } from '@modules/stocks/repositories/IStocksRepository';
import { AppError } from '@shared/errors/AppError';

import { CalculateStockItemUseCase } from '../calculateStockItem/calculateStockItemUseCase';

@injectable()
class OutputStockUseCase {
  constructor(
    @inject('StocksRepository')
    private stockRepository: IStocksRepository,
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
    private calculateStockItem: CalculateStockItemUseCase,
  ) {}

  async execute({
    itemId,
    quantity,
    value,
    expirationDate,
  }: IStockRecordDTO): Promise<Stock> {
    const itemExist = await this.itemsRepository.findById(itemId);

    if (!itemExist) {
      throw new AppError('Item não existe');
    }

    const quantityInStock = await this.calculateStockItem.execute(itemId);

    if (quantityInStock - quantity < 0 || quantity <= 0) {
      throw new AppError('Quantidade a ser removida invalida');
    }

    if (value < 1) {
      throw new AppError('Valor do estoque invalido');
    }

    const stock = await this.stockRepository.output({
      itemId,
      quantity,
      value,
      expirationDate,
    });

    return stock;
  }
}

export { OutputStockUseCase };
