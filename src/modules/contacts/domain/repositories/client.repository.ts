import { Client } from "../entities/client.entity";

export interface ClientRepository {
    verifyIfClientExists(client_id: string, auth_id: string): Promise<boolean>;
} 