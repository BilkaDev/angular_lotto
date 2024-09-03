import { Component, Input } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from "@angular/material/card";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { NgForOf } from "@angular/common";

@Component({
  selector: "app-card",
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatFormField,
    MatInput,
    NgForOf,
    ReactiveFormsModule,
  ],
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.scss",
})
export class CardComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
}
