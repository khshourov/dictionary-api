import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { GoogleAuthGuard } from '../guards/google-auth.guard';
import { GoogleUser } from '../interfaces/google-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async googleAuth(@Req() _req: Request) {
    // This endpoint initiates Google OAuth flow
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req: Request) {
    const user = req.user as GoogleUser;

    const token = this.jwtService.sign({
      id: user.id,
      email: user.emails[0].value,
      name: user.displayName,
    });

    return {
      message: 'User authenticated',
      token,
    };
  }
}
