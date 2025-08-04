import { Email } from "src/shared/decorators/validators/email.decorator";
import { Name } from "src/shared/decorators/validators/name.decorator";
import { Phone } from "src/shared/decorators/validators/phone.decorator";

export class Contact {
    @Name()
    name: string;

    @Phone()
    phone: string;

    @Email()
    email: string;
}