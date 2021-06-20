import cron from 'node-cron';
import { inject, injectable } from 'tsyringe';

import { IItemsRepository } from '@modules/items/repositories/IItemsRepository';
import { IStocksRepository } from '@modules/stocks/repositories/IStocksRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import { getDifferenceInDaysBetweenDates } from '@shared/utils/getDifferenceInDaysBetweenDates';
import { resolveTemplatePath } from '@shared/utils/resolveTemplatePath';

@injectable()
class ExpirationDateCronjob {
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
    expirationDate: string,
  ): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user || !user.verified) {
      return;
    }

    const file = resolveTemplatePath('itemNearExpiration');

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: `[OpenWMS] Aviso de produto perto de vencimento`,
      templateData: {
        file,
        variables: {
          itemName,
          expirationDate,
        },
      },
    });
  }

  async execute(): Promise<void> {
    const allItems = await this.itemsRepository.findAll();

    allItems.forEach(async item => {
      if (item.daysToNotifyExpirationDate >= 0) {
        const stocks = await this.stocksRepository.findAllByItemId(item.id);

        for (const stock of stocks) {
          if (stock.expirationDate) {
            const daysToExpiration = getDifferenceInDaysBetweenDates({
              date: stock.expirationDate,
            });

            if (
              daysToExpiration <= item.daysToNotifyExpirationDate &&
              !stock.notified
            ) {
              await this.notifyUser(
                item.userId,
                item.name,
                stock.expirationDate.toLocaleDateString('pt-br'),
              );

              stock.notified = true;

              await this.stocksRepository.update(stock);
            }
          }
        }
      }
    });
  }

  runJob(): void {
    console.info('🗓 [EXPIRATION DATE] Cronjob scheduled ⏰');

    cron.schedule(`0 */${process.env.CRONJOB_MINUTES} * * * *`, async () => {
      await this.execute();
    });
  }
}

export { ExpirationDateCronjob };
