import { Address as AddressPrisma } from "generated/prisma";
import { Address } from "../../domain/entitites/address.entity";

export class AddressMapper {

    static toSafe(address: AddressPrisma): Omit<Address, ''> {
        return new Address(
            address.id,
            address.cep,
            address.street,
            address.number,
            address.complement,
            address.neighborhood,
            address.city,
            address.state,
            address.country,
            address.clientId,
        );
    }

    static toSafeMany(addresses: AddressPrisma[]): Omit<Address, ''>[] {
        return addresses.map(AddressMapper.toSafe);
    }
}