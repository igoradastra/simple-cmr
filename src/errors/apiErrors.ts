export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const createApiError = (status: number, message: string) => {
  const error = new ApiError(message, status);
  return error;
};
