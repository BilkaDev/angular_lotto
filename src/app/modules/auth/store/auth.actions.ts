import { createAction, props } from "@ngrx/store";

import { IUser, LoginData, RegisterData } from "../../core/models/auth.model";

const AUTO_LOGIN_TYPE = "[Auth] Auto Login";
const AUTO_LOGIN_SUCCESS_TYPE = "[Auth] Auto Login Success";
const AUTO_LOGIN_FAILED_TYPE = "[Auth] Auto Login Failed";

const LOGIN_TYPE = "[Auth] Login";
const LOGIN_SUCCESS_TYPE = "[Auth] Login Success";
const LOGIN_FAILED_TYPE = "[Auth] Login Failed";

const REGISTER_TYPE = "[Auth] Register";
const REGISTER_SUCCESS_TYPE = "[Auth] Register Success";
const REGISTER_FAILED_TYPE = "[Auth] Register Failed";

const LOGOUT_TYPE = "[Auth] Logout";
const LOGOUT_SUCCESS_TYPE = "[Auth] Logout Success";
const LOGOUT_FAILED_TYPE = "[Auth] Logout Failed";

const CLEAR_ERROR_TYPE = "[Auth] Clear Error";

export const autoLogin = createAction(AUTO_LOGIN_TYPE);

export const autoLoginSuccess = createAction(AUTO_LOGIN_SUCCESS_TYPE, props<{ user: IUser }>());
export const autoLoginFailed = createAction(AUTO_LOGIN_FAILED_TYPE);

export const login = createAction(LOGIN_TYPE, props<{ loginData: LoginData }>());

export const loginSuccess = createAction(LOGIN_SUCCESS_TYPE, props<{ user: IUser }>());

export const loginFailed = createAction(LOGIN_FAILED_TYPE, props<{ error: string }>());
export const register = createAction(REGISTER_TYPE, props<{ registerData: RegisterData }>());
export const registerSuccess = createAction(REGISTER_SUCCESS_TYPE);

export const registerFailed = createAction(REGISTER_FAILED_TYPE, props<{ error: string }>());

export const clearError = createAction(CLEAR_ERROR_TYPE);

export const logout = createAction(LOGOUT_TYPE);
export const logoutSuccess = createAction(LOGOUT_SUCCESS_TYPE);
export const logoutFailed = createAction(LOGOUT_FAILED_TYPE);
