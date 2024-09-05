export const errorCodeMap: Record<string, string> = {
  TICKET_NOT_FOUND: "error.resultNotFound",
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
