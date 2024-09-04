import { TestBed } from "@angular/core/testing";
import { TranslateTestingModule } from "ngx-translate-testing";

import { TicketService } from "./ticket.service";
import enJson from "../../../../public/i8n/en.json";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { Ticket, TicketData, TicketPostResponse } from "../core/models/ticket.model";
import { environment } from "../../../environments/environment";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SnackbarService } from "../shared/ui/snackbar/snackbar.service";

const translateTestingModule = () =>
  TranslateTestingModule.withTranslations({
    enJson,
  });
fdescribe("TicketService", () => {
  let service: TicketService;
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
    service = TestBed.inject(TicketService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it("should post input numbers and update ticket", () => {
    const mockData: TicketData = { numbers: [1, 2, 3, 4, 5, 6] };
    const mockResponse: TicketPostResponse = {
      message: "",
      ticket: new Ticket("2024-01-01", "123456", mockData.numbers),
    };
    service.inputNumbers(mockData).subscribe((ticket) => {
      expect(ticket.ticketId).toEqual("123456");
    });
    const req = httpTesting.expectOne(`${environment.apiUrl}/api/v1/inputNumbers`);
    expect(req.request.method).toBe("POST");
    req.flush(mockResponse);
  });

  it("should give an error and show snackbar if post ticket fails", () => {
    const mockData: TicketData = { numbers: [1, 2, 3, 4, 5, 6] };

    service.inputNumbers(mockData).subscribe({
      next: () => fail("the post method should be failed"),
      error: (err) => {
        expect(err.status).toBe(500);
        expect(snackbarServiceSpy.openSnackBar).toHaveBeenCalled();
      },
    });
    const req = httpTesting.expectOne(`${environment.apiUrl}/api/v1/inputNumbers`);
    expect(req.request.method).toBe("POST");
    req.flush("Failed!", { status: 500, statusText: "Internal Server Error" });
  });
});
