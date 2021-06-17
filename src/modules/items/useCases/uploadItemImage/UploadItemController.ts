import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadItemImageUseCase } from './UploadItemUseCase';

class UploadItemImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { filename } = request.file;

    const uploadCarImageUseCase = container.resolve(UploadItemImageUseCase);

    await uploadCarImageUseCase.execute({
      item_id: id,
      imagem_name: filename,
    });

    return response.sendStatus(201);
  }
}

export { UploadItemImageController };
