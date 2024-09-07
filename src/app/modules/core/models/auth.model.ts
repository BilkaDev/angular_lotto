export interface IUser {
  login: string;
  email: string;
}

export class User implements IUser {
  constructor(
    public login: string,
    public email: string
  ) {}
}

export interface LoginData {
  login: string;
  password: string;
}

export interface RegisterData extends LoginData {
  email: string;
}

export interface AuthResponse {
  message: string;
  code: string;
}
