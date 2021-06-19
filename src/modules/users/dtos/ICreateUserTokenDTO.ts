interface ICreateUserTokenDTO {
  userId: string;
  expiresAt: Date;
  token: string;
}
export { ICreateUserTokenDTO };
