import { Cpf } from "src/shared/decorators/validators/cpf.decorator";
import { Email } from "src/shared/decorators/validators/email.decorator";
import { Name } from "src/shared/decorators/validators/name.decorator";
import { Password } from "src/shared/decorators/validators/password.decorator";

export class CreateUserDto {
    @Name()
    name: string;

    @Email()
    email: string;

    @Cpf()
    cpf: string;
    
    @Password()
    password: string;
}