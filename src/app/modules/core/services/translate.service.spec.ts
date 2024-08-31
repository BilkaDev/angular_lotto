import { TestBed } from "@angular/core/testing";
import { TranslateService } from "./translate.service";
import { TranslateService as TranslateServiceCore } from "@ngx-translate/core";

fdescribe("TranslateService", () => {
  let service: TranslateService;
  let translateServiceCore: TranslateServiceCore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TranslateService,
        {
          provide: TranslateServiceCore,
          useValue: jasmine.createSpyObj("TranslateServiceCore", ["setDefaultLang", "use"]),
        },
      ],
    });
    service = TestBed.inject(TranslateService);
    translateServiceCore = TestBed.inject(TranslateServiceCore);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should use default language when no language is set", () => {
    service = new TranslateService(translateServiceCore);
    expect(translateServiceCore.use).toHaveBeenCalledWith("en");
  });

  it("should use stored language when a language is set", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    spyOn(localStorage, "getItem").and.returnValue("pl");
    service = new TranslateService(translateServiceCore);
    expect(translateServiceCore.use).toHaveBeenCalledWith("pl");
  });

  it("should change language", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    spyOn(localStorage, "setItem");
    service.changeLanguage("pl");
    expect(translateServiceCore.use).toHaveBeenCalledWith("pl");
    expect(localStorage.setItem).toHaveBeenCalledWith("language", "pl");
  });

  it("should get current language", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    spyOn(localStorage, "getItem").and.returnValue("pl");
    expect(service.getLanguage()).toEqual("pl");
  });

  it("should get all languages", () => {
    expect(service.getLanguages()).toEqual(["en", "pl"]);
  });
});
