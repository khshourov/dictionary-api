import { Get, Controller, Query, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly jwtService: JwtService) {}

  @Get()
  async root(@Query('token') token: string, @Res() res: Response) {
    let verifiedToken = false;
    try {
      verifiedToken = !!(await this.jwtService.verifyAsync(token));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {}

    if (!verifiedToken) {
      return res.redirect('/auth/google');
    }
    return res.render('index', {
      token,
    });
  }
}
