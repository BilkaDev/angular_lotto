import { TestBed } from "@angular/core/testing";

import { FormsService } from "./forms.service";
import { TranslateTestingModule } from "ngx-translate-testing";

const translateTestingModule = () => TranslateTestingModule.withTranslations({});
describe("FormService", () => {
  let service: FormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [translateTestingModule()] });
    service = TestBed.inject(FormsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
