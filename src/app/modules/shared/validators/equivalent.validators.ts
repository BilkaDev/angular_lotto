import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const equivalentValidators = (passwordControlName: string, secondPasswordControlName: string): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.get(passwordControlName);
    const secondPasswordControl = control.get(secondPasswordControlName);
    if (secondPasswordControl?.value && secondPasswordControl.value !== passwordControl?.value) {
      secondPasswordControl.setErrors({
        passwordsNotEqual: true,
      });
    }
    return null;
  };
};
