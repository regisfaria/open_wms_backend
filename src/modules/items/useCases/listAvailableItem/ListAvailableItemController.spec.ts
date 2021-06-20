import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
let token: string;
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
  });

  it('should be able to list all available items', async () => {
    await request(app)
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

    await request(app)
      .post('/items')
      .send({
        name: 'Carne',
        category: 'perecíveis',
        measureUnity: 'KG',
        daysToNotifyExpirationDate: 3,
        minimumStock: 10,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .get('/items')
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body.items.length).toBe(2);
  });

  it('should be able list items by name', async () => {
    const response = await request(app)
      .get('/items')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .query({
        name: 'Carne',
      });

    expect(response.status).toBe(200);
    expect(response.body.items.length).toBe(1);
  });

  it('should be able list items by measure unity', async () => {
    const response = await request(app)
      .get('/items')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .query({
        measureUnity: 'KG',
      });

    expect(response.status).toBe(200);
    expect(response.body.items.length).toBe(1);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
});
