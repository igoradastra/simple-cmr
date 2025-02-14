import { http, HttpResponse } from 'msw';
import { mockUsers } from './mockData';

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json(mockUsers);
  }),

  http.get('/api/users/:id', ({ params }) => {
    const { id } = params;
    const user = mockUsers.find((user) => user.id === Number(id));

    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(user);
  }),

  http.post('/api/users', async ({ request }) => {
    const newUser = await request.json();
    const createdUser = {
      id: mockUsers.length + 1,
      ...newUser,
    };

    mockUsers.push(createdUser);

    return HttpResponse.json(createdUser, { status: 201 });
  }),

  http.put('/api/users/:id', async ({ params, request }) => {
    const { id } = params;
    const existingUser = mockUsers.find((user) => user.id === Number(id));

    if (!existingUser) {
      return new HttpResponse(null, { status: 404 });
    }

    const updates = await request.json();
    const updatedUser = {
      ...existingUser,
      ...updates,
    };

    return HttpResponse.json(updatedUser);
  }),

  http.delete('/api/users/:id', ({ params }) => {
    const { id } = params;
    const user = mockUsers.find((user) => user.id === Number(id));

    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({ message: `User ${id} deleted successfully` });
  }),
];
