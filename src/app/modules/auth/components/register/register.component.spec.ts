import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RegisterComponent } from "./register.component";
import { TranslateTestingModule } from "ngx-translate-testing";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const translateTestingModule = () =>
  TranslateTestingModule.withTranslations({
    en: {},
  });
describe("RegisterComponent", () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, translateTestingModule(), RouterModule.forRoot([]), BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("disables sign up button when form is invalid", () => {
    component.registerForm.controls["login"].setValue("");
    component.registerForm.controls["email"].setValue("");
    component.registerForm.controls["password"].setValue("");
    component.registerForm.controls["repeatedPassword"].setValue("");
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector(".actions button").disabled).toBeTrue();
  });

  it("enables sign up button when form is valid", () => {
    component.registerForm.controls["login"].setValue("user");
    component.registerForm.controls["email"].setValue("user@example.com");
    component.registerForm.controls["password"].setValue("password");
    component.registerForm.controls["repeatedPassword"].setValue("password");
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector(".actions button").disabled).toBeFalse();
  });

  it("displays login error message when login is invalid", () => {
    component.registerForm.controls["login"].setValue("");
    component.registerForm.controls["login"].markAsTouched();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("mat-error").textContent).toContain("core.formService.required");
  });

  it("displays email error message when email is invalid", () => {
    component.registerForm.controls["email"].setValue("test");
    component.registerForm.controls["email"].markAsTouched();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("mat-error").textContent).toContain("core.formService.email");
  });

  it("displays repeated password error message when repeated password is invalid", () => {
    component.registerForm.controls["repeatedPassword"].setValue("12345");
    component.registerForm.controls["repeatedPassword"].markAsTouched();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("mat-error").textContent).toContain("core.formService.repeatedPassword");
  });

  it("calls onRegister method when form is submitted", () => {
    spyOn(component, "onRegister" as never);
    component.registerForm.controls["login"].setValue("tester");
    component.registerForm.controls["email"].setValue("user@example.com");
    component.registerForm.controls["password"].setValue("password");
    component.registerForm.controls["repeatedPassword"].setValue("password");
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    compiled.querySelector(".actions button").click();
    expect(component.onRegister).toHaveBeenCalled();
  });
});
