import nock from 'nock';
import { mockUsers } from './mockData';

export const startMockApi = () => {
  const apiUrl = 'http://localhost:5173';

  nock(apiUrl).get('/api/users').reply(200, mockUsers);

  mockUsers.forEach((user) => {
    nock(apiUrl).get(`/api/users/${user.id}`).reply(200, user);
  });

  nock(apiUrl)
    .post('/api/users')
    .reply(201, (requestBody: Partial<(typeof mockUsers)[0]>) => {
      const newUser = { id: mockUsers.length + 1, ...requestBody };
      return newUser;
    });

  mockUsers.forEach((user) => {
    nock(apiUrl)
      .put(`/api/users/${user.id}`)
      .reply(200, (requestBody: Partial<typeof user>) => ({
        ...user,
        ...requestBody,
      }));
  });

  mockUsers.forEach((user) => {
    nock(apiUrl)
      .delete(`/api/users/${user.id}`)
      .reply(200, { message: `User ${user.id} deleted successfully` });
  });
};
