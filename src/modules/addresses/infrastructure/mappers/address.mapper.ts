import { Address as AddressPrisma } from "generated/prisma";
import { Address } from "../../domain/entitites/address.entity";
import { UpdateAddressDto } from "../../application/dto/update-address.dto";
import { EnrichedAddress } from "src/modules/clients/domain/entities/enriched-address.entity";

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

    static toDomainPartial(updateAddressDto: EnrichedAddress): Partial<Address> {
        const address: Partial<Address> = {};

        if (updateAddressDto.cep && updateAddressDto.cep.trim() !== '') {
            address.cep = updateAddressDto.cep;
        }

        if (updateAddressDto.street && updateAddressDto.street.trim() !== '') {
            address.street = updateAddressDto.street;
        }

        if (updateAddressDto.number && updateAddressDto.number.trim() !== '') {
            address.number = updateAddressDto.number;
        }

        if (updateAddressDto.complement && updateAddressDto.complement.trim() !== '') {
            address.complement = updateAddressDto.complement;
        }

        if (updateAddressDto.neighborhood && updateAddressDto.neighborhood.trim() !== '') {
            address.neighborhood = updateAddressDto.neighborhood;
        }

        if (updateAddressDto.city && updateAddressDto.city.trim() !== '') {
            address.city = updateAddressDto.city;
        }

        if (updateAddressDto.state && updateAddressDto.state.trim() !== '') {
            address.state = updateAddressDto.state;
        }

        if (updateAddressDto.country && updateAddressDto.country.trim() !== '') {
            address.country = updateAddressDto.country;
        }

        return address;
    }

    static addressUpdateDtoToDomain(
        dto: UpdateAddressDto,
        enriched: EnrichedAddress,
        id: string,
        clientId: string): Address {
        return new Address(
            id,
            enriched.cep,
            enriched.street,
            dto.number,
            dto.complement ?? null,
            enriched.neighborhood,
            enriched.city,
            enriched.state,
            enriched.country,
            clientId
        );
    }
}