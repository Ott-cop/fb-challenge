import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientRepository } from '../../infrastructure/persistence/repositories/prisma-client.repository';
import { CreateClientDto } from '../../application/dto/create-client.dto/create-client.dto';
import { ClientMapper } from '../../infrastructure/mappers/client.mapper';
import { ErrorMessages, NotFoundTypes } from 'src/shared/constants/error-messages';
import { isUUID } from 'class-validator';
import { ViaCepService } from 'src/shared/services/via-cep/via-cep.service';
import { EnrichedAddress } from '../entities/enriched-address.entity';

@Injectable()
export class ClientService {
    
    constructor(private clientRepository: PrismaClientRepository, private viaCepService: ViaCepService) {}

    async findAll(auth_id: string) {
        let clients = await this.clientRepository.findAll(auth_id);
        return clients;
    }

    async findOneById(id: string, auth_id: string) {
        if (!isUUID(id)) {
            throw new BadRequestException(ErrorMessages.INVALID_UUID_FORMAT());
        }

        let client = await this.clientRepository.findOneById(id, auth_id);

        if (client == null) {
            throw new NotFoundException(ErrorMessages.NOT_FOUND(NotFoundTypes.CLIENT));
        }

        return client;
    }

    async create(createClientDto: CreateClientDto, auth_id: string) {
        
        if (await this.clientRepository.isDocumentOrEmailAlreadyInUse(createClientDto.document, createClientDto.email, auth_id)) {
            throw new ConflictException(ErrorMessages.DOCUMENT_OR_EMAIL_ALREADY_IN_USE());
        }

        const inputAddress = createClientDto.address;

        if (inputAddress) {
            const viaCepData = await this.viaCepService.getAddressByCep(inputAddress.cep);

            let enrichedAddress = new EnrichedAddress(
                inputAddress.cep,
                viaCepData.street,
                inputAddress.number,
                inputAddress.complement ?? null,
                viaCepData.neighborhood,
                viaCepData.city,
                viaCepData.state,
                'BR',
            );
            
            const client = ClientMapper.clientDtoToDomain(createClientDto, enrichedAddress, auth_id);
    
            await this.clientRepository.create(client);
        }

    }

    async remove(id: string, auth_id: string) {
        if (!isUUID(id)) {
            throw new BadRequestException(ErrorMessages.INVALID_UUID_FORMAT());
        }

        let user = await this.clientRepository.findOneById(id, auth_id);

        if (user == null) {
            throw new NotFoundException(ErrorMessages.NOT_FOUND(NotFoundTypes.CLIENT));
        }

        return await this.clientRepository.delete(id, auth_id);
    }
}
