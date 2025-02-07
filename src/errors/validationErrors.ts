export class ValidationError extends Error {
  field: string;

  constructor(field: string, message: string) {
    super(message);
    this.field = field;
    this.name = 'ValidationError';
  }
}

export const createValidationError = (field: string, message: string) => {
  return new ValidationError(field, message);
};
