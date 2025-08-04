import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/modules.module';
import { PrismaService } from './shared/persistence/prisma/prisma.service';
import { PrismaModule } from './shared/persistence/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ViaCepService } from './shared/services/via-cep/via-cep.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ModulesModule, PrismaModule, AuthModule, HttpModule, UsersModule],
  providers: [PrismaService, ViaCepService],
  exports: [ViaCepService]
})
export class AppModule {}
