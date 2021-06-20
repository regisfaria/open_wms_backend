import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { FakeUsersTokensRepository } from '@modules/users/repositories/fakes/FakeUsersTokensRepository';
import { FakeMailProvider } from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import * as dateDiff from '@shared/utils/getDifferenceInDaysBetweenDates';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { ConfirmUserUseCase } from './ConfirmUserUseCase';

let usersRepository: FakeUsersRepository;
let usersTokensRepository: FakeUsersTokensRepository;
let mailProvider: FakeMailProvider;

let createUserUseCase: CreateUserUseCase;
let confirmUserUseCase: ConfirmUserUseCase;

describe('ConfirmUser', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    usersTokensRepository = new FakeUsersTokensRepository();
    mailProvider = new FakeMailProvider();

    createUserUseCase = new CreateUserUseCase(
      usersRepository,
      usersTokensRepository,
      mailProvider,
    );

    confirmUserUseCase = new ConfirmUserUseCase(
      usersRepository,
      usersTokensRepository,
      mailProvider,
    );
  });

  it('should be able to confirm an user', async () => {
    const userData = {
      name: 'John Doe',
      password: '123456',
      login: 'johndoe',
      email: 'johndoe@email.com',
      phone: '(12)93456-7890',
    };

    const user = await createUserUseCase.execute(userData);

    const userToken = await usersTokensRepository.findByUserId(user.id);

    const response = await confirmUserUseCase.execute(userToken.token);

    expect(response).toEqual({ status: 'success' });
  });

  it('should not be able to confirm an user when the token is invalid', async () => {
    const response = await confirmUserUseCase.execute('invalid-token');

    expect(response).toEqual({ status: 'error' });
  });

  it('should not be able to create an user with an login that is already in use', async () => {
    jest.spyOn(dateDiff, 'default').mockImplementationOnce(() => {
      return 6;
    });

    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    const userData = {
      name: 'John Doe',
      password: '123456',
      login: 'johndoe',
      email: 'johndoe@email.com',
      phone: '(12)93456-7890',
    };

    const user = await createUserUseCase.execute(userData);

    const userToken = await usersTokensRepository.findByUserId(user.id);

    const response = await confirmUserUseCase.execute(userToken.token);

    expect(response).toEqual({ status: 'expired' });
    expect(sendMail).toHaveBeenCalled();
  });
});
