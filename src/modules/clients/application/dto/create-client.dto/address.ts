import { IsOptional, IsPositive, Length } from "class-validator";
import { Cep } from "src/shared/decorators/validators/cep.decorator";

export class Address {
    @Cep()
    cep: string;

    @IsPositive()
    number: number;

    @IsOptional()
    @Length(3, 100)
    complement: string;
}