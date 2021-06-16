import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';

import { CreateUserUseCase } from './CreateUserUseCase';

let usersRepository: FakeUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe('CreateUser', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();

    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('should be able to create an user', async () => {
    const userData = {
      name: 'John Doe',
      password: '123456',
      login: 'johndoe',
      email: 'johndoe@email.com',
      phone: '(12)93456-7890',
    };

    const user = await createUserUseCase.execute(userData);

    expect(user).toHaveProperty('id');
  });
});
