import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaAddressRepository } from '../../infrastructure/persistence/repositories/prisma-address.repository';
import { ErrorMessages, NotFoundTypes } from 'src/shared/constants/error-messages';
import { isUUID } from 'class-validator';
import { UpdateAddressDto } from '../../application/dto/update-address.dto';
import { ViaCepService } from 'src/shared/services/via-cep/via-cep.service';
import { EnrichedAddress } from 'src/modules/clients/domain/entities/enriched-address.entity';
import { AddressMapper } from '../../infrastructure/mappers/address.mapper';
import { UpdateAddress } from '../entitites/update-address.entity';

@Injectable()
export class AddressService {
    constructor(private addressRepository: PrismaAddressRepository, private viaCepService: ViaCepService) {}

    async findAll(auth_id: string) {
        return await this.addressRepository.findAll(auth_id);
    }

    async findOne(id: string, auth_id: string) {
        if (!isUUID(id)) {
            throw new BadRequestException(ErrorMessages.INVALID_UUID_FORMAT());
        }

        let address = await this.addressRepository.findOneById(id, auth_id);

        if (!address) {
            throw new NotFoundException(ErrorMessages.NOT_FOUND(NotFoundTypes.ADDRESS));
        } 

        return address;
    }

    async update(id: string, address_update: UpdateAddressDto, auth_id: string) {
        if (!isUUID(id)) {
            throw new BadRequestException(ErrorMessages.INVALID_UUID_FORMAT());
        }

        let address = await this.addressRepository.findOneById(id, auth_id);

        if (!address) {
            throw new NotFoundException(ErrorMessages.NOT_FOUND(NotFoundTypes.ADDRESS));
        }

    
        let cepToUse = address_update.cep ?? address.cep;
        let viaCepData;

        if (address_update.cep && address_update.cep.trim() !== '') {
            viaCepData = await this.viaCepService.getAddressByCep(address_update.cep);
        } else {
            viaCepData = {
                street: address.street,
                neighborhood: address.neighborhood,
                city: address.city,
                state: address.state
            };
        }

        const enrichedAddress = new EnrichedAddress(
            cepToUse,
            viaCepData.street,
            address_update.number ?? address.number,
            address_update.complement ?? address.complement ?? null,
            viaCepData.neighborhood,
            viaCepData.city,
            viaCepData.state,
            'BR',
        );

        const updateData: UpdateAddress = {
            cep: enrichedAddress.cep,
            street: enrichedAddress.street,
            neighborhood: enrichedAddress.neighborhood,
            city: enrichedAddress.city,
            state: enrichedAddress.state,
            number: enrichedAddress.number,
            complement: enrichedAddress.complement ?? undefined,
            country: enrichedAddress.country,
        };

        return await this.addressRepository.update(id, updateData, auth_id);
        
    }
}
