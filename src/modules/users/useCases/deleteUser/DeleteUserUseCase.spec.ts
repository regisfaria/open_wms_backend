import { FakeUsersTokensRepository } from '@modules/users/repositories/fakes/FakeUsersTokensRepository';
import { FakeMailProvider } from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import { AppError } from '@shared/errors/AppError';

import { FakeUsersRepository } from '../../repositories/fakes/FakeUsersRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { DeleteUserUseCase } from './DeleteUserUseCase';

let usersRepository: FakeUsersRepository;
let usersTokensRepository: FakeUsersTokensRepository;
let mailProvider: FakeMailProvider;

let createUserUseCase: CreateUserUseCase;
let deleteUserUseCase: DeleteUserUseCase;

describe('DeleteUser', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    usersTokensRepository = new FakeUsersTokensRepository();
    mailProvider = new FakeMailProvider();

    createUserUseCase = new CreateUserUseCase(
      usersRepository,
      usersTokensRepository,
      mailProvider,
    );
    deleteUserUseCase = new DeleteUserUseCase(usersRepository);
  });

  it('should be able to delete an user', async () => {
    const userData = {
      name: 'John Doe',
      password: '123456',
      login: 'johndoe',
      email: 'johndoe@email.com',
      phone: '(12)93456-7890',
    };

    const user = await createUserUseCase.execute(userData);

    await expect(deleteUserUseCase.execute(user.id)).resolves;
  });

  it('should not be able to delete an user that does not exists', async () => {
    await expect(
      deleteUserUseCase.execute('non-existing-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
