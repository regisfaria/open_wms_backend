import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadItemImageUseCase } from './UploadItemImageUseCase';

class UploadItemImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { filename } = request.file;

    const uploadItemImageUseCase = container.resolve(UploadItemImageUseCase);

    await uploadItemImageUseCase.execute({
      itemId: id,
      imageName: filename,
    });

    return response.sendStatus(201);
  }
}

export { UploadItemImageController };
