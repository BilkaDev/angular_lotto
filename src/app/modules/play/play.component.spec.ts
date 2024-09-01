import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PlayComponent } from "./play.component";
import { TranslateTestingModule } from "ngx-translate-testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import enJson from "../../../../public/i8n/en.json";

const translateTestingModule = () =>
  TranslateTestingModule.withTranslations({
    enJson,
  });
describe("PlayComponent", () => {
  let component: PlayComponent;
  let fixture: ComponentFixture<PlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayComponent, translateTestingModule(), BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
