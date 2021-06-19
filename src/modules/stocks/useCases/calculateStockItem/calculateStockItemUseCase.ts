import { inject, injectable } from 'tsyringe';

import { IStocksRepository } from '@modules/stocks/repositories/IStocksRepository';

@injectable()
class CalculateStockItemUseCase {
  constructor(
    @inject('StocksRepository')
    private stockRepository: IStocksRepository,
  ) {}

  async execute(itemId: string): Promise<number> {
    const inputStock = await this.stockRepository.sumInput(itemId);

    const outputStock = await this.stockRepository.sumOutput(itemId);

    return inputStock - outputStock;
  }
}

export { CalculateStockItemUseCase };
