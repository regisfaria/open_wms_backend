import { FakeItemsRepository } from '@modules/items/repositories/fakes/FakeItemsRepository';
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { FakeUsersTokensRepository } from '@modules/users/repositories/fakes/FakeUsersTokensRepository';
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase';
import { FakeMailProvider } from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import { AppError } from '@shared/errors/AppError';

import { UploadItemImageUseCase } from './UploadItemImageUseCase';

let itemsRepository: FakeItemsRepository;
let usersRepository: FakeUsersRepository;
let usersTokensRepository: FakeUsersTokensRepository;
let mailProvider: FakeMailProvider;

let createUserUseCase: CreateUserUseCase;
let uploadItemImageUseCase: UploadItemImageUseCase;

describe('UploadItemImage', () => {
  beforeEach(() => {
    itemsRepository = new FakeItemsRepository();
    usersRepository = new FakeUsersRepository();
    usersTokensRepository = new FakeUsersTokensRepository();
    mailProvider = new FakeMailProvider();

    createUserUseCase = new CreateUserUseCase(
      usersRepository,
      usersTokensRepository,
      mailProvider,
    );

    uploadItemImageUseCase = new UploadItemImageUseCase(itemsRepository);
  });

  it('should be able to upload item image', async () => {
    const userData = {
      name: 'John Doe',
      password: '123456',
      login: 'johndoe',
      email: 'johndoe@email.com',
      phone: '(12)93456-7890',
    };

    const user = await createUserUseCase.execute(userData);

    const item = await itemsRepository.create({
      category: 'Food',
      measureUnity: 'KG',
      name: 'Apple',
      userId: user.id,
    });

    await expect(
      uploadItemImageUseCase.execute({
        itemId: item.id,
        imageName: 'appleImage.png',
      }),
    ).resolves;
  });

  it('should not be able to upload an item image for an item that does not exists', async () => {
    await expect(
      uploadItemImageUseCase.execute({
        itemId: 'non-existing-item-id',
        imageName: 'appleImage.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
