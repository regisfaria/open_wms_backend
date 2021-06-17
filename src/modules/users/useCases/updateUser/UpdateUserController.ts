import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, login, phone } = request.body;

    const updateUser = container.resolve(UpdateUserUseCase);

    const user = await updateUser.execute({
      id,
      name,
      email,
      login,
      phone,
    });

    return response.status(200).json({ user });
  }
}

export { UpdateUserController };
