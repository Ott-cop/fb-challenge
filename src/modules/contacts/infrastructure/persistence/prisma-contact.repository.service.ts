import { ForbiddenException, Injectable } from '@nestjs/common';
import { ContactRepository } from '../../domain/repositories/contact.repository';
import { Contact } from '../../domain/entities/contact.entity';
import { PrismaService } from 'src/shared/persistence/prisma/prisma.service';
import { ContactMapper } from '../mappers/contact.mapper';
import { ErrorMessages, NotFoundTypes } from 'src/shared/constants/error-messages';
import { UpdateContactDto } from '../../application/dto/update-contact.dto';

@Injectable()
export class PrismaContactRepository implements ContactRepository {
    constructor(private prismaService: PrismaService) {}

    async findAll(auth_id: string): Promise<Contact[]> {
        let contacts = await this.prismaService.contact.findMany({
            where: { client: { userId: auth_id } }
        });

        return ContactMapper.toSafeMany(contacts);
    }

    async findAllByClient(client_id: string, auth_id: string): Promise<Contact[]> {
        let contacts = await this.prismaService.contact.findMany({
            where: { 
                client: { userId: auth_id, id: client_id } 
            }
        });

        return ContactMapper.toSafeMany(contacts);
    }

    async create(contact: Contact, auth_id: string): Promise<Contact> {
        const client = await this.prismaService.client.findUnique({
            where: { id: contact.id }
        });

        if (!client || client.userId !== auth_id) {
            throw new ForbiddenException(ErrorMessages.FORBIDDEN_MESSAGE());
        }

        let contact_created = await this.prismaService.contact.create({
            data: contact
        });

        return contact_created;
    }

    async update(client_id: string, contact_id: string, contactToUpdate: UpdateContactDto, auth_id: string): Promise<Contact> {
        let contact = await this.prismaService.contact.update({
            where: {
                client: { userId: auth_id, id: client_id },
                id: contact_id
            },
            data: ContactMapper.toDomainPartial(contactToUpdate)
        });

        return contact;
    }

    async delete(client_id: string, contact_id: string, auth_id: string): Promise<void> {
        await this.prismaService.contact.delete({
            where: {
                client: { userId: auth_id, id: client_id },
                id: contact_id
            }
        });
    }

    async verifyIfContactExists(client_id: string, contact_id: string, auth_id: string): Promise<boolean> {
        const client = await this.prismaService.client.findUnique({
            where: { id: client_id }
        });

        if (!client || client.userId !== auth_id) {
            throw new ForbiddenException(ErrorMessages.NOT_FOUND(NotFoundTypes.CLIENT));
        }

        let contact = await this.prismaService.contact.findFirst({
            where: {
                clientId: client_id,
                id: contact_id
            }
        });

        return !!contact;
    }
}
