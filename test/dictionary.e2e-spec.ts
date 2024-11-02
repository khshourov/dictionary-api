import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import * as request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';

describe('DictionaryController (e2e)', () => {
  let app: NestExpressApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create record for new search', async () => {
    const searchWord = 'hello';
    const bearerToken = app.get<JwtService>(JwtService).sign({
      id: '1001',
      name: 'John Doe',
      email: 'john.doe@example.com',
    });

    return request(app.getHttpServer())
      .get(`/dictionary/${searchWord}`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const dictionaryWord = response?.body?.dictionaryWord;
        expect(dictionaryWord).not.toBeUndefined();
        expect(dictionaryWord.id).toBe(1);
        expect(dictionaryWord.word).toBe(searchWord);
        expect(dictionaryWord.lexicalEntry).not.toBeUndefined();

        expect(response.body.accessSummary).toBeNull();
      });
  });

  it('should give cached result if search word is already seen', async () => {
    const searchWord = 'hello';
    const bearerToken = app.get<JwtService>(JwtService).sign({
      id: '1001',
      name: 'John Doe',
      email: 'john.doe@example.com',
    });

    await request(app.getHttpServer())
      .get(`/dictionary/${searchWord}`)
      .set('Authorization', `Bearer ${bearerToken}`);

    return request(app.getHttpServer())
      .get(`/dictionary/${searchWord}`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const dictionaryWord = response?.body?.dictionaryWord;
        expect(dictionaryWord).not.toBeUndefined();
        expect(dictionaryWord.id).toBe(1);

        expect(response?.body?.accessSummary).not.toBeNull();
      });
  });

  it('should increase total-access for same word', async () => {
    const searchWord = 'innocuous';
    const bearerToken = app.get<JwtService>(JwtService).sign({
      id: '1001',
      name: 'John Doe',
      email: 'john.doe@example.com',
    });

    await request(app.getHttpServer())
      .get(`/dictionary/${searchWord}`)
      .set('Authorization', `Bearer ${bearerToken}`);

    return request(app.getHttpServer())
      .get(`/dictionary/${searchWord}`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const accessSummary = response?.body?.accessSummary;
        expect(accessSummary).not.toBeUndefined();
        expect(accessSummary.totalAccess).toBe(1);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
