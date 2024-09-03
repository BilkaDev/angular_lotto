import { Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from "@ngx-translate/core";

import { TranslateService } from "../../services/translate.service";
import { MatButtonToggleModule } from "@angular/material/button-toggle";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    TranslateModule,
    MatButtonToggleModule,
    RouterLinkActive,
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  public languages: string[] = [];
  public language: string;
  public isLightTheme = false;
  public hideSingleSelectionIndicator = true;

  constructor(private translateService: TranslateService) {
    this.languages = translateService.getLanguages();
    this.language = translateService.getLanguage();
  }

  onThemeSwitchChange() {
    this.isLightTheme = !this.isLightTheme;

    document.body.setAttribute("data-theme", this.isLightTheme ? "light" : "dark");
  }

  onChangeLanguageClick(lang: string) {
    this.translateService.changeLanguage(lang);
  }
}
