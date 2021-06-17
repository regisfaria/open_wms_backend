import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('UpdateUserController', () => {
  beforeAll(async () => {
    connection = await createConnection('localhost');
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to update an user', async () => {
    const userResponse = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      phone: '(21)98765-1234',
      login: 'johndoe',
    });

    const { id } = await userResponse.body.user;

    const response = await request(app).put(`/users/${id}`).send({
      name: 'Regis Faria',
      currentPassword: '123456',
      newPassword: '654321',
      email: 'regis@email.com',
      login: 'regisfaria',
      phone: '(21)98832-0192',
    });

    expect(response.status).toBe(200);
    expect(response.body.user.name).toBe('Regis Faria');
  });

  it('should not be able to update an user without any new values', async () => {
    const userResponse = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      phone: '(21)98765-1234',
      login: 'johndoe',
    });

    const { id } = userResponse.body.user;

    const response = await request(app).put(`/users/${id}`).send({});

    expect(response.status).toBe(400);
  });

  it('should not be able to update a non-existing user', async () => {
    const response = await request(app)
      .put(`/users/a1fa433d-fcc9-4695-a24c-c760f4c368ac`)
      .send({
        name: 'Regis Faria',
        currentPassword: '123456',
        newPassword: '654321',
        email: 'johndoe@email.com',
        login: 'regisfaria',
        phone: '(21)98832-0192',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to update an user with an email that is already in use', async () => {
    const userResponse = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe2@email.com',
      password: '123456',
      phone: '(21)12765-1234',
      login: 'johndoe2',
    });

    const { id } = userResponse.body.user;

    const response = await request(app).put(`/users/${id}`).send({
      name: 'Regis Faria',
      currentPassword: '123456',
      newPassword: '654321',
      email: 'johndoe2@email.com',
      login: 'regisfaria',
      phone: '(21)98832-0192',
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to update an user with a login that is already in use', async () => {
    const userResponse = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe3@email.com',
      password: '123456',
      phone: '(21)123465-1234',
      login: 'johndoe3',
    });

    const { id } = userResponse.body.user;

    const response = await request(app).put(`/users/${id}`).send({
      name: 'Regis Faria',
      currentPassword: '123456',
      newPassword: '654321',
      email: 'johndoe3@email.com',
      login: 'johndoe3',
      phone: '(21)981232-0192',
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to update an user with a phone that is already in use', async () => {
    const userResponse = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe4@email.com',
      password: '123456',
      phone: '(21)12345-234',
      login: 'johndoe4',
    });

    const { id } = userResponse.body.user;

    const response = await request(app).put(`/users/${id}`).send({
      name: 'Regis Faria',
      currentPassword: '123456',
      newPassword: '654321',
      email: 'regisss@email.com',
      login: 'gisreariafa',
      phone: '(21)12345-234',
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to update an user with a wrong currentPassword', async () => {
    const userResponse = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe5@email.com',
      password: '123456',
      phone: '(211)98765-1234',
      login: 'johndoe5',
    });

    const { id } = userResponse.body.user;

    const response = await request(app).put(`/users/${id}`).send({
      currentPassword: '1256',
      newPassword: '654321',
    });

    expect(response.status).toBe(400);
  });
});
