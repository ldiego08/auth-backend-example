import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DbClient } from './db.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DbClient) {}

  public async findByEmail(email: string) {
    return await this.db.user.findUnique({
      where: { email },
    });
  }

  public async create(user: Omit<User, 'id'>) {
    const userExists = await this.db.user
      .findUnique({ where: { email: user.email } })
      .then(Boolean);

    if (userExists) {
      throw new Error('User already exists.');
    }

    const createdUser = await this.db.user.create({
      data: {
        ...user,
      },
    });

    delete createdUser.password;

    return createdUser;
  }
}
