import { inject, injectable } from 'tsyringe';

import { IStocksRepository } from '@modules/stocks/repositories/IStocksRepository';

@injectable()
class CalculateBalanceItem {
  constructor(
    @inject('IStocksRepository')
    private stockRepository: IStocksRepository,
  ) {}
  async execute(itemId: string): Promise<number> {
    const sumBalance = await this.stockRepository.sumBalance(itemId);

    return sumBalance;
  }
}
export { CalculateBalanceItem };
