import { container } from 'tsyringe';

import { mailConfig } from '@config/mail';

import { FakeMailProvider } from './fakes/FakeMailProvider';
import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import { SESMailProvider } from './implementations/SESMailProvider';
import { IMailProvider } from './models/IMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
  test: new FakeMailProvider(),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
