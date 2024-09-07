import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { HttpClient, provideHttpClient, withInterceptors } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";

import { routes } from "./app.routes";
import { spinnerInterceptor } from "./modules/core/interceptors/spinner.interceptor";
import { authReducer } from "./modules/auth/store/auth.reducer";
import { AuthEffects } from "./modules/auth/store/auth.effects";
import { errorHandlerInterceptor } from "./modules/core/interceptors/error-handler.interceptor";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./i8n/", ".json");
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([spinnerInterceptor, errorHandlerInterceptor])),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
  ],
};
