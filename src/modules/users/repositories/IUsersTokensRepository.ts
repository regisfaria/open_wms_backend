import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserToken } from '../infra/typeorm/entities/UserToken';

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken>;
  findByUserId(userId: string): Promise<UserToken>;
  deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository };
