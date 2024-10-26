import { TestBed } from "@angular/core/testing";
import { TranslateService } from "@ngx-translate/core";
import { ErrorParserService } from "./error-parser.service";
import { errorCodeMap, ErrorResponse } from "../models/ErrorResponse";

describe("ErrorParserService", () => {
  let service: ErrorParserService;
  let translateService: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    errorCodeMap["A1"] = "test";
    const spy = jasmine.createSpyObj("TranslateService", ["instant"]);
    TestBed.configureTestingModule({
      providers: [ErrorParserService, { provide: TranslateService, useValue: spy }],
    });
    service = TestBed.inject(ErrorParserService);
    translateService = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
  });

  it("should parse 400 status error", () => {
    translateService.instant.and.returnValue("Bad Request");
    const result = service.parseErrorFromStatus(400);
    expect(result).toEqual("Bad Request: Bad Request");
  });

  it("should parse 500 status error with server message", () => {
    translateService.instant.and.returnValues("500", "Server Error", "Server is down.");
    const result = service.parseErrorFromStatus(500, "Server is down");
    expect(result).toEqual("500: Server Error. Server is down.");
  });

  it("should parse unknown status error", () => {
    translateService.instant.and.returnValue("Unknown Error");
    const result = service.parseErrorFromStatus(999);
    expect(result).toEqual("Unknown Error: Unknown Error");
  });

  it("parses error with known error code", () => {
    const error = { error: new ErrorResponse("A1", "NOT_FOUND", ["not found item"]) };
    translateService.instant.and.returnValue("Known Error");
    const result = service.parseError(error);
    expect(result).toEqual("Known Error");
  });

  it("parses error with unknown error code", () => {
    const error = { error: new ErrorResponse("UNKNOWN", "unknown", ["unknown"]) };
    translateService.instant.and.returnValue("Unknown Error");
    const result = service.parseError(error);
    expect(result).toEqual("Unknown Error: Unknown Error");
  });
});
