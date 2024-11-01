import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { ManifestReader } from 'src/general/manifest-reader.interface';
import { join } from 'path';
import * as request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'hbs';
import { AppService } from '../src/app.service';

describe('AppController (e2e)', () => {
  const assetManifestPath = join(__dirname, 'resources', 'asset-manifest.json');
  let app: NestExpressApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication<NestExpressApplication>();
    hbs.registerHelper('assetPath', (asset) =>
      app.get(AppService).getAssetPath(asset),
    );
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    app.get<ManifestReader>('ManifestReader').path = join(assetManifestPath);
    await app.init();
  });

  it('should render the index page when valid token is provided', async () => {
    const bearerToken = app.get<JwtService>(JwtService).sign({
      id: '1001',
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    return request(app.getHttpServer())
      .get(`/?token=${bearerToken}`)
      .expect(200);
  });

  it('should redirect to auth/google page if token is invalid', async () => {
    const bearerToken = 'invalid-token';
    return request(app.getHttpServer())
      .get(`/?token=${bearerToken}`)
      .expect(302)
      .expect('Location', '/auth/google');
  });

  afterAll(async () => {
    await app.close();
  });
});
