import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { HeaderComponent } from "./modules/core/components/header/header.component";
import { FooterComponent } from "./modules/core/components/footer/footer.component";
import { SpinnerComponent } from "./modules/core/components/spinner/spinner.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent, SpinnerComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "angular-lotto";
}
