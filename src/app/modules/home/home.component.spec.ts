import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeComponent } from "./home.component";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should display the welcome message", () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("h1")?.textContent).toContain("Welcome to AngularLotto");
  });

  it("should display the lotto instructions", () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const listItems = compiled.querySelectorAll("ul li");
    expect(listItems.length).toEqual(3);
  });

  it("should display the lotto image", () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const imgElement = compiled.querySelector(".lotto-image img");
    expect(imgElement).toBeTruthy();
  });
});
