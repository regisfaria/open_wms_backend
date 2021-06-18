import { AppError } from '@shared/errors/AppError';

import { FakeUsersRepository } from '../../repositories/fakes/FakeUsersRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let fakeUsersRepository: FakeUsersRepository;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUserUseCase = new CreateUserUseCase(fakeUsersRepository);

    authenticateUserUseCase = new AuthenticateUserUseCase(fakeUsersRepository);
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
