import cron from 'node-cron';
import { inject, injectable } from 'tsyringe';

import { IItemsRepository } from '@modules/items/repositories/IItemsRepository';
import { IStocksRepository } from '@modules/stocks/repositories/IStocksRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import { resolveTemplatePath } from '@shared/utils/resolveTemplatePath';

@injectable()
class MinimumStockCronjob {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,

    @inject('StocksRepository')
    private stocksRepository: IStocksRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async notifyUser(
    userId: string,
    itemName: string,
    currentQtd: number,
  ): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user || !user.verified) {
      return;
    }

    const file = resolveTemplatePath('minimumStock');

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: `[OpenWMS] Aviso de estoque baixo`,
      templateData: {
        file,
        variables: {
          itemName,
          currentQtd,
        },
      },
    });
  }

  async execute(): Promise<void> {
    const allItems = await this.itemsRepository.findAll();

    allItems.forEach(async item => {
      if (item.minimumStock >= 0) {
        const totalQtd = await this.stocksRepository.sumTotalQtd(item.id);

        if (totalQtd <= item.minimumStock && !item.notified) {
          await this.notifyUser(item.userId, item.name, totalQtd);

          item.notified = true;

          await this.itemsRepository.update(item);
        }
      }
    });
  }

  runJob(): void {
    console.info('🗓 [MINIMUM STOCK] Cronjob scheduled ⏰');

    cron.schedule(`0 */${process.env.CRONJOB_MINUTES} * * * *`, async () => {
      await this.execute();
    });
  }
}

export { MinimumStockCronjob };
