import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/auth';
import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  login: string;
  password: string;
}

interface IResponse {
  user: {
    id: string;
    name: string;
    email: string;
    login: string;
    phone: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ login, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByLogin(login);

    if (!user) {
      throw new AppError('Login ou senha incorretas.');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Login ou senha incorretas.');
    }

    const { expiresInToken, secretToken } = authConfig;

    const token = sign({}, secretToken, {
      subject: user.id,
      expiresIn: expiresInToken,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        login: user.login,
        phone: user.phone,
      },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
