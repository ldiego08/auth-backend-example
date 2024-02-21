import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private users: UserService,
    private jwt: JwtService,
  ) {}

  public async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.users.findByEmail(email);

    if (user && pass === user.password) {
      return {
        ...user,
        password: undefined,
      };
    }

    return null;
  }

  public async login(user: any) {
    const payload = { email: user.email, sub: user.userId };

    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
