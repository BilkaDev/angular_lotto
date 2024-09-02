import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TicketItemComponent } from "./ticket-item.component";
import { HttpClientModule } from "@angular/common/http";
import { TranslateTestingModule } from "ngx-translate-testing";

import enJson from "../../../../../../public/i8n/en.json";

const translateTestingModule = () =>
  TranslateTestingModule.withTranslations({
    enJson,
  });

describe("TicketItemComponent", () => {
  let component: TicketItemComponent;
  let fixture: ComponentFixture<TicketItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketItemComponent, HttpClientModule, translateTestingModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
