import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { DbClient } from './db.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'my-secret',
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, DbClient, LocalStrategy, JwtStrategy],
})
export class AppModule {}
