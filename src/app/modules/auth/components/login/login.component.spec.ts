import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateTestingModule } from "ngx-translate-testing";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { LoginComponent } from "./login.component";

const translateTestingModule = () =>
  TranslateTestingModule.withTranslations({
    en: {},
  });
describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, translateTestingModule(), RouterModule.forRoot([]), BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("disables login button when form is invalid", () => {
    component.loginForm.controls["login"].setValue("");
    component.loginForm.controls["password"].setValue("");
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("button").disabled).toBeTrue();
  });

  it("enables login button when form is valid", () => {
    component.loginForm.controls["login"].setValue("user");
    component.loginForm.controls["password"].setValue("password");
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("button").disabled).toBeFalse();
  });

  it("displays login error message when login is invalid", () => {
    component.loginForm.controls["login"].setValue("");
    component.loginForm.controls["login"].markAsTouched();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("mat-error").textContent).toContain("core.formService.required");
  });

  it("displays password error message when password is invalid", () => {
    component.loginForm.controls["password"].setValue("");
    component.loginForm.controls["password"].markAsTouched();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("mat-error").textContent).toContain("core.formService.required");
  });

  it("calls onLogin method when form is submitted", () => {
    spyOn(component, "onLogin" as never);
    component.loginForm.controls["login"].setValue("user");
    component.loginForm.controls["password"].setValue("password");
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    compiled.querySelector("button").click();
    expect(component.onLogin).toHaveBeenCalled();
  });
});
