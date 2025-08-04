import { Module } from '@nestjs/common';
import { ClientControllerController } from './interface/controllers/client.controller.controller';
import { ClientServiceService } from './domain/services/client.service';
import { PrismaClientRepository } from './infrastructure/persistence/repositories/prisma-client.repository';

@Module({
  controllers: [ClientControllerController],
  providers: [ClientServiceService, PrismaClientRepository]
})
export class ClientsModule {}
