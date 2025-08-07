import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaContactRepository } from '../../infrastructure/persistence/prisma-contact.repository.service';
import { CreateContactDto } from '../../application/dto/create-contact.dto';
import { ContactMapper } from '../../infrastructure/mappers/contact.mapper';
import { isUUID } from 'class-validator';
import { ErrorMessages, NotFoundTypes } from 'src/shared/constants/error-messages';
import { PrismaClientRepository } from '../../infrastructure/persistence/prisma-client.repository';
import { UpdateContactDto } from '../../application/dto/update-contact.dto';

@Injectable()
export class ContactService {
    constructor(
        private contactRepository: PrismaContactRepository,
        private clientRepository: PrismaClientRepository
    ) {}

    async findAll(auth_id: string) {
        return await this.contactRepository.findAll(auth_id);
    }

    async findAllByClient(client_id: string, auth_id: string) {
        if (!isUUID(client_id)) {
            throw new BadRequestException(ErrorMessages.INVALID_UUID_FORMAT());
        }
        return await this.contactRepository.findAllByClient(client_id, auth_id);
    }   

    async create(client_id: string, dto: CreateContactDto, auth_id: string) {
        if (!isUUID(client_id)) {
            throw new BadRequestException(ErrorMessages.INVALID_UUID_FORMAT());
        }
        let contactDomain = ContactMapper.contactDtoToDomain(dto, client_id);
        
        return await this.contactRepository.create(contactDomain, auth_id);
    }

    async update(client_id: string, contact_id: string, dto: UpdateContactDto, auth_id: string) {
        if (!isUUID(client_id) || !isUUID(contact_id)) {
            throw new BadRequestException(ErrorMessages.INVALID_UUID_FORMAT());
        }

        let client = await this.clientRepository.verifyIfClientExists(client_id, auth_id);
        let contact = await this.contactRepository.verifyIfContactExists(client_id, contact_id, auth_id);

        if (!client) throw new NotFoundException(ErrorMessages.NOT_FOUND(NotFoundTypes.CLIENT));

        if (!contact) throw new NotFoundException(ErrorMessages.NOT_FOUND(NotFoundTypes.CONTACT));

        return await this.contactRepository.update(client_id, contact_id, dto, auth_id);
    }

    async remove(client_id: string, contact_id: string, auth_id: string) {
        if (!isUUID(client_id) || !isUUID(contact_id)) {
            throw new BadRequestException(ErrorMessages.INVALID_UUID_FORMAT());
        }

        let client = await this.clientRepository.verifyIfClientExists(client_id, auth_id);
        let contact = await this.contactRepository.verifyIfContactExists(client_id, contact_id, auth_id);

        if (!client) throw new NotFoundException(ErrorMessages.NOT_FOUND(NotFoundTypes.CLIENT));

        if (!contact) throw new NotFoundException(ErrorMessages.NOT_FOUND(NotFoundTypes.CONTACT));

        return await this.contactRepository.delete(client_id, contact_id, auth_id);
    }
}
