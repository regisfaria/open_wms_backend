import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
let token: string;
describe('Create item Controller', () => {
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
    const response = await request(app).post('/sessions').send({
      password: '123456',
      login: 'johndoe',
    });

    token = response.body.token;
  });

  it('should be able to create a new item', async () => {
    const responseItem = await request(app)
      .post('/items')
      .send({
        name: 'Massa de tomate',
        category: 'perecíveis',
        measureUnity: 'QTD',
        daysToNotifyExpirationDate: 3,
        minimumStock: 10,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseItem.status).toBe(201);
    expect(responseItem.body.item).toHaveProperty('id');
  });

  it('should not be able to create a new item with name exist', async () => {
    const responseItem = await request(app)
      .post('/items')
      .send({
        name: 'Massa de tomate',
        category: 'perecíveis',
        measureUnity: 'QTD',
        daysToNotifyExpirationDate: 3,
        minimumStock: 10,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseItem.status).toBe(400);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
});
