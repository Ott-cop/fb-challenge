import { ForbiddenException, Injectable } from "@nestjs/common";
import { Client as ClientPrisma } from "generated/prisma";
import { ClientRepository } from "src/modules/clients/domain/repositories/client.repository";
import { PrismaService } from "src/shared/persistence/prisma/prisma.service";
import { ClientMapper } from "../../mappers/client.mapper";
import { Client } from "src/modules/clients/domain/entities/client.entity";
import { SafeClient } from "src/modules/clients/application/dto/safe-client.dto";
import { ErrorMessages } from "src/shared/constants/error-messages";

@Injectable()
export class PrismaClientRepository implements ClientRepository {
    constructor(private readonly prismaService: PrismaService) {}
    
    async create(clientDomain: Client): Promise<ClientPrisma> {
        return await this.prismaService.client.create({
            data: ClientMapper.toPersistence(clientDomain)
        });
    }

    async findAll(auth_id: string): Promise<SafeClient[]> {
        let clients = await this.prismaService.client.findMany({
            where: {
                userId: auth_id
            },
            include: {
                address: true
            }
        });

        let mappedClients = ClientMapper.toDomainMany(clients); 
      
        return ClientMapper.toSafeMany(mappedClients);
    }

    async findOneById(id: string, auth_id: string): Promise<SafeClient | null> {
        let client = await this.prismaService.client.findFirst({
            where: {
                userId: auth_id,
                id
            },
            include: {
                address: true
            }
        });

        if (!client) return null;

        const clientDomain = ClientMapper.toDomain(client);

        return ClientMapper.toSafe(clientDomain);
    }

    async delete(id: string, auth_id: string): Promise<void> {
        await this.prismaService.client.delete({
            where: { 
                userId: auth_id,
                id 
            },
            include: {
                address: true
            }
        });
    }

    async isDocumentOrEmailAlreadyInUse(document: string, email: string, auth_id: string): Promise<boolean> {
        const client = await this.prismaService.client.findFirst({
            where: {
                userId: auth_id,
                OR: [
                    { email },
                    { document }
                ],
            },
        });
      
        return !!client;
    }   
}
