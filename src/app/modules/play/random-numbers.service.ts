import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class RandomNumbersService {
  private generateRandomNumber(from: number, to: number) {
    return Math.floor(Math.random() * to + from);
  }

  generateRandomNumbers(size: number, from: number, to: number) {
    const numbers: number[] = [];
    while (numbers.length < size) {
      const randomNumber = this.generateRandomNumber(from, to);
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    return numbers;
  }
}
