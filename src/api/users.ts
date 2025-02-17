import { fetchClient } from './fetchClient';
import { User } from './types/Users';

export const getUser = (id: string) =>
  fetchClient<User>(`/api/users/${id}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } });

export const getUsers = () =>
  fetchClient<User[]>('/api/users', { method: 'GET', headers: { 'Content-Type': 'application/json' } });

export const createUser = (user: User) =>
  fetchClient<User>('/api/users', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
  });

export const updateUser = (id: string, user: User) =>
  fetchClient<User>(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
  });

export const deleteUser = (id: string) =>
  fetchClient<{ message: string }>(`/api/users/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
