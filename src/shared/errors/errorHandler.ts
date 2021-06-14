import { NextFunction, Request, Response } from 'express';

import { AppError } from './AppError';

export function errorHandler(
  err: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Response {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      error: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error`,
    error: err.message,
  });
}
