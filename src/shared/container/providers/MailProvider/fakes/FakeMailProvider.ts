import { IMailProvider } from '../models/IMailProvider';

class FakeMailProvider implements IMailProvider {
  async sendMail(
    to: string,
    subject: string,
    variables: Record<string, unknown>,
    path: string,
  ): Promise<void> {
    console.log(`MAIL SENDED TO ${to}`);
  }
}

export { FakeMailProvider };
