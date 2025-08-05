import { Address as AddressPrisma } from "generated/prisma";
import { Address } from "src/modules/addresses/domain/entitites/address.entity";
import { AddressRepository } from "../../../domain/repositories/address.repository";
import { PrismaService } from "src/shared/persistence/prisma/prisma.service";
import { AddressMapper } from "../../mappers/address.mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaAddressRepository implements AddressRepository {
    constructor(private prismaService: PrismaService) {}

    async findAll(auth_id: string): Promise<Address[]> {
        let addresses = await this.prismaService.address.findMany({
            where: { client: { userId: auth_id } },
        });

        return AddressMapper.toSafeMany(addresses);
    }

    async findOneById(id: string, auth_id: string): Promise<Address | null> {
        let address = await this.prismaService.address.findFirst({
            where: { 
                id,
                client: { userId: auth_id } 
            },
        });

        if (!address) return null; 

        return AddressMapper.toSafe(address);
    }

    async delete(id: string, auth_id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
