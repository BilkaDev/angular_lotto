import { TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TranslateTestingModule } from "ngx-translate-testing";

import { AuthService } from "./auth.service";
import { AuthResponse, IUser } from "../models/auth.model";
import { SnackbarService } from "../../shared/ui/snackbar/snackbar.service";
import { environment } from "../../../../environments/environment";

const translateTestingModule = () => TranslateTestingModule.withTranslations({});

describe("AuthService", () => {
  let service: AuthService;
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
    service = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it("fetches login successfully", () => {
    const mockResponse: IUser = {
      email: "test@wp.pl",
      login: "login",
    };
    service.login({ login: "login", password: "123456" }).subscribe((result) => {
      expect(result.login).toBe("login");
      expect(result.email).toEqual("test@wp.pl");
    });

    const req = httpTesting.expectOne(`${environment.apiUrl}${service["loginEp"]}`);
    expect(req.request.method).toBe("POST");
    req.flush(mockResponse);
  });

  it("should display snackbar when fetches login give error", () => {
    const mockError = { status: 500, statusText: "error" };

    service.login({ login: "", password: "" }).subscribe({
      next: () => fail("expected an error, not results"),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(snackbarServiceSpy.openSnackBar).toHaveBeenCalled();
      },
    });

    const req = httpTesting.expectOne(`${service["apiUrl"]}${service["loginEp"]}`);
    req.flush(null, mockError);
  });

  it("fetches logout successfully", () => {
    const mockResponse: AuthResponse = {
      code: "test",
      message: "testMessage",
    };
    service.logout().subscribe((result) => {
      expect(result.code).toBe("test");
      expect(result.message).toEqual("testMessage");
    });

    const req = httpTesting.expectOne(`${environment.apiUrl}${service["logoutEp"]}`);
    expect(req.request.method).toBe("GET");
    req.flush(mockResponse);
  });

  it("should display snackbar when fetches logout give error", () => {
    const mockError = { status: 500, statusText: "error" };

    service.logout().subscribe({
      next: () => fail("expected an error, not results"),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(snackbarServiceSpy.openSnackBar).toHaveBeenCalled();
      },
    });

    const req = httpTesting.expectOne(`${service["apiUrl"]}${service["logoutEp"]}`);
    req.flush(null, mockError);
  });

  it("fetches register successfully", () => {
    const mockResponse: AuthResponse = {
      code: "A1",
      message: "SUCCESS",
    };
    service.register({ login: "login", password: "123456", email: "test@wp.pl" }).subscribe((result) => {
      expect(result.code).toBe("A1");
      expect(result.message).toEqual("SUCCESS");
    });

    const req = httpTesting.expectOne(`${environment.apiUrl}${service["registerEp"]}`);
    expect(req.request.method).toBe("POST");
    req.flush(mockResponse);
  });

  it("should display snackbar when fetches register give error", () => {
    const mockError = { status: 500, statusText: "error" };

    service.register({ login: "", password: "", email: "test@w.pl" }).subscribe({
      next: () => fail("expected an error, not results"),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(snackbarServiceSpy.openSnackBar).toHaveBeenCalled();
      },
    });

    const req = httpTesting.expectOne(`${service["apiUrl"]}${service["registerEp"]}`);
    req.flush(null, mockError);
  });
});
