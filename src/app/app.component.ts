import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";

import { HeaderComponent } from "./modules/core/components/header/header.component";
import { FooterComponent } from "./modules/core/components/footer/footer.component";
import { SpinnerComponent } from "./modules/core/components/spinner/spinner.component";
import { AppState } from "./store/app.reducer";
import * as AuthActions from "./modules/auth/store/auth.actions";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent, SpinnerComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  title = "angular-lotto";

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.autoLogin());
  }
}
