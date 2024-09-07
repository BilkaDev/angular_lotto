import { Component, OnDestroy, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { MatIcon } from "@angular/material/icon";
import { Store } from "@ngrx/store";

import { CardComponent } from "../../../shared/ui/card/card.component";
import { FormsService } from "../../../core/services/forms.service";
import { RegisterForm } from "../../../core/models/forms.model";
import * as AuthActions from "../../store/auth.actions";
import { AppState } from "../../../../store/app.reducer";
import * as AuthAction from "../../store/auth.actions";

@Component({
  selector: "app-register",
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
    MatIcon,
  ],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent implements OnDestroy {
  registerForm: FormGroup<RegisterForm>;
  hide = signal(true);

  constructor(
    private formsService: FormsService,
    private store: Store<AppState>
  ) {
    this.registerForm = this.formsService.initRegisterForm();
  }

  get controls() {
    return this.registerForm.controls;
  }

  showPassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onRegister() {
    const { login, password, email } = this.registerForm.getRawValue();
    this.store.dispatch(AuthActions.register({ registerData: { login, password, email } }));
  }

  getErrorMessage(control: FormControl) {
    return this.formsService.getErrorMessage(control);
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthAction.clearError());
  }
}
