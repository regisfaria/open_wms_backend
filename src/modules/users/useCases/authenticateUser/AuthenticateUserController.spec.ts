import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('AuthenticateUserController', () => {
  beforeAll(async () => {
    connection = await createConnection('localhost');
    await connection.runMigrations();

    await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      phone: '(21)98765-1234',
      login: 'johndoe',
    });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to authenticate an user', async () => {
    const response = await request(app).post('/sessions').send({
      password: '123456',
      login: 'johndoe',
    });

    expect(response.status).toBe(200);
  });

  it('should not be able to authenticate a non-existing user', async () => {
    const response = await request(app).post('/sessions').send({
      password: '123456',
      login: 'gisre',
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to authenticate an user with wrong password', async () => {
    const response = await request(app).post('/sessions').send({
      password: '654321',
      login: 'johndoe',
    });

    expect(response.status).toBe(400);
  });
});
