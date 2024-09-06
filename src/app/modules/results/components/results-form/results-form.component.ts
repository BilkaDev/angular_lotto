import { Component } from "@angular/core";
import { ErrorStateMatcher } from "@angular/material/core";
import { FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { NgIf } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

import { CardComponent } from "../../../shared/ui/card/card.component";
import { ResultService } from "../../result.service";
import { ResultMessageComponent } from "../result-message/result-message.component";
import { Result } from "../../../core/models/result.model";
import { ResultsForm } from "../../../core/models/froms.model";
import { FormsService } from "../../../core/services/forms.service";

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
  resultsForm: FormGroup<ResultsForm>;
  matcher = new MyErrorStateMatcher();
  result: Result | null = null;

  constructor(
    private resultService: ResultService,
    private formsService: FormsService
  ) {
    this.resultsForm = this.formsService.initResultsForm();
  }

  get controls() {
    return this.resultsForm.controls;
  }

  onSubmit() {
    this.resultService.getResult(this.controls.ticketIdControl.getRawValue()).subscribe({
      next: (v) => {
        this.result = v;
      },
    });
  }

  getErrorMessage(control: FormControl) {
    return this.formsService.getErrorMessage(control);
  }
}
