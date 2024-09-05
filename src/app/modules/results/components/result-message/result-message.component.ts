import { Component, Input } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { TranslateModule } from "@ngx-translate/core";
import { NgIf } from "@angular/common";

import { Result } from "../../../core/models/result.model";
import { DatePipe } from "../../../core/pipes/date.pipe";

@Component({
  selector: "app-result-message",
  standalone: true,
  imports: [TranslateModule, DatePipe, MatIcon, NgIf],
  templateUrl: "./result-message.component.html",
  styleUrl: "./result-message.component.scss",
})
export class ResultMessageComponent {
  @Input() result!: Result;
}
