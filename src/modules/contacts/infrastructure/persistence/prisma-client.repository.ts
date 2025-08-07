import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/persistence/prisma/prisma.service";
import { Client } from "../../domain/entities/client.entity";
import { ClientRepository } from "../../domain/repositories/client.repository";
import { DocumentType } from "../../domain/entities/documentType.entity";

@Injectable()
export class PrismaClientRepository implements ClientRepository {
    constructor(private prismaService: PrismaService) {}

    async verifyIfClientExists(client_id: string, auth_id: string): Promise<boolean> {
        let client = await this.prismaService.client.findFirst({
            where: {
                userId: auth_id,
                id: client_id
            }
        });

        return !!client;
    }
}