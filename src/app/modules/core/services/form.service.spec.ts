import { TestBed } from "@angular/core/testing";

import { FormService } from "./form.service";
import { TranslateTestingModule } from "ngx-translate-testing";

const translateTestingModule = () => TranslateTestingModule.withTranslations({});
describe("FormService", () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [translateTestingModule()] });
    service = TestBed.inject(FormService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
