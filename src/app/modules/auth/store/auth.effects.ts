import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { catchError, EMPTY, map, of, switchMap } from "rxjs";

import { AuthService } from "../../core/services/auth.service";
import { SnackbarService } from "../../shared/ui/snackbar/snackbar.service";
import * as AuthActions from "./auth.actions";

@Injectable()
export class AuthEffects {
  login$;
  autoLogin$;
  register$;
  logout$;

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private snackbar: SnackbarService,
    private translate: TranslateService
  ) {
    this.login$ = this.createLogin();
    this.register$ = this.createRegister();
    this.logout$ = this.createLogout();
    this.autoLogin$ = this.createAutoLogin();
  }

  private createRegister() {
    return createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.register),
        switchMap((action) => {
          return this.authService.register(action.registerData).pipe(
            map(() => {
              this.router.navigate(["/auth/register"]);
              this.snackbar.openSnackBar(this.translate.instant("auth.accountCreated") + "!");
              return AuthActions.registerSuccess();
            }),
            catchError((err) => of(AuthActions.loginFailed({ error: err.message })))
          );
        })
      )
    );
  }

  private createLogin() {
    return createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        switchMap((action) => {
          return this.authService.login(action.loginData).pipe(
            map((user) => {
              this.router.navigate(["/"]);
              return AuthActions.loginSuccess({ user: { ...user } });
            }),
            catchError((err) => of(AuthActions.loginFailed({ error: err.message })))
          );
        })
      )
    );
  }

  private createLogout() {
    return createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        switchMap(() => {
          return this.authService.logout().pipe(
            map(() => {
              this.router.navigate(["/"]);
              this.snackbar.openSnackBar("auth.logoutSuccess");
              return AuthActions.logoutSuccess();
            }),
            catchError(() => of(AuthActions.logoutFailed()))
          );
        })
      )
    );
  }

  private createAutoLogin() {
    return createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.autoLogin),
        switchMap(() => {
          return this.authService.autoLogin().pipe(
            map((user) => {
              return AuthActions.autoLoginSuccess({ user: { ...user } });
            })
          );
        }),
        catchError(() => of(AuthActions.autoLoginFailed()))
      )
    );
  }
}
