import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from './user.interface';
import { GoogleAuthGuard } from './google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() _req: Request) {
    // This endpoint initiates Google OAuth flow
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req: Request) {
    const user = req.user as User;

    const token = this.jwtService.sign({
      id: user.googleId,
      email: user.email,
      name: user.displayName,
    });

    return {
      message: 'User authenticated',
      token,
    };
  }
}
