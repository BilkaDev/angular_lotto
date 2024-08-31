import { Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  public isLightTheme = false;

  onThemeSwitchChange() {
    this.isLightTheme = !this.isLightTheme;

    document.body.setAttribute("data-theme", this.isLightTheme ? "light" : "dark");
  }
}
