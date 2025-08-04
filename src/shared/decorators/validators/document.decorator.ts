import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  IsNotEmpty,
  Matches,
} from 'class-validator';

function isValidCpf(cpf: string): boolean {
  if (!cpf || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
  let firstCheck = (sum * 10) % 11;
  if (firstCheck === 10 || firstCheck === 11) firstCheck = 0;
  if (firstCheck !== parseInt(cpf[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
  let secondCheck = (sum * 10) % 11;
  if (secondCheck === 10 || secondCheck === 11) secondCheck = 0;
  return secondCheck === parseInt(cpf[10]);
}

function isValidCnpj(cnpj: string): boolean {
  if (!cnpj || cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  const calc = (cnpj: string, length: number): number => {
    let sum = 0;
    let pos = length - 7;
    for (let i = 0; i < length; i++) {
      sum += parseInt(cnpj[i]) * pos--;
      if (pos < 2) pos = 9;
    }
    return (sum % 11) < 2 ? 0 : 11 - (sum % 11);
  };

  const firstCheck = calc(cnpj, 12);
  if (firstCheck !== parseInt(cnpj[12])) return false;

  const secondCheck = calc(cnpj, 13);
  return secondCheck === parseInt(cnpj[13]);
}

export function Document(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    IsNotEmpty()(object, propertyName);
    Matches(/^\d+$/, {
      message: 'Only numeric characters are allowed',
    })(object, propertyName);

    registerDecorator({
      name: 'Document',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          return isValidCpf(value) || isValidCnpj(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid CPF or CNPJ`;
        },
      },
    });
  };
}
