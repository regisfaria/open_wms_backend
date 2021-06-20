import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByPhone(phone: string): Promise<User>;
  findByLogin(login: string): Promise<User>;
}
