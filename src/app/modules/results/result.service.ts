import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";

import { environment } from "../../../environments/environment";
import { messageResponse, Result, ResultResponse } from "../core/models/result.model";
import { SnackbarService } from "../shared/ui/snackbar/snackbar.service";
import { ErrorParserService } from "../core/services/error-parser.service";

@Injectable({
  providedIn: "root",
})
export class ResultService {
  private apiUrl = environment.apiUrl;
  private resultsEP = "api/v1/results";

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService,
    private errorParser: ErrorParserService
  ) {}

  getResult(id: string): Observable<Result> {
    return this.http.get<ResultResponse>(`${this.apiUrl}/${this.resultsEP}/${id}`).pipe(
      catchError((err) => {
        const message = this.errorParser.parseError(err);
        this.snackbarService.openSnackBar(message, true);
        return throwError(err);
      }),
      map((v) => {
        const result = v.result;
        const message = this.getMessageKey(v.message);
        return new Result(
          result.hash,
          result.numbers,
          result.wonNumbers,
          result.hitNumbers,
          result.drawDate,
          result.isWinner,
          message
        );
      })
    );
  }

  getMessageKey(message: string): string {
    for (const entry of Object.entries(messageResponse)) {
      if (entry[1] == message) {
        return entry[0];
      }
    }
    return "";
  }
}
