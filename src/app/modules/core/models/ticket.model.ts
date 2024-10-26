export interface TicketData {
  numbers: number[];
}

export class Ticket {
  constructor(
    public drawDate: string,
    public ticketId: string,
    public numbers: number[]
  ) {}
}

export interface TicketPostResponse {
  message: string;
  ticket: Ticket;
}
