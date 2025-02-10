import { ApiError } from '../errors/apiErrors';
import { NotFoundError } from '../errors/notFoundErrors';

export const fetchClient = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new NotFoundError('404 - Page not found');
    }
    throw new ApiError(`HTTP error! Status: ${response.status}`, response.status);
  }

  return response.json();
};
