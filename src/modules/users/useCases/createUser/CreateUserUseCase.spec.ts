import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { FakeUsersTokensRepository } from '@modules/users/repositories/fakes/FakeUsersTokensRepository';
import { FakeMailProvider } from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from './CreateUserUseCase';

let usersRepository: FakeUsersRepository;
let usersTokensRepository: FakeUsersTokensRepository;
let mailProvider: FakeMailProvider;
let createUserUseCase: CreateUserUseCase;

describe('CreateUser', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    usersTokensRepository = new FakeUsersTokensRepository();
    mailProvider = new FakeMailProvider();

    createUserUseCase = new CreateUserUseCase(
      usersRepository,
      usersTokensRepository,
      mailProvider,
    );
  });

  it('should be able to create an user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    const userData = {
      name: 'John Doe',
      password: '123456',
      login: 'johndoe',
      email: 'johndoe@email.com',
      phone: '(12)93456-7890',
    };

    const user = await createUserUseCase.execute(userData);

    expect(user).toHaveProperty('id');
    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to create an user with an email that is already in use', async () => {
    const userData = {
      name: 'John Doe',
      password: '123456',
      login: 'johndoe',
      email: 'johndoe@email.com',
      phone: '(12)93456-7890',
    };

    const anotherUserData = {
      name: 'Johny Doeh',
      password: '654321',
      login: 'johnydoeh',
      email: 'johndoe@email.com',
      phone: '(21)65439-0987',
    };

    await createUserUseCase.execute(userData);

    await expect(
      createUserUseCase.execute(anotherUserData),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an user with an login that is already in use', async () => {
    const userData = {
      name: 'John Doe',
      password: '123456',
      login: 'johndoe',
      email: 'johndoe@email.com',
      phone: '(12)93456-7890',
    };

    const anotherUserData = {
      name: 'Johny Doeh',
      password: '654321',
      login: 'johndoe',
      email: 'johnydoeh@email.com',
      phone: '(21)65439-0987',
    };

    await createUserUseCase.execute(userData);

    await expect(
      createUserUseCase.execute(anotherUserData),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an user with an email that is already in use', async () => {
    const userData = {
      name: 'John Doe',
      password: '123456',
      login: 'johndoe',
      email: 'johndoe@email.com',
      phone: '(12)93456-7890',
    };

    const anotherUserData = {
      name: 'Johny Doeh',
      password: '654321',
      login: 'johnydoeh',
      email: 'johnydoeh@email.com',
      phone: '(12)93456-7890',
    };

    await createUserUseCase.execute(userData);

    await expect(
      createUserUseCase.execute(anotherUserData),
    ).rejects.toBeInstanceOf(AppError);
  });
});
