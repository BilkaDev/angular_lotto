import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Clipboard } from "@angular/cdk/clipboard";
import { MatButton } from "@angular/material/button";
import { Router } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from "@angular/material/card";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { NgForOf } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

import { TicketService } from "../../ticket.service";
import { Ticket } from "../../../core/models/ticket.model";
import { CardComponent } from "../../../shared/ui/card/card.component";

@Component({
  selector: "app-ticket-item",
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatFormField,
    MatIconModule,
    MatInput,
    NgForOf,
    ReactiveFormsModule,
    CardComponent,
    TranslateModule,
  ],
  templateUrl: "./ticket-item.component.html",
  styleUrl: "./ticket-item.component.scss",
})
export class TicketItemComponent implements OnInit, OnDestroy {
  ticket: Ticket | null = null;
  sub!: Subscription;

  constructor(
    private ticketService: TicketService,
    private clipboard: Clipboard,
    private router: Router
  ) {}

  get numbers() {
    return this.ticket?.numbers ?? "";
  }

  get drawDate() {
    const date = new Date(this.ticket?.drawDate ?? "").toLocaleDateString();
    const time = new Date(this.ticket?.drawDate ?? "").toLocaleTimeString().slice(0, 5);

    return `${date} ${time}`;
  }

  get ticketId() {
    return this.ticket?.ticketId ?? "";
  }

  routerTo(page: string) {
    if (page == "play") {
      this.ticketService.clearTicket();
      return;
    }
    this.router.navigate(["/" + page]);
  }

  copyTicketId() {
    this.clipboard.copy(this.ticket?.ticketId ?? "");
  }

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
