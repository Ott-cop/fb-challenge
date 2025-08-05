import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserService } from '../users/domain/services/user.service';
import { PrismaUserRepository } from '../users/infrastructure/persistence/repositories/prisma-user.repository';
import { PrismaAuthRepository } from './repositories/prisma-auth.repository';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' }
    }),
    RoleModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaAuthRepository]
})
export class AuthModule {}
