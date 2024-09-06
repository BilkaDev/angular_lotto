import { Component } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { TranslateModule } from "@ngx-translate/core";

import { ResultsFormComponent } from "./components/results-form/results-form.component";
import { CardComponent } from "../shared/ui/card/card.component";

@Component({
  selector: "app-results",
  standalone: true,
  imports: [CardComponent, ResultsFormComponent, MatButton, TranslateModule],
  templateUrl: "./results.component.html",
  styleUrl: "./results.component.scss",
})
export class ResultsComponent {}
