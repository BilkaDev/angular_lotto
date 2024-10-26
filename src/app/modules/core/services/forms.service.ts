import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

import { LoginForm, RegisterForm, ResultsForm } from "../models/forms.model";
import { equivalentValidators } from "../../shared/validators/equivalent.validators";

@Injectable({
  providedIn: "root",
})
export class FormsService {
  constructor(private translate: TranslateService) {}

  initResultsForm(): FormGroup<ResultsForm> {
    return new FormGroup({
      ticketIdControl: new FormControl("", {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
        nonNullable: true,
      }),
    });
  }

  initLoginForm(): FormGroup<LoginForm> {
    return new FormGroup({
      login: new FormControl("", {
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(50)],
        nonNullable: true,
      }),
      password: new FormControl("", {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(75)],
        nonNullable: true,
      }),
    });
  }

  initRegisterForm(): FormGroup<RegisterForm> {
    return new FormGroup(
      {
        email: new FormControl("", {
          validators: [Validators.required, Validators.email],
          nonNullable: true,
        }),
        login: new FormControl("", {
          validators: [Validators.required, Validators.minLength(4), Validators.maxLength(50)],
          nonNullable: true,
        }),
        password: new FormControl("", {
          validators: [Validators.required, Validators.minLength(8), Validators.maxLength(75)],
          nonNullable: true,
        }),
        repeatedPassword: new FormControl("", {
          validators: [Validators.required, Validators.minLength(8), Validators.maxLength(75)],
          nonNullable: true,
        }),
      },
      {
        validators: [equivalentValidators("password", "repeatedPassword")],
      }
    );
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError("minlength")) {
      return `${this.translate.instant("core.formService.minLength")}: ${control.errors?.["minlength"]?.requiredLength}`;
    }
    if (control.hasError("maxlength")) {
      return `${this.translate.instant("core.formService.maxLength")}: ${control.errors?.["maxlength"]?.requiredLength}`;
    }
    if (control.hasError("required")) {
      return this.translate.instant("core.formService.required");
    }
    if (control.hasError("email")) {
      return this.translate.instant("core.formService.email");
    }
    if (control.hasError("passwordsNotEqual")) {
      return this.translate.instant("core.formService.repeatedPassword");
    }
    return "";
  }
}
