import { Address as AddressPrisma } from "generated/prisma";
import { Address } from "../entitites/address.entity";
import { UpdateAddressDto } from "../../application/dto/update-address.dto";

export interface AddressRepository {
    findAll(auth_id: string): Promise<Address[]>;
    findOneById(id:string, auth_id: string): Promise<Address | null>;
    update(id: string, address_update: UpdateAddressDto, auth_id: string): Promise<Address>;
    delete(id: string, auth_id: string): Promise<void>;
}