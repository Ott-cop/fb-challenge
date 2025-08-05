import { Address } from "../../domain/entities/address.entity";
import { DocumentType } from "../../domain/entities/documentType.entity";

export interface SafeClient {
    id: string,
    name: string,
    document: string,
    documentType: DocumentType,
    email: string,
    userId: string,
    address: Address | undefined
}