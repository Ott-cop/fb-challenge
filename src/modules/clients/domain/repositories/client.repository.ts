import { Client as ClientPrisma } from "generated/prisma";
import { Client } from "../entities/client.entity";
import { SafeClient } from "../../application/dto/safe-client.dto";


export interface ClientRepository {
    create(client: Client): Promise<ClientPrisma>;
    findAll(auth_id: string): Promise<Partial<SafeClient[]>>;
    findOneById(id: string, auth_id: string): Promise<Partial<SafeClient | null>>;
    delete(id: string, auth_id: string): Promise<void>;
}
