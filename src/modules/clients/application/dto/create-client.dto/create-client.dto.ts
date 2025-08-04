import { Name } from "src/shared/decorators/validators/name.decorator";
import { Address } from "./address";
import { DocumentType } from "./document_type";
import { Email } from "src/shared/decorators/validators/email.decorator";
import { Contact } from "./contact";
import { Document } from "src/shared/decorators/validators/document.decorator";


export class CreateClientDto {
    @Name()
    name: string;

    @Document()
    document: string;
    
    documentType: DocumentType;
    
    @Email()
    email: string;
    
    address: Address;

    contacts: Contact[];
}
