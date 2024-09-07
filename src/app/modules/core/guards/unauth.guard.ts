import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { map, take } from "rxjs";

export const unauthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.loggedIn().pipe(
    take(1),
    map((res) => {
      const isLooggedIn = res.code == "PERMIT";
      if (isLooggedIn) {
        router.navigate(["/"]);
        return false;
      } else {
        return true;
      }
    })
  );
};
