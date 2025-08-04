import { IsOptional } from 'class-validator';
import { Cpf } from 'src/shared/decorators/validators/cpf.decorator';
import { Email } from 'src/shared/decorators/validators/email.decorator';
import { Name } from 'src/shared/decorators/validators/name.decorator';
import { Password } from 'src/shared/decorators/validators/password.decorator';

export class UpdateUserDto {
    @IsOptional()
    @Name()
    name?: string;
  
    @IsOptional()
    @Email()
    email?: string;
  
    @IsOptional()
    @Cpf()
    cpf?: string;
  
    @IsOptional()
    @Password()
    password?: string;
}