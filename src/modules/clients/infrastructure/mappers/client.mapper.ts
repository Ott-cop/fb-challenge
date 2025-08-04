import { Client } from "../../domain/entities/client.entity";


export class ClientMapper {
    static toPersistence(client: Client): Omit<Client, 'id'> {
        return {
            name: client.name,
            email: client.email,
            document: client.document,
            documentType: client.documentType,
            userId: client.userId,
            address: client.address,
            contacts: client.contacts
        }
    }
}