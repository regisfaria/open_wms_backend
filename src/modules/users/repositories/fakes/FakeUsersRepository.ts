import { v4 as uuid } from 'uuid';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.users.push(user);

    return user;
  }

  async update(user: User): Promise<User> {
    const userIndex = this.users.findIndex(
      userToFind => userToFind.id === user.id,
    );

    this.users[userIndex] = user;

    return user;
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex(
      userToDelete => userToDelete.id === id,
    );

    this.users.splice(userIndex, 1);
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async findByPhone(phone: string): Promise<User> {
    const user = this.users.find(user => user.phone === phone);

    return user;
  }

  async findByLogin(login: string): Promise<User> {
    const user = this.users.find(user => user.login === login);

    return user;
  }
}

export { FakeUsersRepository };
