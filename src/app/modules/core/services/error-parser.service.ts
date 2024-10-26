import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { errorCodeMap, ErrorResponse } from "../models/ErrorResponse";

@Injectable({
  providedIn: "root",
})
export class ErrorParserService {
  constructor(private translate: TranslateService) {}

  parseErrorFromStatus(status: number, errorMessage?: string): string {
    switch (status) {
      case 400:
        return this.formatMessage("error.bad-request", errorMessage, "error.bad-request-desc");
      case 401:
        return this.formatMessage("error.unauthorized", errorMessage, "error.unauthorized-desc");
      case 403:
        return this.formatMessage("error.forbidden", errorMessage, "error.forbidden-desc");
      case 404:
        return this.formatMessage("error.not-found", errorMessage, "error.not-found-desc");
      case 500:
        return this.formatMessage("error.500", errorMessage, "error.500-desc");
      case 503:
        return this.formatMessage("error.503", errorMessage, "error.503-desc");
      default:
        return this.formatMessage("error.unknown-error", errorMessage, "error.unknown-error-desc");
    }
  }

  parseError(
    error: unknown,
    opt?: {
      message: string;
    }
  ) {
    if (this.isErrorKey(error) && ErrorResponse.isErrorResponse(error.error)) {
      const code = error.error.code;
      if (errorCodeMap[code] != undefined) {
        return this.translate.instant(errorCodeMap[code]);
      }
    }
    return this.parseErrorFromStatus(this.isStatusKey(error) ? error.status : 0, opt?.message);
  }

  private formatMessage(title: string, serverMessage?: string, description?: string): string {
    let formattedMessage = `${this.translate.instant(title)}: `;
    if (serverMessage) {
      formattedMessage += `${this.translate.instant(serverMessage)}. `;
    }
    if (description) {
      formattedMessage += `${this.translate.instant(description)}`;
    }
    return formattedMessage;
  }

  private isStatusKey(err: unknown): err is { status: number } {
    return typeof err === "object" && err !== null && "status" in err;
  }

  private isErrorKey(err: unknown): err is { error: unknown } {
    return typeof err === "object" && err !== null && "error" in err;
  }
}
