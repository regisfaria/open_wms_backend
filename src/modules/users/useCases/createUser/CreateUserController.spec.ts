import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('CreateUserController', () => {
  beforeAll(async () => {
    connection = await createConnection('localhost');
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      phone: '(21)98765-1234',
      login: 'johndoe',
    });

    expect(response.status).toBe(201);
    expect(response.body.user).toHaveProperty('id');
  });

  it('should not be able to create a new user with an email that is already in use', async () => {
    await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      phone: '(21)98765-1234',
      login: 'johndoe',
    });

    const response = await request(app).post('/users').send({
      name: 'Johny Doeh',
      email: 'johndoe@email.com',
      password: '123456',
      phone: '(21)78765-1234',
      login: 'johnydoeh',
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a new user with an login that is already in use', async () => {
    await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      phone: '(21)98765-1234',
      login: 'johndoe',
    });

    const response = await request(app).post('/users').send({
      name: 'Johny Doeh',
      email: 'johnydoeh@email.com',
      password: '123456',
      phone: '(21)78765-1234',
      login: 'johndoe',
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a new user with an phone that is already in use', async () => {
    await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      phone: '(21)98765-1234',
      login: 'johndoe',
    });

    const response = await request(app).post('/users').send({
      name: 'Johny Doeh',
      email: 'johnydoeh@email.com',
      password: '123456',
      phone: '(21)98765-1234',
      login: 'johnydoeh',
    });

    expect(response.status).toBe(400);
  });
});
