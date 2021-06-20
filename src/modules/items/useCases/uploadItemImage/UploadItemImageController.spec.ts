import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('UploadItemImageController', () => {
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

  it('should be able to upload item image', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send({ login: 'johndoe', password: '123456' });

    const { token } = authResponse.body;

    const createItemResponse = await request(app)
      .post('/items')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        name: 'Banana',
        category: 'Food',
        measureUnity: 'KG',
        daysToNotifyExpirationDate: 3,
        minimumStock: 10,
      });

    const { item } = createItemResponse.body;

    const response = await request(app)
      .patch(`/items/image/${item.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .attach('image', `${__dirname}/testImg.png`);

    expect(response.status).toBe(200);
  });

  it('should not be able to upload item image for a non-existent item', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send({ login: 'johndoe', password: '123456' });

    const { token } = authResponse.body;

    const response = await request(app)
      .patch(`/items/image/a1fa433d-fcc9-4695-a24c-c760f4c368ac`)
      .set({ Authorization: `Bearer ${token}` })
      .attach('image', `${__dirname}/testImg.png`);

    expect(response.status).toBe(400);
  });
});
