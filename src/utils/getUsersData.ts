import { User } from '../pages/Users/types/Users';

const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    const errorMessage =
      response.status === 404 ? '404 - Resource not found' : `HTTP error! Status: ${response.status}`;
    throw new Error(errorMessage);
  }

  return response.json();
};

export const fetchUser = (id: string) => fetchData<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
export const fetchUsers = () => fetchData<User[]>('https://jsonplaceholder.typicode.com/users');
