import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  IsNotEmpty,
  Matches,
} from "class-validator";

export function Cep(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    IsNotEmpty()(object, propertyName);
    Matches(/^\d{5}-?\d{3}$/, {
      message: 'CEP is not valid. Example: 01001-000 or 01001000',
    })(object, propertyName);

    registerDecorator({
      name: 'Cep',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;

          const digits = value.replace(/\D/g, '');
          return digits.length === 8;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid Brazilian CEP`;
        },
      },
    });
  };
}