interface IStockRecordDTO {
  itemId: string;
  quantity: number;
  type: string;
  value: number;
  expirationDate?: string;
}

export { IStockRecordDTO };
