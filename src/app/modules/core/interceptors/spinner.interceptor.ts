import { HttpEventType, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { tap } from "rxjs";

import { SpinnerService } from "../services/spinner.service";

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);
  spinnerService.show();
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        spinnerService.hide();
      }
    })
  );
};
