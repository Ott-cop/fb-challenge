import { Injectable } from "@nestjs/common";
import { Client } from "generated/prisma";
import { ClientRepository } from "src/modules/clients/domain/repositories/client.repository";
import { PrismaService } from "src/shared/persistence/prisma/prisma.service";
import { ClientMapper } from "../../mappers/client.mapper";

@Injectable()
export class PrismaClientRepository implements ClientRepository {
    constructor(private readonly prismaSerivce: PrismaService) {}
    async create(client: Client): Promise<Client> {
        return await this.prismaSerivce.client.create({
            data: ClientMapper.toPersistence(client)
        });
    }
    findAll(): Promise<Partial<Client[]>> {
        throw new Error("Method not implemented.");
    }
}
