import { Contact as ContactPrisma } from "generated/prisma";
import { Contact } from "../../domain/entities/contact.entity";
import { CreateContactDto } from "../../application/dto/create-contact.dto";
import { UpdateContactDto } from "../../application/dto/update-contact.dto";

export class ContactMapper {
    static toSafe(contact: ContactPrisma): Contact {
        return {
            id: contact.id,
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            clientId: contact.clientId
        }
    }

    static toSafeMany(contacts: ContactPrisma[]): Contact[] {
        return contacts.map(ContactMapper.toSafe);
    }

    static contactDtoToDomain(contactDto: CreateContactDto, id: string): Contact {
        let contact = new Contact(
            undefined,
            contactDto.name,
            contactDto.phone,
            contactDto.email,
            id
        );
        
        return contact; 
    }

    static toDomainPartial(updateContactDto: UpdateContactDto): Partial<Contact> {
        const contact: Partial<Contact> = {};

        if (updateContactDto.name && updateContactDto.name.trim() !== '') {
            contact.name = updateContactDto.name;
        }

        if (updateContactDto.phone && updateContactDto.phone.trim() !== '') {
            contact.phone = updateContactDto.phone;
        }

        if (updateContactDto.email && updateContactDto.email.trim() !== '') {
            contact.email = updateContactDto.email;
        }

        return contact;
    }
}