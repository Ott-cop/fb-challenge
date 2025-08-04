import { Injectable } from '@nestjs/common';
import { PrismaClientRepository } from '../../infrastructure/persistence/repositories/prisma-client.repository';
import { CreateClientDto } from '../../application/dto/create-client.dto/create-client.dto';
import { ClientMapper } from '../../infrastructure/mappers/client.mapper';

@Injectable()
export class ClientService {
    constructor(private clientRepository: PrismaClientRepository) {}

    async create(createClientDto: CreateClientDto) {
        let client = ClientMapper.toPersistence(createClientDto);
    }
}
