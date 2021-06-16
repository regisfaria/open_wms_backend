import { v4 as uuid } from 'uuid';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  users: User[] = [];

  async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), ...data });

    this.users.push(user);

    return user;
  }

  async update(user: User): Promise<void> {
    const userIndex = this.users.findIndex(
      userToFind => userToFind.id === user.id,
    );

    this.users[userIndex] = user;
  }

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  async findByPhone(phone: string): Promise<User> {
    return this.users.find(user => user.phone === phone);
  }

  async findByLogin(login: string): Promise<User> {
    return this.users.find(user => user.login === login);
  }
}

export { FakeUsersRepository };
