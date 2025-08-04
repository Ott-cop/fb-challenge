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

    async findAll(auth_id: string): Promise<Partial<Client[]>> {
        let clients = await this.prismaService.client.findMany({
            where: {
                userId: auth_id
            }
        });
      
        return ClientMapper.toSafeMany(clients);
    }

    async findOneById(id: string, auth_id: string): Promise<Partial<Client> | null> {
        let client = await this.prismaService.client.findFirst({
            where: {
                userId: auth_id,
                id
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
            }
        });
    }
}
