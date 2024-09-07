import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgIf } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";

import { FormsService } from "../../../core/services/forms.service";
import { LoginForm } from "../../../core/models/forms.model";
import { CardComponent } from "../../../shared/ui/card/card.component";
import { TranslateModule } from "@ngx-translate/core";

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
export class LoginComponent {
  loginForm: FormGroup<LoginForm>;

  constructor(private formsService: FormsService) {
    this.loginForm = this.formsService.initLoginForm();
  }

  get controls() {
    return this.loginForm.controls;
  }

  onLogin() {
    console.log("LOGIN");
  }

  getErrorMessage(control: FormControl) {
    return this.formsService.getErrorMessage(control);
  }
}
