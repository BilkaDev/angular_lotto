export class Result {
  constructor(
    public ticketId: string,
    public numbers: number[],
    public wonNumbers: number[],
    public hitNumbers: number[],
    public drawDate: string,
    public isWinner: boolean,
    public message: string
  ) {}
}

interface ResultDto {
  hash: string;
  numbers: number[];
  wonNumbers: number[];
  hitNumbers: number[];
  drawDate: string;
  isWinner: boolean;
}

export interface ResultResponse {
  result: ResultDto;
  message: string;
}

export const messageResponse = {
  WAIT_MESSAGE: "Results are being calculated, please come back later",
  WIN_MESSAGE: "Congratulations, you won!",
  LOSE_MESSAGE: "No luck, try again!",
  ALREADY_CHECKED: "You have already checked your ticket, please come back later",
  HASH_DOES_NOT_EXIST_MESSAGE: "Given ticket does not exist",
};
