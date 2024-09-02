import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TranslateTestingModule } from "ngx-translate-testing";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { TicketFormComponent } from "./ticket-form.component";
import enJson from "../../../../../../public/i8n/en.json";

const translateTestingModule = () =>
  TranslateTestingModule.withTranslations({
    enJson,
  });

describe("TicketFormComponent", () => {
  let component: TicketFormComponent;
  let fixture: ComponentFixture<TicketFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketFormComponent, translateTestingModule(), HttpClientModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
