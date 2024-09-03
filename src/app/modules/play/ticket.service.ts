import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from "rxjs";

import { environment } from "../../../environments/environment";
import { SnackbarService } from "../shared/ui/snackbar/snackbar.service";
import { Ticket, TicketData, TicketPostResponse } from "../core/models/ticket.model";
import { ErrorParserService } from "../core/services/error-parser.service";

@Injectable({
  providedIn: "root",
})
export class TicketService {
  ticket = new BehaviorSubject<Ticket | null>(null);
  private apiUrl = environment.apiUrl;
  private inputNumbersEP = "api/v1/inputNumbers";

  constructor(
    private http: HttpClient,
    private errorParser: ErrorParserService,
    private snackbar: SnackbarService
  ) {}

  inputNumbers(ticketDto: TicketData): Observable<Ticket> {
    return this.http.post<TicketPostResponse>(`${this.apiUrl}/${this.inputNumbersEP}`, ticketDto).pipe(
      map((value) => {
        const ticketDto = value.ticket;
        return new Ticket(ticketDto.drawDate, ticketDto.ticketId, ticketDto.numbers);
      }),
      tap((ticket) => this.ticket.next(ticket)),
      catchError((err) => {
        const errorMessage = this.errorParser.parseErrorFromStatus(err.status);
        this.snackbar.openSnackBar(errorMessage, true);
        return throwError(() => new Error(err));
      })
    );
  }

  clearTicket() {
    this.ticket.next(null);
  }
}
