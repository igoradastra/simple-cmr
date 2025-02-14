import { ApiError } from '../errors/apiErrors';
import { NotFoundError } from '../errors/notFoundErrors';

export const fetchClient = async <T>(
  url: string,
  { method, body, headers }: { method: string; body?: string; headers: { 'Content-Type': string } }
): Promise<T> => {
  const response = await fetch(url, {
    method,
    body,
    headers,
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new NotFoundError('User not found');
    }
    throw new ApiError('Network response was not ok', response.status);
  }

  return response.json() as Promise<T>;
};
