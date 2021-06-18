import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, email, login, phone } = request.body;

    const createUser = container.resolve(CreateUserUseCase);

    const user = await createUser.execute({
      name,
      password,
      email,
      login,
      phone,
    });

    return response.status(201).json(classToClass({ user }));
  }
}

export { CreateUserController };
