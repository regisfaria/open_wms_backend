import { inject, injectable } from 'tsyringe';

import { IItemsRepository } from '@modules/items/repositories/IItemsRepository';
import { AppError } from '@shared/errors/AppError';

import { deleteFile } from '../../../../utils/file';

interface IRequest {
  itemId: string;
  imagem_name?: string;
}

@injectable()
class UploadItemImageUseCase {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}
  async execute({ itemId, imagem_name }: IRequest): Promise<void> {
    const item = await this.itemsRepository.findById(itemId);

    if (!item) {
      throw new AppError('Item não cadastrado');
    }

    if (item.image) {
      await deleteFile(`./tmp/items/${item.image}`);
    }

    item.image = imagem_name;

    await this.itemsRepository.update(item);
  }
}

export { UploadItemImageUseCase };
