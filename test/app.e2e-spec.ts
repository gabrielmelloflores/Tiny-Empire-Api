import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

describe('Auth (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should register a new user', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ username: 'testuser', password: 'testpass123' })
      .expect(201);
  });

  it('should login with valid credentials', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'testuser', password: 'testpass123' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('access_token');
      });
  });

  it('should not access admin-only with player role', async () => {
    // First login
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'testuser', password: 'testpass123' });

    const token = loginRes.body.access_token;

    // Try to access admin-only
    return request(app.getHttpServer())
      .get('/users/admin-only')
      .set('Authorization', `Bearer ${token}`)
      .expect(403);
  });
