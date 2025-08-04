import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  IsNotEmpty,
  Matches,
} from "class-validator";

export function Phone(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    IsNotEmpty()(object, propertyName);
    Matches(/^(\(?\d{2}\)?\s?)?(\d{4,5})[- ]?(\d{4})$/, {
      message: 'Phone number is not valid. Example: (11) 99999-9999 or 11999999999',
    })(object, propertyName);

    registerDecorator({
      name: 'Phone',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;

          const digits = value.replace(/\D/g, '');

          return digits.length === 10 || digits.length === 11;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid Brazilian phone number`;
        },
      },
    });
  };
}