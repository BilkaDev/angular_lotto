import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { NgIf } from "@angular/common";

import { Ticket } from "../core/models/ticket.model";

import { TicketItemComponent } from "./components/ticket-item/ticket-item.component";
import { TicketFormComponent } from "./components/ticket-form/ticket-form.component";
import { TicketService } from "./ticket.service";

@Component({
  selector: "app-play",
  standalone: true,
  imports: [TicketFormComponent, NgIf, TicketItemComponent],
  templateUrl: "./play.component.html",
  styleUrl: "./play.component.scss",
})
export class PlayComponent implements OnInit, OnDestroy {
  ticket: Ticket | null = null;
  sub!: Subscription;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.sub = this.ticketService.ticket.subscribe({
      next: (value) => (this.ticket = value),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.ticketService.clearTicket();
  }
}
