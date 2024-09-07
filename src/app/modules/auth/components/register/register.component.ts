import { Component, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";

import { CardComponent } from "../../../shared/ui/card/card.component";
import { FormsService } from "../../../core/services/forms.service";
import { RegisterForm } from "../../../core/models/forms.model";
import { TranslateModule } from "@ngx-translate/core";
import { MatIcon } from "@angular/material/icon";

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
export class RegisterComponent {
  registerForm: FormGroup<RegisterForm>;
  hide = signal(true);

  constructor(private formsService: FormsService) {
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
    console.log("Register");
  }

  getErrorMessage(control: FormControl) {
    return this.formsService.getErrorMessage(control);
  }
}
