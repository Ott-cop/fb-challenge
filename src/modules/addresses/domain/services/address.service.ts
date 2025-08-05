import { Injectable } from '@nestjs/common';
import { PrismaAddressRepository } from '../../infrastructure/persistence/repositories/prisma-address.repository';

@Injectable()
export class AddressService {
    constructor(private addressRepository: PrismaAddressRepository) {}

    async findAll(auth_id: string) {
        return await this.addressRepository.findAll(auth_id);
    }
}
