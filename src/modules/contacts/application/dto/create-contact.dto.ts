import { Email } from "src/shared/decorators/validators/email.decorator";
import { Name } from "src/shared/decorators/validators/name.decorator";
import { Phone } from "src/shared/decorators/validators/phone.decorator";

export class CreateContactDto {
    @Name()
    public name: string;
    
    @Phone()
    public phone: string;
    
    @Email()
    public email: string;
}