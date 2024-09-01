import { Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { NgForOf } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";

import { SnackbarService } from "../shared/ui/snackbar/snackbar.service";
import { TicketDate } from "../core/models/ticket.model";

import { ValidateService } from "./validate.service";
import { RandomNumbersService } from "./random-numbers.service";

@Component({
  selector: "app-play",
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, NgForOf],
  templateUrl: "./play.component.html",
  styleUrl: "./play.component.scss",
})
export class PlayComponent {
  ticketData: TicketDate = { numbers: [] };

  constructor(
    private validateService: ValidateService,
    private snackbar: SnackbarService,
    private translate: TranslateService,
    private randomNumberService: RandomNumbersService
  ) {}

  updateNumber(index: number, value: string) {
    const num = Number(value);
    if (this.validateService.validateNumber(num)) {
      this.ticketData.numbers[index] = num;
    }
  }

  onPlay() {
    const errorMessage = this.validateService.validateNumbers(this.ticketData.numbers);
    if (errorMessage) {
      const translatedErrorMessage = this.translate.instant(errorMessage);
      this.snackbar.openSnackBar(translatedErrorMessage, true);
      return;
    }
  }
  setRandomNumbers() {
    const numbers = this.randomNumberService.generateRandomNumbers(6, 1, 99);
    this.ticketData = { numbers };
  }
}
