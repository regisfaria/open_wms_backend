import { v4 as uuid } from 'uuid';

import { ICreateUserTokenDTO } from '@modules/users/dtos/ICreateUserTokenDTO';
import { UserToken } from '@modules/users/infra/typeorm/entities/UserToken';

import { IUsersTokensRepository } from '../IUsersTokensRepository';

class FakeUsersTokensRepository implements IUsersTokensRepository {
  private usersTokens: UserToken[] = [];

  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const token = new UserToken();

    Object.assign(token, { id: uuid(), createdAt: new Date() }, data);

    this.usersTokens.push(token);

    return token;
  }

  async findByUserIdAndToken(
    userId: string,
    token: string,
  ): Promise<UserToken> {
    const userToken = this.usersTokens.find(
      userTokenToFind =>
        userTokenToFind.userId === userId && userTokenToFind.token === token,
    );

    return userToken;
  }

  async findByToken(token: string): Promise<UserToken> {
    const userToken = this.usersTokens.find(
      userTokenToFind => userTokenToFind.token === token,
    );

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const tokenIndex = this.usersTokens.findIndex(
      tokenToDelete => tokenToDelete.id === id,
    );

    this.usersTokens.splice(tokenIndex, 1);
  }
}

export { FakeUsersTokensRepository };
