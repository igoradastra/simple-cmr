import { ApiError } from '../errors/apiErrors';
import { NotFoundError } from '../errors/notFoundErrors';

export const fetchClient = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new ApiError(`HTTP error! Status: ${response.status}`, response.status);
    if (response.status === 404) {
      throw new NotFoundError(error.message);
    }
    throw error;
  }

  return response.json();
};
