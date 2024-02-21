import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { IsString } from 'class-validator';
import { LocalAuthGuard } from './local.guard';
import { Response } from 'express';

export class UserRegisterRequest {
  @IsString()
  public name: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public profileImageUrl: string;
}

@Controller('users')
export class UserController {
  constructor(
    private readonly users: UserService,
    private readonly auth: AuthService,
  ) {}

  @Post('register')
  public async register(@Body() user: UserRegisterRequest) {
    return this.users.create(user);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  public async login(@Body() body: any) {
    return this.auth.login(body);
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('connect.sid');
    return { message: 'Logged out successfully' };
  }
}
