import { Injectable } from "@angular/core";
import Actions = Cypress.Actions;

import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
}
