
import { Client as ClientPrisma, Address as AddressPrisma, Contact as ContactPrisma, Prisma } from "generated/prisma";
import { CreateClientDto } from "../../application/dto/create-client.dto/create-client.dto";
import { Client } from "../../domain/entities/client.entity";
import { DocumentType } from "../../domain/entities/documentType.entity";
import { Address } from "../../domain/entities/address.entity";
import { Contact } from "../../domain/entities/contact.entity";
import { EnrichedAddress } from "../../domain/entities/enriched-address.entity";
import { SafeClient } from "../../application/dto/safe-client.dto";
import { SafeAddress } from "../../application/dto/safe-address.dto";


export class ClientMapper {
    static clientDtoToDomain(clientDTO: CreateClientDto, enrichedAddress: EnrichedAddress, id: string): Client {
        const address = clientDTO.address
        ? new Address(
            '',
            enrichedAddress.cep,
            enrichedAddress.street,
            enrichedAddress.number,
            enrichedAddress.complement,
            enrichedAddress.neighborhood,
            enrichedAddress.city,
            enrichedAddress.state,
            enrichedAddress.country,
            ''
        ) : undefined;

        const contacts = clientDTO.contacts?.map(contact =>
        new Contact(
            '',
            contact.name,
            contact.phone,
            contact.email,
            ''
        )
        ) ?? [];

        return new Client(
            '',
            clientDTO.name,
            clientDTO.document,
            clientDTO.documentType,
            clientDTO.email,
            id,
            address,
            contacts
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
                    name: contact.name,
                    phone: contact.phone,
                    email: contact.email
                }))
            }
            : undefined
        };
    }

    static toSafe(client: Client & { address?: Address } | null): SafeClient {

        let { clientId, ...less_address } = client!.address!;
        
        let safeAddress: SafeAddress = less_address;

        let safeClient: SafeClient = {
            id: client!.id,
            name: client!.name,
            document: client!.document,
            documentType: client!.documentType as DocumentType,
            email: client!.email,
            userId: client!.userId,
            address: safeAddress
        };

        return safeClient;
    }

    static toSafeMany(clients: Client[]): SafeClient[] {
        return clients.map(ClientMapper.toSafe);
    }

    static toDomain(data: (ClientPrisma & { address?: AddressPrisma | null, contacts?: ContactPrisma[] })): Client {
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

    static toDomainMany(data: (ClientPrisma & { address?: AddressPrisma | null, contacts?: ContactPrisma[] })[]): Client[] {
        return data.map(ClientMapper.toDomain)
    }
}