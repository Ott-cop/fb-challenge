export interface SafeAddress {
    readonly id: string,
    cep: string,
    street: string,
    number: string,
    complement: string | null,
    neighborhood: string,
    city: string,
    state: string,
    country: string
}