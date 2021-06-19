interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

const mailConfig = {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'Open WMS<noreply@openwms.com>',
      name: 'Open WMS',
    },
  },
} as IMailConfig;

export { mailConfig };
