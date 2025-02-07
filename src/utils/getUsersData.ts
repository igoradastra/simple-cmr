import { ApiError } from '../errors/apiErrors';
import { NotFoundError } from '../errors/notFoundErrors';
import { User } from '../pages/Users/types/Users';

const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new NotFoundError('404 - Page not found');
    }
    throw new ApiError(`HTTP error! Status: ${response.status}`, response.status);
  }

  return response.json();
};

export const fetchUser = (id: string) => fetchData<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
export const fetchUsers = () => fetchData<User[]>('https://jsonplaceholder.typicode.com/users');
