export class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly statusMessage?: string | undefined;

  constructor(message: string, statusCode = 400, statusMessage = undefined) {
    this.message = message;
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
  }
}
