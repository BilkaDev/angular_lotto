import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { TranslateTestingModule } from "ngx-translate-testing";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { TicketFormComponent } from "./ticket-form.component";
import enJson from "../../../../../../public/i8n/en.json";
import { TicketService } from "../../ticket.service";
import { Ticket } from "../../../core/models/ticket.model";

const translateTestingModule = () =>
  TranslateTestingModule.withTranslations({
    enJson,
  });

describe("TicketFormComponent", () => {
  let component: TicketFormComponent;
  let fixture: ComponentFixture<TicketFormComponent>;
  let ticketServiceSpy: jasmine.SpyObj<TicketService>;

  beforeEach(async () => {
    ticketServiceSpy = jasmine.createSpyObj("TicketService", ["inputNumbers"]);
    await TestBed.configureTestingModule({
      imports: [TicketFormComponent, translateTestingModule(), HttpClientModule, BrowserAnimationsModule],
      providers: [{ provide: TicketService, useValue: ticketServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should update number in ticket data", () => {
    component.updateNumber(0, "12");
    expect(component.ticketData.numbers[0]).toEqual(12);
  });

  it("should set random numbers", () => {
    component.setRandomNumbers();
    for (let i = 0; i < 6; i++) {
      expect(component.ticketData.numbers[i]).toBeGreaterThanOrEqual(1);
      expect(component.ticketData.numbers[i]).toBeLessThanOrEqual(99);
    }
  });

  it("should display 6 input fields", () => {
    const inputs = fixture.debugElement.nativeElement.querySelectorAll("input");
    expect(inputs.length).toBe(6, "There should be 6 input fields");
  });

  it("should set random numbers and when click button submit should call method inputNumbers", () => {
    ticketServiceSpy.inputNumbers.and.returnValue(of(new Ticket("", "", [])));
    const randomButton = fixture.debugElement.nativeElement.querySelector('button[type="button"]');
    const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    randomButton.click();
    fixture.detectChanges();
    submitButton.click();

    console.log(component.ticketData);

    expect(ticketServiceSpy.inputNumbers).toHaveBeenCalled();
  });

  it("should fail to call the inputnumbers method if we specify numbers greater than 99s", () => {
    component.ticketData = { numbers: [111, 1, 2, 3, 4, 5] };
    const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    fixture.detectChanges();
    submitButton.click();

    expect(ticketServiceSpy.inputNumbers).not.toHaveBeenCalled();
  });
  it("should fail to call the inputnumbers method if 6 different digits are not specified", () => {
    component.ticketData = { numbers: [1, 1, 2, 3, 4, 5] };
    const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    fixture.detectChanges();
    submitButton.click();

    expect(ticketServiceSpy.inputNumbers).not.toHaveBeenCalled();
  });

  it("should fail to call the inputnumbers method if less than 6 numbers are specified ", () => {
    component.ticketData = { numbers: [1, 2, 3, 4, 5] };
    const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    fixture.detectChanges();
    submitButton.click();

    expect(ticketServiceSpy.inputNumbers).not.toHaveBeenCalled();
  });
});
