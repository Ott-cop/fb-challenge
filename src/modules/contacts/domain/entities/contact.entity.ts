export class Contact {
    constructor(
        public id: string | undefined,
        public name: string,
        public phone: string,
        public email: string,
        public clientId: string
    ) {}
  }