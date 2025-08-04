import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientRepository } from '../../infrastructure/persistence/repositories/prisma-client.repository';
import { CreateClientDto } from '../../application/dto/create-client.dto/create-client.dto';
import { ClientMapper } from '../../infrastructure/mappers/client.mapper';
import { ErrorMessages } from 'src/shared/constants/error-messages';
import { isUUID } from 'class-validator';
import { ViaCepService } from 'src/shared/services/via-cep/via-cep.service';

@Injectable()
export class ClientService {
    
    constructor(private clientRepository: PrismaClientRepository, private viaCepService: ViaCepService) {}

    async findAll(auth_id: string) {
        return await this.clientRepository.findAll(auth_id);
    }

    async findOneById(id: string, auth_id: string) {
        if (!isUUID(id)) {
            throw new BadRequestException(ErrorMessages.INVALID_UUID_FORMAT());
        }

        let user = await this.clientRepository.findOneById(id, auth_id);

        if (user == null) {
            throw new NotFoundException(ErrorMessages.USER_NOT_FOUND());
        }

        return user;
    }

    async create(createClientDto: CreateClientDto, auth_id: string) {
        const inputAddress = createClientDto.address;
        // let enrichedAddress: {
        //     cep: string;
        //     number: string;
        //     complement: string | null;
        //     street: string;
        //     neighborhood: string;
        //     city: string;
        //     state: string;
        //     country: string;
        // } | undefined;

        let enrichedAddress;

        if (inputAddress) {
            // const viaCepData = {
            //     street: '',
            //     neighborhood: '',
            //     city: '',
            //     state: ''
            // }; 

            const viaCepData = await this.viaCepService.getAddressByCep(inputAddress.cep);

            enrichedAddress = {
                cep: inputAddress.cep,
                number: inputAddress.number,
                complement: inputAddress.complement ?? null,
                street: viaCepData.street,
                neighborhood: viaCepData.neighborhood,
                city: viaCepData.city,
                state: viaCepData.state,
                country: 'BR',
            };
        }
        
        const client = ClientMapper.clientDtoToDomain({
            ...createClientDto,
            address: enrichedAddress,
        }, auth_id);

        await this.clientRepository.create(client);
    }

    async remove(id: string, auth_id: string) {
        let user = await this.clientRepository.findOneById(id, auth_id);

        if (user == null) {
            throw new NotFoundException(ErrorMessages.USER_NOT_FOUND());
        }

        return await this.clientRepository.delete(id, auth_id);
    }
}
