import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { createMock } from '@golevelup/ts-jest';
import { Response } from 'express';

interface MockedResponse extends Response {
  render: jest.Mock;
  redirect: jest.Mock;
}

class MockJwtService extends JwtService {
  verifyAsync<User>(token: string, options?: JwtVerifyOptions): Promise<User> {
      return Promise.resolve({
        id: '1001',
        name: 'John Doe',
        email: 'john.doe@example.com',
      } as User)
  }
}

describe('AppController', () => {
  let appController: AppController;
  let jwtService: JwtService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: JwtService,
          useFactory: () => new MockJwtService(),
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    jwtService = app.get<JwtService>(JwtService);
  });

  describe('root', () => {
    it('should return home page with token parameter when valid token provided', async () => {
      const validToken = 'valid-token';

      const res = createMock<MockedResponse>();
      res.render = jest.fn();

      await appController.root(validToken, res);

      expect(res.render).toHaveBeenCalledWith('index', { token: validToken });
    });

    it('should redirect to auth page when invalid token provided', async () => {
      const invalidToken = 'invalid-token';

      jwtService.verifyAsync = () => Promise.reject(new Error('Invalid Token'));

      const res = createMock<MockedResponse>();
      res.redirect = jest.fn();

      await appController.root(invalidToken, res);

      expect(res.redirect).toHaveBeenCalledWith('/auth/google');
    })
  });
});
