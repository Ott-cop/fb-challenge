
import { Client as ClientPrisma, Address as AddressPrisma, Contact as ContactPrisma, Prisma } from "generated/prisma";
import { CreateClientDto } from "../../application/dto/create-client.dto/create-client.dto";

import { UserMapper } from "src/modules/users/infrastructure/mappers/user.mapper";
import { Client } from "../../domain/entities/client.entity";
import { DocumentType } from "../../domain/entities/documentType.entity";
import { Address } from "../../domain/entities/adress.entity";
import { Contact } from "../../domain/entities/contact.entity";


export class ClientMapper {
    static clientDtoToDomain(clientDTO: CreateClientDto, id: string): Client {
      return new Client(
        '',
        clientDTO.name,
        clientDTO.document,
        clientDTO.documentType,
        clientDTO.email,
        id
      );
    }

    static toPersistence(client: Client): Prisma.ClientCreateInput {
        return {
            name: client.name,
            email: client.email,
            document: client.document,
            documentType: client.documentType, 
            user: {
                connect: { id: client.userId }
            },
            address: client.address
            ? {
                create: {
                    id: client.address.id,
                    cep: client.address.cep,
                    street: client.address.street,
                    number: client.address.number,
                    complement: client.address.complement,
                    neighborhood: client.address.neighborhood,
                    city: client.address.city,
                    state: client.address.state,
                    country: client.address.country,
                }
                }
            : undefined,
            contacts: client.contacts && client.contacts.length
            ? {
                create: client.contacts.map(contact => ({
                    id: contact.id,
                    name: contact.name,
                    phone: contact.phone,
                    email: contact.email
                }))
                }
            : undefined
        };
    }

    static toSafe(client: ClientPrisma): Omit<Client, 'contacts' | 'address'> {
        return new Client(
            client.id,
            client.name,
            client.document,
            client.documentType as DocumentType,
            client.email,
            client.userId
        );
    }

    static toSafeMany(clients: ClientPrisma[]): Omit<Client, 'contacts' | 'address'>[] {
        return clients.map(ClientMapper.toSafe);
    }

    static toDomain(data: ClientPrisma & { address?: AddressPrisma | null, contacts?: ContactPrisma[] }): Client {
        const address = data.address
        ? new Address(
            data.address.id,
            data.address.cep,
            data.address.street,
            data.address.number,
            data.address.complement ?? '',
            data.address.neighborhood,
            data.address.city,
            data.address.state,
            data.address.country,
            data.address.clientId
            )
        : undefined;

        const contacts = data.contacts?.map(contact =>
        new Contact(
            contact.id,
            contact.name,
            contact.phone,
            contact.email,
            contact.clientId
        )
        ) ?? [];

        return new Client(
        data.id,
        data.name,
        data.document,
        data.documentType as DocumentType, 
        data.email,
        data.userId,
        address,
        contacts
        );
  }
}