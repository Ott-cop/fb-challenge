import { Client } from "generated/prisma";


export interface ClientRepository {
    create(client: Client): Promise<Client>;
    findAll(): Promise<Partial<Client[]>>;
}
