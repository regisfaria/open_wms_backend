export interface ISmsProvider {
  sendSms(phone: string): Promise<void>;
}
