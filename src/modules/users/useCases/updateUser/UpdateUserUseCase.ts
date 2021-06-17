import { hash, compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities/User';
import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  id: string;
  name?: string;
  email?: string;
  newPassword?: string;
  currentPassword?: string;
  login?: string;
  phone?: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    id,
    name,
    newPassword,
    currentPassword,
    email,
    login,
    phone,
  }: IRequest): Promise<User> {
    if (
      !name &&
      !email &&
      !newPassword &&
      !currentPassword &&
      !login &&
      !phone
    ) {
      throw new AppError(
        'Você não pode acessar esse serviço sem fornecer nenhum valor novo. Tente atualizar pelomenos um valor.',
      );
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('Nenhum usuario encontrado com o ID fornecido.');
    }

    user.name = name || user.name;

    if (email) {
      const emailAlreadyInUse = await this.usersRepository.findByEmail(email);

      if (emailAlreadyInUse) {
        throw new AppError('Esse email já está em uso.');
      }

      user.email = email;
    }

    if (login) {
      const loginAlreadyInUse = await this.usersRepository.findByLogin(login);

      if (loginAlreadyInUse) {
        throw new AppError('Esse login já está em uso.');
      }

      user.login = login;
    }

    if (phone) {
      const parsedPhone = phone.replace(/[^a-z0-9]/gi, '');

      const phoneAlreadyInUse = await this.usersRepository.findByPhone(
        parsedPhone,
      );

      if (phoneAlreadyInUse) {
        throw new AppError('Esse número de telefone já está em uso.');
      }

      user.phone = parsedPhone;
    }

    if (newPassword && currentPassword) {
      const passwordsMatch = await compare(currentPassword, user.password);

      if (!passwordsMatch) {
        throw new AppError('Suas senhas não conferem');
      }

      const hashedPassword = await hash(newPassword, 8);

      user.password = hashedPassword;
    }

    await this.usersRepository.update(user);

    return user;
  }
}

export { UpdateUserUseCase };
