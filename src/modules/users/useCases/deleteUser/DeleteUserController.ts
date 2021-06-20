import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteUserUseCase } from './DeleteUserUseCase';

class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const deleteUser = container.resolve(DeleteUserUseCase);

    await deleteUser.execute(id);

    return response.sendStatus(204);
  }
}

export { DeleteUserController };
