import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TicketItemComponent } from "./ticket-item.component";
import { HttpClientModule } from "@angular/common/http";
import { TranslateTestingModule } from "ngx-translate-testing";

import enJson from "../../../../../../public/i8n/en.json";
import { By } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Ticket } from "../../../core/models/ticket.model";

const translateTestingModule = () =>
  TranslateTestingModule.withTranslations({
    enJson,
  });

describe("TicketItemComponent", () => {
  let component: TicketItemComponent;
  let fixture: ComponentFixture<TicketItemComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj("Router", ["navigate"]);
    await TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerSpy }],
      imports: [TicketItemComponent, HttpClientModule, translateTestingModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketItemComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should display ticket details", () => {
    component.ticket = new Ticket("2022-01-01 12:00", "123", [1, 2, 3, 4, 5, 6]);

    fixture.detectChanges();

    const ticketIdElement = fixture.debugElement.queryAll(By.css(".info .right"))[0].nativeElement;
    const drawDateElement = fixture.debugElement.queryAll(By.css(".info .right"))[1].nativeElement;
    const numbersElement = fixture.debugElement.queryAll(By.css(".info .right"))[2].nativeElement;

    expect(ticketIdElement.textContent).toContain("123 content_paste");
    expect(drawDateElement.textContent).toContain("1.01.2022 12:00");
    expect(numbersElement.textContent).toContain("1,2,3,4,5,6");
  });

  it("should clearTicket when click back to <Play", () => {
    component.ticket = new Ticket("", "", []);
    const buttonElement = fixture.debugElement.query(By.css(".btn-group button:first-child")).nativeElement;
    buttonElement.click();
    fixture.detectChanges();

    expect(component.ticket).toBeNull();
  });

  it("should navigate to results page when check results button is clicked", () => {
    const buttonElement = fixture.debugElement.query(By.css(".btn-group button:last-child")).nativeElement;
    buttonElement.click();
    expect(router.navigate).toHaveBeenCalledWith(["/results"]);
  });
});
