import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from "rxjs";

import { environment } from "../../../environments/environment";
import { SnackbarService } from "../shared/ui/snackbar/snackbar.service";
import { Ticket, TicketData, TicketPostResponse } from "../core/models/ticket.model";

@Injectable({
  providedIn: "root",
})
export class TicketService {
  ticket = new BehaviorSubject<Ticket | null>(null);
  private apiUrl = environment.apiUrl;
  private inputNumbersEP = "inputNumbers";

  constructor(
    private http: HttpClient,
    private snackbar: SnackbarService
  ) {}

  inputNumbers(ticketDto: TicketData): Observable<Ticket> {
    return this.http
      .post<TicketPostResponse>(`${this.apiUrl}/${this.inputNumbersEP}`, ticketDto, {
        withCredentials: true,
      })
      .pipe(
        map((value) => {
          const ticketDto = value.ticket;
          return new Ticket(ticketDto.drawDate, ticketDto.ticketId, ticketDto.numbers);
        }),
        tap((ticket) => this.ticket.next(ticket)),
        catchError((err) => {
          this.snackbar.openSnackBar(err.message, true);
          return throwError(err);
        })
      );
  }

  clearTicket() {
    this.ticket.next(null);
  }
}
