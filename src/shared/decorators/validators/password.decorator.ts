import { IsNotEmpty, IsString, MaxLength, MinLength, registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function Password(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {

        IsNotEmpty()(object, propertyName);
        IsString()(object, propertyName);
        MaxLength(100)(object, propertyName);
        MinLength(8)(object, propertyName);
  
        registerDecorator({
        name: 'Password',
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