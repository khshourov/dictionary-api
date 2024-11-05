import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Throttle } from '@nestjs/throttler';

import { GoogleAuthGuard } from '../guards/google-auth.guard';
import { GoogleUser } from '../interfaces/google-user.interface';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
@Throttle({ default: { limit: 5, ttl: 60000 } })
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async googleAuth(@Req() _req: Request) {
    // This endpoint initiates Google OAuth flow
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as GoogleUser;

    const token = this.jwtService.sign(
      {
        id: user.id,
        email: user.emails[0].value,
        name: user.displayName,
      },
      { expiresIn: this.configService.get('JWT_EXPIRES_IN') },
    );

    return res.redirect(`/?token=${token}`);
  }
}
