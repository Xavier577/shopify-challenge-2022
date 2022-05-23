import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/inventory-items (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/inventory-items')
      .expect(200)
      .expect(expect.any(Array));
  });

  it('/api/inventory-items/create (POST)', () => {
    request(app.getHttpServer()).post(
      '/api/inventory-items/create',
      (err, res) => {
        if (err) {
          expect(err).toBeUndefined();
        }
        expect(res.status).toEqual(200);
        expect(res.body).toMatchObject({
          id: expect.any(Number),
          productCategory: expect.any(String),
          title: expect.any(String),
          brand: expect.any(String),
          quantity: expect.any(Number),
          price: expect.any(Number),
          currency: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        });
      },
    );
  });
  it('/api/inventory-items (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/inventory-items')
      .expect(200)
      .expect(expect.any(Array));
  });
});
