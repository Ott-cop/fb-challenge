import { Address as AddressPrisma } from "generated/prisma";
import { Address } from "../entitites/address.entity";

export interface AddressRepository {
    findAll(auth_id: string): Promise<Address[]>;
    findOneById(id:string, auth_id: string): Promise<Address | null>;
    delete(id: string, auth_id: string): Promise<void>;
}