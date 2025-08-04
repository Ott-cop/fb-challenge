import { Email } from "src/shared/decorators/validators/email.decorator";
import { Password } from "src/shared/decorators/validators/password.decorator";

export class SignInAuthDto {
    @Email()
    email: string;

    @Password()
    password: string;
}
