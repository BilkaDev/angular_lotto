import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FooterComponent } from "./footer.component";

describe("FooterComponent", () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should display the current year", () => {
    const currentYear = new Date().getFullYear();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("span")?.textContent).toContain(currentYear);
  });

  it("should display the GitHub link", () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("a")?.getAttribute("href")).toEqual("https://github.com/BilkaDev");
  });

  it("should display the github name", () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const textName = compiled.querySelector("a div span")?.textContent;
    expect(textName).toEqual(component.name);
  });
});
