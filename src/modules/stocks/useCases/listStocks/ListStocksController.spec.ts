import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
let token: string;
let itemId: string;
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

    await request(app)
      .post('/stocks/input')
      .send({
        itemId,
        quantity: 10,
        value: 500,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });
  });

  it('should be able to list stock of item', async () => {
    const stockResponse = await request(app)
      .get(`/stocks/byItem/${itemId}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(stockResponse.status).toBe(200);
    expect(stockResponse.body.stocks[0]).toHaveProperty('id');
  });

  it('should not be able to list stock of invalid item id', async () => {
    const stockResponse = await request(app)
      .get(`/stocks/byItem/${uuid()}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(stockResponse.status).toBe(400);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
});
