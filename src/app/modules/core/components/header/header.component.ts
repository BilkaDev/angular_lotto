import { Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from "@ngx-translate/core";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatMenuModule } from "@angular/material/menu";
import { Store } from "@ngrx/store";

import { TranslateService } from "../../services/translate.service";
import { AsyncPipe, NgClass, NgIf } from "@angular/common";
import { AppState } from "../../../../store/app.reducer";
import * as AuthAction from "../../../auth/store/auth.actions";
import { Observable, of } from "rxjs";
import { User } from "../../models/auth.model";
import { selectAuthUser } from "../../../auth/store/auth.selectors";

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
    MatMenuModule,
    NgClass,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  public languages: string[] = [];
  public language: string;
  public isLightTheme = false;
  public hideSingleSelectionIndicator = true;
  public user$: Observable<User | null> = of(null);

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.languages = translateService.getLanguages();
    this.language = translateService.getLanguage();
    this.user$ = this.store.select(selectAuthUser);
  }

  onThemeSwitchChange() {
    this.isLightTheme = !this.isLightTheme;

    document.body.setAttribute("data-theme", this.isLightTheme ? "light" : "dark");
  }

  isLinkActive(path: string) {
    return this.router.url.includes(path);
  }

  onChangeLanguageClick(lang: string) {
    this.translateService.changeLanguage(lang);
  }

  logout() {
    this.store.dispatch(AuthAction.logout());
  }
}
