import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ResultMessageComponent } from "./result-message.component";
import { TranslateTestingModule } from "ngx-translate-testing";
import enJson from "../../../../../../public/i8n/en.json";
import { Result } from "../../../core/models/result.model";

const translateTestingModule = () =>
  TranslateTestingModule.withTranslations({
    enJson,
  });
fdescribe("ResultMessageComponent", () => {
  let component: ResultMessageComponent;
  let fixture: ComponentFixture<ResultMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultMessageComponent, translateTestingModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultMessageComponent);
    component = fixture.componentInstance;
    component.result = new Result("", [], [], [], "", false, "");
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("displays the result message", () => {
    component.result.message = "win";
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector(".message").textContent).toContain("result.win");
  });

  it("displays the result numbers", () => {
    component.result.numbers = [1, 2, 3, 4, 5];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector(".row:nth-child(1) span").textContent).toBe("1,2,3,4,5");
  });

  it("displays the won numbers", () => {
    component.result.wonNumbers = [1, 2, 3];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector(".row:nth-child(2) span").textContent).toBe("1,2,3");
  });

  it("displays the hit numbers", () => {
    component.result.hitNumbers = [4, 5];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector(".row:nth-child(3) span").textContent).toBe("4,5");
  });

  it("displays the draw date", () => {
    component.result.drawDate = "2023-10-05 12:00";
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector(".row:nth-child(4) span").textContent).toContain("5.10.2023 12:00");
  });

  it("handles missing result data gracefully", () => {
    component.result = {} as Result;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector(".row:nth-child(1) span").textContent).toBe("");
    expect(compiled.querySelector(".row:nth-child(2) span").textContent).toBe("");
    expect(compiled.querySelector(".row:nth-child(3) span").textContent).toBe("");
    expect(compiled.querySelector(".row:nth-child(4) span").textContent).toBe("Invalid Date Inval");
  });
});
