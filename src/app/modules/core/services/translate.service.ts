import { Injectable } from "@angular/core";
import { TranslateService as TranslateServiceCore } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class TranslateService {
  private languages = ["en", "pl"];
  private LANGUAGE_KEY = "language";

  constructor(private translateService: TranslateServiceCore) {
    const defaultLanguage = localStorage.getItem(this.LANGUAGE_KEY) || "en";
    translateService.setDefaultLang(defaultLanguage);
    this.translateService.use(defaultLanguage);
  }
  changeLanguage(lang: string) {
    this.translateService.use(lang);
    localStorage.setItem(this.LANGUAGE_KEY, lang);
  }

  getLanguage() {
    return localStorage.getItem(this.LANGUAGE_KEY) || "en";
  }

  getLanguages() {
    return this.languages;
  }
}
