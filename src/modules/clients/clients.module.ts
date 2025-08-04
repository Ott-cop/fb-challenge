import { Module } from '@nestjs/common';
import { ClientController } from './interface/controllers/client.controller';
import { PrismaClientRepository } from './infrastructure/persistence/repositories/prisma-client.repository';
import { ClientService } from './domain/services/client.service';
import { ViaCepService } from 'src/shared/services/via-cep/via-cep.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ClientController],
  providers: [ClientService, PrismaClientRepository, ViaCepService]
})
export class ClientsModule {}
