import { IsNotEmpty, IsString, MaxLength, MinLength, registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function Name(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {

        MaxLength(100)(object, propertyName);
        MinLength(3)(object, propertyName);
        IsNotEmpty()(object, propertyName);
        IsString()(object, propertyName);
  
        registerDecorator({
        name: 'Name',
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