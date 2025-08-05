import { Injectable } from "@nestjs/common";
import { Client as ClientPrisma } from "generated/prisma";
import { ClientRepository } from "src/modules/clients/domain/repositories/client.repository";
import { PrismaService } from "src/shared/persistence/prisma/prisma.service";
import { ClientMapper } from "../../mappers/client.mapper";
import { Client } from "src/modules/clients/domain/entities/client.entity";

@Injectable()
export class PrismaClientRepository implements ClientRepository {
    constructor(private readonly prismaService: PrismaService) {}
    
    async create(client: Client): Promise<ClientPrisma> {
        return await this.prismaService.client.create({
            data: ClientMapper.toPersistence(client)
        });
    }

    async findAll(auth_id: string): Promise<Client[]> {
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

    async findOneById(id: string, auth_id: string): Promise<Client | null> {
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

    async isDocumentOrEmailAlreadyInUse(document: string, email: string): Promise<boolean> {
        const user = await this.prismaService.client.findFirst({
            where: {
              OR: [
                { email },
                { document }
              ],
            },
        });
      
        return !!user;
    }   
}
