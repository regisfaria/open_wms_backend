import { FakeUsersTokensRepository } from '@modules/users/repositories/fakes/FakeUsersTokensRepository';
import { FakeMailProvider } from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import { AppError } from '@shared/errors/AppError';

import { FakeUsersRepository } from '../../repositories/fakes/FakeUsersRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepository: FakeUsersRepository;
let usersTokensRepository: FakeUsersTokensRepository;
let mailProvider: FakeMailProvider;

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    usersTokensRepository = new FakeUsersTokensRepository();
    mailProvider = new FakeMailProvider();

    createUserUseCase = new CreateUserUseCase(
      usersRepository,
      usersTokensRepository,
      mailProvider,
    );
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
  });

  it('should be able to authenticate an user', async () => {
    const userData = {
      name: 'John Doe',
      password: '123456',
      login: 'johndoe',
      email: 'johndoe@email.com',
      phone: '(12)93456-7890',
    };

    await createUserUseCase.execute(userData);

    const auth = await authenticateUserUseCase.execute({
      login: userData.login,
      password: userData.password,
    });

    expect(auth).toHaveProperty('token');
  });

  it('should not be able to authenticate a non-existent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        login: 'non-existing-login',
        password: '112344',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an user with wrong password', async () => {
    const userData = {
      name: 'John Doe',
      password: '123456',
      login: 'johndoe',
      email: 'johndoe@email.com',
      phone: '(12)93456-7890',
    };

    await createUserUseCase.execute(userData);

    await expect(
      authenticateUserUseCase.execute({
        login: userData.login,
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
