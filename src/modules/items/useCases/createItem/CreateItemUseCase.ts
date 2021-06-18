import { inject, injectable } from 'tsyringe';

import { Item } from '@modules/items/infra/typeorm/entities/Item';
import { IItemsRepository } from '@modules/items/repositories/IItemsRepository';
import { AppError } from '@shared/errors/AppError';

import { ICreateItemDTO } from '../../dtos/ICreateItemDTO';

@injectable()
class CreateItemUseCase {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  async execute({
    category,
    measureUnity,
    name,
    userId,
    daysToNotifyExpirationDate,
    minimumStock,
  }: ICreateItemDTO): Promise<Item> {
    const itemAlreadyExist = await this.itemsRepository.findByNameFromUser(
      name,
      userId,
    );

    if (itemAlreadyExist) {
      throw new AppError('Item já cadastrado');
    }

    const item = await this.itemsRepository.create({
      category,
      measureUnity,
      name,
      userId,
      daysToNotifyExpirationDate,
      minimumStock,
    });

    return item;
  }
}

export { CreateItemUseCase };
