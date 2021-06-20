import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError(
      'Você precisa se autenticar para acessar esse recurso.',
      401,
    );
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(token, authConfig.secretToken) as IPayload;

    request.user = { id: userId };

    next();
  } catch (invalidToken) {
    throw new AppError('Token invalido', 401, 'tokenExpiredOrInvalid');
  }
}
