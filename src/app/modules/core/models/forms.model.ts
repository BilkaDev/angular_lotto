import { FormControl } from "@angular/forms";

export interface ResultsForm {
  ticketIdControl: FormControl<string>;
}

export interface LoginForm {
  login: FormControl<string>;
  password: FormControl<string>;
}

export interface RegisterForm extends LoginForm {
  email: FormControl<string>;
  repeatedPassword: FormControl<string>;
}
