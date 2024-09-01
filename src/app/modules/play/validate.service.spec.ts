import { TestBed } from "@angular/core/testing";

import { ValidateService } from "./validate.service";

fdescribe("ValidateService", () => {
  let service: ValidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateService);
  });

  it("should validate correct numbers", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const result = service.validateNumbers(numbers);
    expect(result).toEqual("");
  });

  it("should not validate when less than 6 numbers are provided", () => {
    const numbers = [1, 2, 3];
    const result = service.validateNumbers(numbers);
    expect(result).toEqual("error.six-numbers-required");
  });

  it("should not validate when more than 6 numbers are provided", () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7];
    const result = service.validateNumbers(numbers);
    expect(result).toEqual("error.six-numbers-required");
  });

  it("should not validate when numbers are not between 1 and 99", () => {
    const numbers = [1, 2, 3, 4, 5, 100];
    const result = service.validateNumbers(numbers);
    expect(result).toEqual("error.numbers-between");
  });

  it("should not validate when numbers are not unique", () => {
    const numbers = [1, 2, 3, 4, 5, 5];
    const result = service.validateNumbers(numbers);
    expect(result).toEqual("error.different-numbers");
  });

  it("should validate a correct number", () => {
    const number = 50;
    const result = service.validateNumber(number);
    expect(result).toEqual(true);
  });

  it("should not validate a number less than 1", () => {
    const number = 0;
    const result = service.validateNumber(number);
    expect(result).toEqual(false);
  });

  it("should not validate a number greater than 99", () => {
    const number = 100;
    const result = service.validateNumber(number);
    expect(result).toEqual(false);
  });
});
