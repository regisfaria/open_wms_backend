import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { UpdateUserUseCase } from './UpdateUserUseCase';

let usersRepository: FakeUsersRepository;
let updateUserUseCase: UpdateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('UpdateUser', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();

    updateUserUseCase = new UpdateUserUseCase(usersRepository);
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('should be able to update user data', async () => {
    const userData = {
      name: 'John Doe',
      password: '123456',
      login: 'johndoe',
      email: 'johndoe@email.com',
      phone: '(12)93456-7890',
    };

    const oldUser = await createUserUseCase.execute(userData);

    const updatedUser = await updateUserUseCase.execute({
      id: oldUser.id,
      name: 'Regis Faria',
      currentPassword: '123456',
      newPassword: '654321',
      email: 'regis@email.com',
      login: 'regisfaria',
      phone: '(21)98832-0192',
    });

    expect(updatedUser.name).toBe('Regis Faria');
    expect(updatedUser.email).toBe('regis@email.com');
    expect(updatedUser.login).toBe('regisfaria');
  });

  it('should be able to update only one user information', async () => {
    const userData = {
      name: 'John Doe',
      password: '123456',
      login: 'johndoe',
      email: 'johndoe@email.com',
      phone: '(12)93456-7890',
    };

    const oldUser = await createUserUseCase.execute(userData);

    const updatedUser = await updateUserUseCase.execute({
      id: oldUser.id,
      login: 'gisreriafa',
    });

    expect(updatedUser.login).toBe('gisreriafa');
  });

  it('should not be able to update one user without passing any new values', async () => {
    const userData = {
      name: 'John Doe',
      password: '123456',
      login: 'johndoe',
      email: 'johndoe@email.com',
      phone: '(12)93456-7890',
    };

    const oldUser = await createUserUseCase.execute(userData);

    await expect(
      updateUserUseCase.execute({
        id: oldUser.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a non-existing user', async () => {
    await expect(
      updateUserUseCase.execute({
        id: 'non-existing-id',
        name: 'Regis Faria',
        currentPassword: '123456',
        newPassword: '654321',
        email: 'regis@email.com',
        login: 'regisfaria',
        phone: '(21)98832-0192',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user email into an email that is already in use', async () => {
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
      phone: '(21)65439-0987',
    };

    const oldUser = await createUserUseCase.execute(userData);

    await createUserUseCase.execute(anotherUserData);

    await expect(
      updateUserUseCase.execute({
        id: oldUser.id,
        email: 'johnydoeh@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user login into a login that is already in use', async () => {
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
      phone: '(21)65439-0987',
    };

    const oldUser = await createUserUseCase.execute(userData);

    await createUserUseCase.execute(anotherUserData);

    await expect(
      updateUserUseCase.execute({
        id: oldUser.id,
        login: 'johnydoeh',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user phone into a phone that is already in use', async () => {
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
      phone: '(21)65439-0987',
    };

    const oldUser = await createUserUseCase.execute(userData);

    await createUserUseCase.execute(anotherUserData);

    await expect(
      updateUserUseCase.execute({
        id: oldUser.id,
        phone: '(21)65439-0987',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user password with a wrong currentPassword', async () => {
    const userData = {
      name: 'John Doe',
      password: '123456',
      login: 'johndoe',
      email: 'johndoe@email.com',
      phone: '(12)93456-7890',
    };

    const oldUser = await createUserUseCase.execute(userData);

    await expect(
      updateUserUseCase.execute({
        id: oldUser.id,
        newPassword: '12345677',
        currentPassword: '123141',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
