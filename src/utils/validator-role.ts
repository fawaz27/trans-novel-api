import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'roleValidator', async: false })
export class Role implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return ["user","admin"].includes(text); // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Text ($value) is either user or admin!';
  }
}


