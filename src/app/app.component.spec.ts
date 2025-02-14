import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { TranslateTestingModule } from "ngx-translate-testing";
import { provideMockStore } from "@ngrx/store/testing";

const translateTestingModule = () =>
  TranslateTestingModule.withTranslations({
    en: {},
  });

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule.forRoot([]), translateTestingModule()],
      providers: [provideMockStore({})],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'angular-lotto' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual("angular-lotto");
  });
  it("should render app-header", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const headerComponent = compiled.querySelector("app-header");

    expect(headerComponent).toBeTruthy();
  });
});
