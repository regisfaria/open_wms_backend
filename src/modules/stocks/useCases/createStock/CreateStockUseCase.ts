import { inject, injectable } from 'tsyringe';

import { IItemsRepository } from '@modules/items/repositories/IItemsRepository';
import { Stock } from '@modules/stocks/infra/typeorm/entities/Stock';
import { IStocksRepository } from '@modules/stocks/repositories/IStocksRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  type: string;
  itemId: string;
  quantity: number;
  value: number;
  expirationDate: string;
}

@injectable()
class CreateStockUseCase {
  constructor(
    @inject('StocksRepository')
    private stockRepository: IStocksRepository,

    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  async execute({
    type,
    itemId,
    quantity,
    value,
    expirationDate,
  }: IRequest): Promise<Stock> {
    const isKnownType = ['input', 'output'].includes(type);

    if (!isKnownType) {
      throw new AppError('Tipo de estoque desconhecido.');
    }

    const item = await this.itemsRepository.findById(itemId);

    if (!item) {
      throw new AppError('Item não existe');
    }

    if (quantity < 1) {
      throw new AppError('Quantidade a ser inserida invalida');
    }

    if (value <= 0) {
      throw new AppError('Valor do estoque invalido');
    }

    const stock = await this.stockRepository.create({
      type,
      itemId,
      quantity,
      value,
      expirationDate,
    });

    if (item.notified) {
      item.notified = false;

      await this.itemsRepository.update(item);
    }

    return stock;
  }
}

export { CreateStockUseCase };
