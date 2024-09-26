import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

import { environment } from "../../../../environments/environment";
import { AuthResponse, IUser, LoginData, RegisterData } from "../models/auth.model";
import { SnackbarService } from "../../shared/ui/snackbar/snackbar.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = environment.apiUrl + "/auth";
  private loginEp = "/login";
  private registerEp = "/register";
  private logoutEp = "/logout";
  private loggedInEp = "/logged-in";
  private autoLoginEp = "/auto-login";

  constructor(
    private httpClient: HttpClient,
    private snackbar: SnackbarService
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

  autoLogin(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.apiUrl}${this.autoLoginEp}`, { withCredentials: true }).pipe();
  }

  private catchError(err: HttpErrorResponse) {
    const errorMessage = err.message;
    this.snackbar.openSnackBar(errorMessage, true);
    return err;
  }
}
