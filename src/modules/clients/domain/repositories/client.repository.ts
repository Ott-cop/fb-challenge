import { Client as ClientPrisma } from "generated/prisma";
import { Client } from "../entities/client.entity";


export interface ClientRepository {
    create(client: Client): Promise<ClientPrisma>;
    findAll(auth_id: string): Promise<Partial<Client[]>>;
    findOneById(id: string, auth_id: string): Promise<Partial<Client | null>>;
    delete(id: string, auth_id: string): Promise<void>;
}
