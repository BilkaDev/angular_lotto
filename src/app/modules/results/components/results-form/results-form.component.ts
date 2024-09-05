import { Component } from "@angular/core";
import { ErrorStateMatcher } from "@angular/material/core";
import { FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { NgIf } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

import { CardComponent } from "../../../shared/ui/card/card.component";
import { ResultService } from "../../result.service";
import { ResultMessageComponent } from "../result-message/result-message.component";
import { Result } from "../../../core/models/result.model";
import { FormService } from "../../../core/services/form.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || isSubmitted));
  }
}

@Component({
  selector: "app-results-form",
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    CardComponent,
    ResultMessageComponent,
    NgIf,
    TranslateModule,
  ],
  templateUrl: "./results-form.component.html",
  styleUrl: "./results-form.component.scss",
})
export class ResultsFormComponent {
  ticketIdControl = new FormControl("", {
    nonNullable: true,
    validators: [Validators.minLength(8), Validators.maxLength(8), Validators.required],
  });
  matcher = new MyErrorStateMatcher();
  result: Result | null = null;

  constructor(
    private resultService: ResultService,
    private formService: FormService
  ) {}

  onSubmit() {
    this.resultService.getResult(this.ticketIdControl.getRawValue()).subscribe({
      next: (v) => {
        this.result = v;
      },
    });
  }

  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }
}
