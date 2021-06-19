import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import { AppError } from '@shared/errors/AppError';
import { getDateAddedByDays } from '@shared/utils/getDateAddedByDays';
import { resolveTemplatePath } from '@shared/utils/resolveTemplatePath';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute({
    name,
    password,
    email,
    login,
    phone,
  }: ICreateUserDTO): Promise<User> {
    const emailAlreadyInUse = await this.usersRepository.findByEmail(email);

    if (emailAlreadyInUse) {
      throw new AppError('Este e-mail já está em uso.');
    }

    const loginAlreadyInUse = await this.usersRepository.findByLogin(login);

    if (loginAlreadyInUse) {
      throw new AppError('Este login já está em uso.');
    }

    const parsedPhone = phone.replace(/[^a-z0-9]/gi, '');

    const phoneAlreadyInUse = await this.usersRepository.findByPhone(
      parsedPhone,
    );

    if (phoneAlreadyInUse) {
      throw new AppError('Este número de telefone já está em uso.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      password: hashedPassword,
      email,
      login,
      phone: parsedPhone,
    });

    const expiresAt = getDateAddedByDays(3);
    const token = uuidv4();

    await this.usersTokensRepository.create({
      expiresAt,
      userId: user.id,
      token,
    });

    const file = resolveTemplatePath('confirmAccount');
    await this.mailProvider.sendMail({
      to: {
        name,
        email,
      },
      subject: 'OpenWMS - Confirmação de conta',
      templateData: {
        file,
        variables: {
          name,
          confirmUrl: `${process.env.APP_FRONTEND_URL}/verify/${token}`,
        },
      },
    });

    return user;
  }
}

export { CreateUserUseCase };
