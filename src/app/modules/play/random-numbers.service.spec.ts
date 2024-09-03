import { TestBed } from "@angular/core/testing";

import { RandomNumbersService } from "./random-numbers.service";

describe("RandomNumbersService", () => {
  let service: RandomNumbersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomNumbersService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  it("should generate a set of unique random numbers", () => {
    const numbers = service.generateRandomNumbers(6, 1, 10);
    const uniqueNumbers = new Set(numbers);
    expect(numbers.length).toEqual(uniqueNumbers.size);
  });

  it("should generate the correct amount of random numbers", () => {
    const numbers = service.generateRandomNumbers(6, 1, 10);
    expect(numbers.length).toEqual(6);
  });

  it("should generate random numbers within the specified range", () => {
    const numbers = service.generateRandomNumbers(6, 1, 99);
    numbers.forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(1);
      expect(number).toBeLessThanOrEqual(99);
    });
  });

  it("should not generate any numbers if size is 0", () => {
    const numbers = service.generateRandomNumbers(0, 1, 10);
    expect(numbers.length).toEqual(0);
  });

  it("should generate a single number if size is 1", () => {
    const numbers = service.generateRandomNumbers(1, 1, 10);
    expect(numbers.length).toEqual(1);
  });
});
