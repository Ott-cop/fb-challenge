export class EnrichedAddress {
    constructor(
        public cep: string,
        public street: string,
        public number: string,
        public complement: string | null,
        public neighborhood: string,
        public city: string,
        public state: string,
        public country: string
    ) {}
}