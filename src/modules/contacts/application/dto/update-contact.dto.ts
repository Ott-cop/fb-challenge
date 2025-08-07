import { IsOptional } from "class-validator";
import { Email } from "src/shared/decorators/validators/email.decorator";
import { Name } from "src/shared/decorators/validators/name.decorator";
import { Phone } from "src/shared/decorators/validators/phone.decorator";

export class UpdateContactDto {
    @IsOptional()
    @Name()
    public name?: string;
    
    @IsOptional()
    @Phone()
    public phone?: string;
    
    @IsOptional()
    @Email()
    public email?: string;
}