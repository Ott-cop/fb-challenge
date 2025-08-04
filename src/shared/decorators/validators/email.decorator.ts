import { IsEmail, IsNotEmpty, MaxLength, registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function Email(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {

        IsEmail()(object, propertyName);
        IsNotEmpty()(object, propertyName);
  
        registerDecorator({
        name: 'Email',
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