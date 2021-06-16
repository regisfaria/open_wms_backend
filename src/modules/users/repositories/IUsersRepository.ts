import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  update(user: User): Promise<User>;
  findById(id: string): Promise<User>;
}
