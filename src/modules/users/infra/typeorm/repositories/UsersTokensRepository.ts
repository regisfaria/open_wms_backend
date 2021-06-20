import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '@modules/users/dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';

import { UserToken } from '../entities/UserToken';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const token = this.repository.create(data);

    await this.repository.save(token);

    return token;
  }

  async findByToken(token: string): Promise<UserToken> {
    const userToken = await this.repository.findOne({
      where: { token },
    });

    return userToken;
  }

  async findByUserId(userId: string): Promise<UserToken> {
    const userToken = await this.repository.findOne({
      where: { userId },
    });

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersTokensRepository };
