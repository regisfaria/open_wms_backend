export interface ICreateItemDTO {
  userId: string;
  name: string;
  category: string;
  minimumStock?: number;
  daysToNotifyExpirationDate?: number;
  image?: string;
  measureUnity: string;
}
