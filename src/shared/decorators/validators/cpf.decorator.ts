import { registerDecorator, ValidationArguments, ValidationOptions, IsNotEmpty, Matches } from "class-validator";

export function Cpf(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {

        IsNotEmpty()(object, propertyName);
        Matches(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, {
            message: 'CPF is not valid. Example: 123.456.789-00 or 12345678900'
        })(object, propertyName);

        registerDecorator({
            name: 'Cpf',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return true; 
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} is not valid`;
                },
            },
        });
    };
  }