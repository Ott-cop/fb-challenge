import { Module } from '@nestjs/common';
import { AddressController } from './interface/controllers/address.controller';
import { AddressService } from './domain/services/address.service';
import { PrismaAddressRepository } from './infrastructure/persistence/repositories/prisma-address.repository';
import { ViaCepService } from 'src/shared/services/via-cep/via-cep.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [AddressController],
  providers: [AddressService, PrismaAddressRepository, ViaCepService],
  imports: [HttpModule]
})
export class AddressesModule {}
