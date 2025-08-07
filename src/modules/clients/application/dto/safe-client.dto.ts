import { Address } from "../../domain/entities/address.entity";
import { DocumentType } from "../../domain/entities/documentType.entity";
import { SafeAddress } from "./safe-address.dto";

export interface SafeClient {
    id: string,
    name: string,
    document: string,
    documentType: DocumentType,
    email: string,
    userId: string,
    address: SafeAddress | undefined
}