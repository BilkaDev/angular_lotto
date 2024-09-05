import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ResultsComponent } from "./results.component";
import { TranslateTestingModule } from "ngx-translate-testing";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";

const translateTestingModule = () => TranslateTestingModule.withTranslations({});

describe("ResultsComponent", () => {
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsComponent, translateTestingModule(), HttpClientModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsComponent);
    fixture.detectChanges();
  });

  it("displays the card title", () => {
    const el = fixture.debugElement.query(By.css("app-card")).nativeElement;
    expect(el.textContent).toContain("result.title");
  });

  it("displays the card subtitle", () => {
    const el = fixture.debugElement.query(By.css("app-card")).nativeElement;
    expect(el.textContent).toContain("result.subtitle");
  });

  it("contains the results form component", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("app-results-form")).not.toBeNull();
  });

  it("assigns the correct id to the results form", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("app-results-form").id).toBe("results-form");
  });
});
