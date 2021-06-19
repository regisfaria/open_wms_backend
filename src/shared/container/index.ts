import { container } from 'tsyringe';

import './providers';

import { ItemsRepository } from '@modules/items/infra/typeorm/repositories/ItemsRepository';
import { IItemsRepository } from '@modules/items/repositories/IItemsRepository';
import { StocksRepository } from '@modules/stocks/infra/typeorm/repositories/StockRepository';
import { IStocksRepository } from '@modules/stocks/repositories/IStocksRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);

container.registerSingleton<IItemsRepository>(
  'ItemsRepository',
  ItemsRepository,
);

container.registerSingleton<IStocksRepository>(
  'StocksRepository',
  StocksRepository,
);
