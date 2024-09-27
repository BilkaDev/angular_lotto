import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { ErrorParserService } from "../services/error-parser.service";
import { catchError, throwError } from "rxjs";

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const errorParser = inject(ErrorParserService);
  return next(req).pipe(
    catchError((err) => {
      err.message = errorParser.parseError(err);
      return throwError(err);
    })
  );
};
