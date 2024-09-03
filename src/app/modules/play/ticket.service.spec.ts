import { TestBed } from "@angular/core/testing";

import { HttpClientModule } from "@angular/common/http";
import { TranslateTestingModule } from "ngx-translate-testing";

import { TicketService } from "./ticket.service";
import enJson from "../../../../public/i8n/en.json";

const translateTestingModule = () =>
  TranslateTestingModule.withTranslations({
    enJson,
  });
describe("TicketService", () => {
  let service: TicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, translateTestingModule()],
    });
    service = TestBed.inject(TicketService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
