import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/modules.module';
import { PrismaService } from './shared/persistence/prisma/prisma.service';
import { PrismaModule } from './shared/persistence/prisma/prisma.module';
import { ViaCepService } from './shared/services/via-cep/via-cep.service';
import { HttpModule } from '@nestjs/axios';
import { PasswordModule } from './shared/security/password.module';

@Module({
  imports: [ModulesModule, PrismaModule, HttpModule, PasswordModule],
  providers: [PrismaService, ViaCepService],
  exports: [ViaCepService]
})
export class AppModule {}
