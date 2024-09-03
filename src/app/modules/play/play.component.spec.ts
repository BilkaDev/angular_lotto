import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { PlayComponent } from "./play.component";
import { TranslateTestingModule } from "ngx-translate-testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import enJson from "../../../../public/i8n/en.json";
import { Ticket } from "../core/models/ticket.model";

const translateTestingModule = () =>
  TranslateTestingModule.withTranslations({
    enJson,
  });
describe("PlayComponent", () => {
  let component: PlayComponent;
  let fixture: ComponentFixture<PlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayComponent, translateTestingModule(), BrowserAnimationsModule, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render ticket-form component if ticket is null", () => {
    const ticketFormElement = fixture.debugElement.nativeElement.querySelector("app-ticket-form");
    expect(ticketFormElement).toBeTruthy();
  });

  it("should render ticket-item component if ticket is null", () => {
    component.ticket = new Ticket("", "", []);

    fixture.detectChanges();
    const ticketFormElement = fixture.debugElement.nativeElement.querySelector("app-ticket-item");

    expect(ticketFormElement).toBeTruthy();
  });
});
