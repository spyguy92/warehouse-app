import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('GoodsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/goods (GET)', () => {
    return request(app.getHttpServer())
      .get('/goods')
      .set('Authorization', 'Bearer YOUR_TOKEN')
      .expect(200)
      .expect([]);
  });

  afterAll(async () => {
    await app.close();
  });
});