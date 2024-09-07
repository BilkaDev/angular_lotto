import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { HttpClient, provideHttpClient, withInterceptors } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { provideStore, StoreModule } from "@ngrx/store";

import { routes } from "./app.routes";
import { spinnerInterceptor } from "./modules/core/interceptors/spinner.interceptor";
import { authReducer } from "./modules/core/store/auth.reducer";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./i8n/", ".json");
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([spinnerInterceptor])),
    importProvidersFrom(
      StoreModule.forRoot({ auth: authReducer }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    provideStore(),
  ],
};
