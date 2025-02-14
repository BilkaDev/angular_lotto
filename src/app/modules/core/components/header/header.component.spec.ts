import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderComponent } from "./header.component";
import { RouterModule } from "@angular/router";
import { By } from "@angular/platform-browser";
import { TranslateTestingModule } from "ngx-translate-testing";
import { provideMockStore } from "@ngrx/store/testing";
import { AppState } from "../../../../store/app.reducer";

const translateTestingModule = () =>
  TranslateTestingModule.withTranslations({
    en: {},
  });
describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const initialState: AppState = {
    auth: {
      loading: false,
      user: null,
      error: null,
    },
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterModule.forRoot([]), translateTestingModule()],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    document.body.setAttribute("data-theme", "dark");
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize with dark theme", () => {
    expect(component.isLightTheme).toBeFalse();
    expect(document.body.getAttribute("data-theme")).toEqual("dark");
  });

  it("should switch to light theme when onThemeSwitchChange is called", () => {
    component.onThemeSwitchChange();
    expect(component.isLightTheme).toBeTrue();
    expect(document.body.getAttribute("data-theme")).toEqual("light");
  });

  it("should switch back to dark theme when onThemeSwitchChange is called twice", () => {
    component.onThemeSwitchChange();
    component.onThemeSwitchChange();
    expect(component.isLightTheme).toBeFalse();
    expect(document.body.getAttribute("data-theme")).toEqual("dark");
  });

  it("should display dark mode icon", () => {
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.css(".mode-btn"));
    expect(icon).toBeTruthy();
  });
  //

  it("should change theme to light after clicking the mode-btn", () => {
    //given
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css(".mode-btn")).nativeElement;

    // when
    button.click();
    fixture.detectChanges();

    // then
    expect(document.body.getAttribute("data-theme")).toBe("light");
  });
});
