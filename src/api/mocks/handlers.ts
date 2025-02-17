import { http, HttpResponse } from 'msw';
import { mockUsers } from './mockData';
import { User } from '../types/Users';

export const handlers = [
  http.get('/api/users', () => HttpResponse.json(mockUsers)),

  http.get('/api/users/:id', ({ params }) => {
    const user = mockUsers.find(({ id }) => id === Number(params.id));
    return user ? HttpResponse.json(user) : new HttpResponse(null, { status: 404 });
  }),

  http.post('/api/users', async ({ request }) => {
    const newUser = await request.json();
    const createdUser: User = { ...(newUser as User), id: mockUsers.length + 1 };
    mockUsers.push(createdUser);
    return HttpResponse.json(createdUser, { status: 201 });
  }),

  http.put('/api/users/:id', async ({ params, request }) => {
    const existingUser = mockUsers.find(({ id }) => id === Number(params.id));
    if (!existingUser) return new HttpResponse(null, { status: 404 });

    const updates = await request.json();
    Object.assign(existingUser, updates);
    return HttpResponse.json(existingUser);
  }),

  http.delete('/api/users/:id', ({ params }) => {
    const userIndex = mockUsers.findIndex(({ id }) => id === Number(params.id));
    if (userIndex === -1) return new HttpResponse(null, { status: 404 });

    mockUsers.splice(userIndex, 1);
    return HttpResponse.json({ message: `User ${params.id} deleted successfully` });
  }),
];
