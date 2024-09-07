import { Component, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgIf } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { Store } from "@ngrx/store";

import { FormsService } from "../../../core/services/forms.service";
import { LoginForm } from "../../../core/models/forms.model";
import { CardComponent } from "../../../shared/ui/card/card.component";
import * as AuthAction from "../../store/auth.actions";
import { AppState } from "../../../../store/app.reducer";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    NgIf,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    CardComponent,
    TranslateModule,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup<LoginForm>;

  constructor(
    private formsService: FormsService,
    private store: Store<AppState>
  ) {
    this.loginForm = this.formsService.initLoginForm();
  }

  get controls() {
    return this.loginForm.controls;
  }

  onLogin() {
    this.store.dispatch(AuthAction.login({ loginData: this.loginForm.getRawValue() }));
  }

  getErrorMessage(control: FormControl) {
    return this.formsService.getErrorMessage(control);
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthAction.clearError());
  }
}
