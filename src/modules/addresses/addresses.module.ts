import { Module } from '@nestjs/common';
import { AddressController } from './interface/controllers/address.controller';
import { AddressService } from './domain/services/address.service';
import { PrismaAddressRepository } from './infrastructure/persistence/repositories/prisma-address.repository';

@Module({
  controllers: [AddressController],
  providers: [AddressService, PrismaAddressRepository]
})
export class AddressesModule {}
