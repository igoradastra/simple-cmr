import { fetchClient } from './fetchClient';
import { User } from '../pages/Users/types/Users';

export const getUser = (id: string) => fetchClient<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
export const getUsers = () => fetchClient<User[]>('https://jsonplaceholder.typicode.com/users');
