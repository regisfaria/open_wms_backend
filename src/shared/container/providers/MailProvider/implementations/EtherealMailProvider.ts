import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider } from '../models/IMailProvider';

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch(err => console.log(err));
  }

  async sendMail(
    to: string,
    subject: string,
    variables: Record<string, unknown>,
    path: string,
  ): Promise<void> {
    const templateFile = fs.readFileSync(path).toString('utf-8');

    const parser = handlebars.compile(templateFile);

    const templateHTML = parser(variables);

    const message = await this.client.sendMail({
      to,
      from: 'OpenWMS<noreply@openwms.com>',
      subject,
      html: templateHTML,
    });

    console.log('Message sent %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
