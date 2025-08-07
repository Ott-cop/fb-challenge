import { Contact } from "../entities/contact.entity";

export interface ContactRepository {
    findAll(auth_id: string): Promise<Contact[]>;
    findAllByClient(client_id: string, auth_id: string): Promise<Contact[]>;
    create(contact: Contact, auth_id: string): Promise<Contact>;
    update(client_id: string, contact_id: string, contactToUpdate: Contact, auth_id: string): Promise<Contact>;
    delete(client_id: string, contact_id: string, auth_id: string): Promise<void>;
    verifyIfContactExists(client_id: string, contact_id: string, auth_id: string): Promise<boolean>;
} 