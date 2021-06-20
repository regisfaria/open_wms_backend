import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
let token: string;
let itemId: string;
describe('List item Controller', () => {
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

    const requestItem = await request(app)
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

    itemId = requestItem.body.item.id;
  });

  it('should be able to update item', async () => {
    const response = await request(app)
      .put(`/items/${itemId}`)
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        measureUnity: 'Quantidade',
        daysToNotifyExpirationDate: 5,
        minimumStock: 15,
      });

    expect(response.status).toBe(200);
    expect(response.body.item.minimumStock).toBe(15);
  });

  it('should not be able to update item without any new value', async () => {
    const response = await request(app)
      .put(`/items/${itemId}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
});
