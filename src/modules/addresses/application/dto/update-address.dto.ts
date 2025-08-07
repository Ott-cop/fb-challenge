import { IsNotEmpty, IsOptional, IsPostalCode, IsString, Length } from "class-validator";

export class UpdateAddressDto {

    @IsOptional()
    @IsPostalCode('BR')
    cep?: string;

    @IsString()
    @IsNotEmpty()
    number: string;

    @IsOptional()
    @IsString()
    complement?: string;
}