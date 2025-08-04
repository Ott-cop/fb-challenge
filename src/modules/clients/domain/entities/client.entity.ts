import { Adress } from "./adress.entity";
import { Contact } from "./contact.entity";

export class Client {
    constructor(
        public readonly id: string,
        public name: string,
        public document: string,
        public documentType: DocumentType,
        public email: string,
        public userId: string,
        public address?: Adress,
        public contacts?: Contact[]
    ) {}
}