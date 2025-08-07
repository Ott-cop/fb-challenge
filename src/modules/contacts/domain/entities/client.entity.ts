 import { Contact } from "./contact.entity";
import { DocumentType } from "./documentType.entity";

export class Client {
    constructor(
        public readonly id: string,
        public name: string,
        public document: string,
        public documentType: DocumentType,
        public email: string,
        public userId: string,
        public contacts?: Contact[]
    ) {}
}