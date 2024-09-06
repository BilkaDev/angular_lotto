import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

import { ResultsForm } from "../models/froms.model";

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
    return "";
  }
}
