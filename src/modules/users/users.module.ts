import { Module } from '@nestjs/common';

import { UserService } from './domain/services/user.service';
import { UsersController } from './interface/controllers/users.controller';
import { PrismaUserRepository } from './infrastructure/persistence/repositories/prisma-user.repository';
import { PasswordService } from 'src/shared/security/password.service';

@Module({
  controllers: [UsersController],
  providers: [UserService, PrismaUserRepository, PasswordService]
})
export class UsersModule {}
