import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import { getDateAddedByDays } from '@shared/utils/getDateAddedByDays';
import { getDifferenceInDaysBetweenDates } from '@shared/utils/getDifferenceInDaysBetweenDates';
import { resolveTemplatePath } from '@shared/utils/resolveTemplatePath';

interface IResponse {
  status: 'success' | 'error' | 'expired';
}

@injectable()
class ConfirmUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute(token: string): Promise<IResponse> {
    const userToken = await this.usersTokensRepository.findByToken(token);

    if (!userToken) {
      return { status: 'error' };
    }

    const user = await this.usersRepository.findById(userToken.userId);

    const differenceInDays = getDifferenceInDaysBetweenDates({
      date: userToken.expiresAt,
    });

    if (differenceInDays > 3) {
      const expiresAt = getDateAddedByDays(3);
      const token = uuidv4();

      await this.usersTokensRepository.create({
        expiresAt,
        userId: user.id,
        token,
      });

      const file = resolveTemplatePath('confirmAccount');
      await this.mailProvider.sendMail({
        to: {
          name: user.name,
          email: user.email,
        },
        subject: 'OpenWMS - Confirmação de conta',
        templateData: {
          file,
          variables: {
            name: user.name,
            confirmUrl: `${process.env.APP_FRONTEND_URL}/verify/${token}`,
          },
        },
      });

      await this.usersTokensRepository.deleteById(userToken.id);

      return { status: 'expired' };
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    user.verified = true;

    await this.usersRepository.update(user);

    return { status: 'success' };
  }
}

export { ConfirmUserUseCase };
