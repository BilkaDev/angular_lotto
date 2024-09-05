import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class FormService {
  constructor(private translate: TranslateService) {}

  getErrorMessage(control: FormControl) {
    if (control.hasError("minlength")) {
      return this.translate.instant("core.formService.minLength");
    }
    if (control.hasError("maxlength")) {
      return this.translate.instant("core.formService.maxLength");
    }
    if (control.hasError("required")) {
      return this.translate.instant("core.formService.required");
    }
    return "";
  }
}
