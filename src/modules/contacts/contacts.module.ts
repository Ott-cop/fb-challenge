import { Module } from '@nestjs/common';
import { ContactService } from './domain/services/contact.service';
import { ContactsController } from './interface/controllers/contacts.controller';
import { PrismaContactRepository } from './infrastructure/persistence/prisma-contact.repository.service';
import { PrismaClientRepository } from './infrastructure/persistence/prisma-client.repository';

@Module({
  providers: [ContactService, PrismaContactRepository, PrismaClientRepository],
  controllers: [ContactsController]
})
export class ContactsModule {}
