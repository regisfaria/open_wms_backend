import { inject, injectable } from 'tsyringe';

import { IListAvailableItemsDTO } from '@modules/items/dtos/IListAvailableItemsDTO';
import { Item } from '@modules/items/infra/typeorm/entities/Item';
import { IItemsRepository } from '@modules/items/repositories/IItemsRepository';

@injectable()
class ListAvailableItemUseCase {
  constructor(
    @inject('ItemsRepository')
    private itemRepository: IItemsRepository,
  ) {}
  async execute({
    name,
    category,
    measureUnity,
    userId,
  }: IListAvailableItemsDTO): Promise<Item[]> {
    const items = await this.itemRepository.findAllAvailableByUserId({
      userId,
      category,
      measureUnity,
      name,
    });

    return items;
  }
}

export { ListAvailableItemUseCase };
