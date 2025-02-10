export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export const createNotFoundError = (message: string) => new NotFoundError(message);
