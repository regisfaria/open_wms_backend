interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    variables: Record<string, unknown>,
    path: string,
  ): Promise<void>;
}

export { IMailProvider };
