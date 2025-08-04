export class Contact {
    constructor(
        public readonly id: string,
        public name: string,
        public phone: string,
        public email: string,
        public cliendId: string
    ) {}
}