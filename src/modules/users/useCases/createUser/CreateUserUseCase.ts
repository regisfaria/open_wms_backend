import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities/User';
import { AppError } from '@shared/errors/AppError';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
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

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      password: passwordHash,
      email,
      login,
      phone: parsedPhone,
    });

    return user;
  }
}

export { CreateUserUseCase };
