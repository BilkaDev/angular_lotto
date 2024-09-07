import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, catchError } from "rxjs";

import { environment } from "../../../../environments/environment";
import { AuthResponse, IUser, LoginData, RegisterData } from "../models/auth.model";
import { SnackbarService } from "../../shared/ui/snackbar/snackbar.service";
import { ErrorParserService } from "./error-parser.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = environment.apiUrl + "/auth";
  private loginEp = "/login";
  private registerEp = "/register";
  private logoutEp = "/logout";
  private loggedInEp = "/logged-in";

  constructor(
    private httpClient: HttpClient,
    private snackbar: SnackbarService,
    private errorParser: ErrorParserService
  ) {}

  login(payload: LoginData) {
    return this.httpClient
      .post<IUser>(`${this.apiUrl}${this.loginEp}`, payload, {
        withCredentials: true,
      })
      .pipe(catchError((err) => throwError(() => this.catchError(err))));
  }

  register(payload: RegisterData): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${this.apiUrl}${this.registerEp}`, payload)
      .pipe(catchError((err) => throwError(() => this.catchError(err))));
  }

  logout(): Observable<AuthResponse> {
    return this.httpClient
      .get<AuthResponse>(`${this.apiUrl}${this.logoutEp}`, { withCredentials: true })
      .pipe(catchError((err) => throwError(() => this.catchError(err))));
  }

  loggedIn(): Observable<AuthResponse> {
    return this.httpClient
      .get<AuthResponse>(`${this.apiUrl}${this.loggedInEp}`, { withCredentials: true })
      .pipe(catchError((err) => throwError(() => this.catchError(err))));
  }

  private catchError(err: HttpErrorResponse) {
    const errorMessage = this.errorParser.parseError(err.status);
    this.snackbar.openSnackBar(errorMessage, true);
    return err;
  }
}
