import { container } from 'tsyringe';

import './providers';

import { ItemsRepository } from '@modules/items/infra/typeorm/repositories/ItemsRepository';
import { IItemsRepository } from '@modules/items/repositories/IItemsRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IItemsRepository>(
  'ItemsRepository',
  ItemsRepository,
);
