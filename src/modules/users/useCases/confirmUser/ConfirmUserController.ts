import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ConfirmUserUseCase } from './ConfirmUserUseCase';

class ConfirmUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.params;

    const confirmUser = container.resolve(ConfirmUserUseCase);

    const status = await confirmUser.execute(token);

    return response.status(200).json(status);
  }
}

export { ConfirmUserController };
