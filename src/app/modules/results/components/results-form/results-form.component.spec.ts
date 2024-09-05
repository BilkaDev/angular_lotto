import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateTestingModule } from "ngx-translate-testing";
import { ResultsFormComponent } from "./results-form.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Result } from "../../../core/models/result.model";

const translateTestingModule = () => TranslateTestingModule.withTranslations({});

describe("ResultsFormComponent", () => {
  let component: ResultsFormComponent;
  let fixture: ComponentFixture<ResultsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsFormComponent, translateTestingModule(), HttpClientModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("displays the form label", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("mat-label").textContent).toContain("result.label");
  });

  it("disables the submit button when the form is invalid", () => {
    component.ticketIdControl.setValue("");
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("button").disabled).toBeTrue();
  });

  it("enables the submit button when the form is valid", () => {
    component.ticketIdControl.setValue("12345678");
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("button").disabled).toBeFalse();
  });

  it("displays the error message when the form is invalid", () => {
    component.ticketIdControl.setValue("");
    component.ticketIdControl.markAsDirty();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector("mat-error").textContent).toContain(
      component.getErrorMessage(component.ticketIdControl)
    );
  });

  it("does not display the error message when the form is valid", () => {
    component.ticketIdControl.setValue("12345678");
    component.ticketIdControl.markAsDirty();

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("mat-error")).toBeNull();
  });

  it("displays the result message component when result is present", () => {
    component.result = new Result("", [], [], [], "", true, "win");
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("app-result-message")).not.toBeNull();
  });

  it("does not display the result message component when result is not present", () => {
    component.result = null;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("app-result-message")).toBeNull();
  });
});
