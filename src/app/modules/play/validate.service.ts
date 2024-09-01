import { Injectable } from "@angular/core";
import { TicketDate } from "../core/models/ticket.model";

@Injectable({
  providedIn: "root",
})
export class ValidateService {
  validateNumbers(numbers: TicketDate["numbers"]) {
    if (numbers.length != 6) {
      return "error.six-numbers-required";
    }
    const validNumbers = numbers.filter((num) => num >= 1 && num <= 99);
    if (validNumbers.length != 6) {
      return "error.numbers-between";
    }
    const validNumbersSet = new Set(validNumbers);
    if (validNumbersSet.size != 6) {
      return "error.different-numbers";
    }
    return "";
  }

  validateNumber(number: number) {
    return number >= 1 && number <= 99;
  }
}
