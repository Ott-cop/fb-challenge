import { Module } from '@nestjs/common';

import { UserService } from './domain/services/user.service';
import { UsersController } from './interface/controllers/users.controller';
import { PrismaUserRepository } from './infrastructure/persistence/repositories/prisma-user.repository';

@Module({
  controllers: [UsersController],
  providers: [UserService, PrismaUserRepository]
})
export class UsersModule {}
