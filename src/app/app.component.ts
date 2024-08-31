import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { HeaderComponent } from "./modules/core/components/header/header.component";
import { FooterComponent } from "./modules/core/components/footer/footer.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "angular-lotto";
}
