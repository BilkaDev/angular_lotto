import { TestBed } from "@angular/core/testing";

import { ResultService } from "./result.service";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { SnackbarService } from "../shared/ui/snackbar/snackbar.service";
import { TranslateTestingModule } from "ngx-translate-testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideHttpClient } from "@angular/common/http";
import { messageResponse, ResultResponse } from "../core/models/result.model";
import { environment } from "../../../environments/environment";

const translateTestingModule = () => TranslateTestingModule.withTranslations({});

describe("ResultService", () => {
  let service: ResultService;
  let httpTesting: HttpTestingController;
  let snackbarServiceSpy: jasmine.SpyObj<SnackbarService>;

  beforeEach(() => {
    snackbarServiceSpy = jasmine.createSpyObj("SnackbarService", ["openSnackBar"]);

    TestBed.configureTestingModule({
      imports: [translateTestingModule(), BrowserAnimationsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SnackbarService, useValue: snackbarServiceSpy },
      ],
    });
    service = TestBed.inject(ResultService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it("fetches result successfully", () => {
    const key = "WIN_MESSAGE";
    const mockResponse: ResultResponse = {
      result: {
        hash: "hash123",
        numbers: [1, 2, 3, 4, 5],
        wonNumbers: [1, 2],
        hitNumbers: [1, 2],
        drawDate: "2023-10-01",
        isWinner: true,
      },
      message: messageResponse[key],
    };

    service.getResult("hash123").subscribe((result) => {
      expect(result.ticketId).toBe("hash123");
      expect(result.numbers).toEqual([1, 2, 3, 4, 5]);
      expect(result.wonNumbers).toEqual([1, 2]);
      expect(result.hitNumbers).toEqual([1, 2]);
      expect(result.drawDate).toBe("2023-10-01");
      expect(result.isWinner).toBeTrue();
      expect(result.message).toBe(key);
    });

    const req = httpTesting.expectOne(`${environment.apiUrl}/api/v1/results/hash123`);
    expect(req.request.method).toBe("GET");
    req.flush(mockResponse);
  });

  it("should give an error and show snackbar if ticket not found", () => {
    const mockError = { status: 404, statusText: "Not Found" };

    service.getResult("123").subscribe({
      next: () => fail("expected an error, not results"),
      error: (error) => {
        expect(error.status).toBe(404);
        expect(snackbarServiceSpy.openSnackBar).toHaveBeenCalled();
      },
    });

    const req = httpTesting.expectOne(`${service["apiUrl"]}/${service["resultsEP"]}/123`);
    req.flush(null, mockError);
  });

  it("returns empty message key if message not found", () => {
    const messageKey = service.getMessageKey("Nonexistent message");
    expect(messageKey).toBe("");
  });

  it("returns collect message key if message found", () => {
    const key = "WIN_MESSAGE";
    const messageKey = service.getMessageKey(messageResponse[key]);
    expect(messageKey).toBe(key);
  });
});
