export const errorCodeMap: Record<string, string> = {
  TICKET_NOT_FOUND: "error.resultNotFound",
  DENY: "denied",
  A1: "error.userNotFound",
  A2: "error.invalidData",
  A3: "error.tokenExpired",
  A4: "error.loginNotExist",
  A5: "error.emailExist",
  A6: "error.incorrectCredentials",
};

export class ErrorResponse {
  constructor(
    public code: string,
    public status: string,
    public messages: string[]
  ) {}

  public static isErrorResponse(err: unknown): err is ErrorResponse {
    return (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      "status" in err &&
      "messages" in err &&
      typeof err.code === "string" &&
      typeof err.status === "string" &&
      Array.isArray(err.messages) &&
      err.messages.every((msg: unknown) => typeof msg === "string")
    );
  }
}
