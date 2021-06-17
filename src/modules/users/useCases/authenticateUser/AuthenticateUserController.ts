import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, login } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserUseCase);

    const authData = await authenticateUser.execute({ login, password });

    return response.status(200).json(authData);
  }
}

export { AuthenticateUserController };
