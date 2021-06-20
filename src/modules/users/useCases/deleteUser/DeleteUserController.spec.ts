import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('DeleteUserController', () => {
  beforeAll(async () => {
    connection = await createConnection('localhost');
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to delete an user', async () => {
    await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      phone: '(21)98765-1234',
      login: 'johndoe',
    });

    const authResponse = await request(app)
      .post('/sessions')
      .send({ login: 'johndoe', password: '123456' });

    const { token } = authResponse.body;

    const response = await request(app)
      .delete('/users')
      .set({ Authorization: `Bearer ${token}` })
      .send();

    expect(response.status).toBe(204);
  });

  it('should not be able to delete an unauthenticated user', async () => {
    const response = await request(app)
      .delete('/users')
      .set({ Authorization: `Bearer ${'oasdjasdnasjkldas'}` })
      .send();

    expect(response.status).toBe(401);
  });
});
