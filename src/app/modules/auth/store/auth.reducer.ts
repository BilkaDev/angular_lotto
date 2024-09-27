import { Action, createReducer, on } from "@ngrx/store";

import { User } from "../../core/models/auth.model";
import * as AuthActions from "./auth.actions";

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const _authReducer = createReducer(
  initialState,
  on(AuthActions.register, AuthActions.login, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    loading: false,
    user: new User(action.user.login, action.user.email),
    error: null,
  })),
  on(AuthActions.loginFailed, AuthActions.registerFailed, (state, action) => ({
    ...state,
    loading: false,
    user: null,
    error: action.error,
  })),
  on(AuthActions.logoutFailed, AuthActions.autoLogin, AuthActions.autoLoginFailed, AuthActions.logout, (state) => ({
    ...state,
  })),
  on(AuthActions.autoLoginSuccess, (state, action) => ({
    ...state,
    user: new User(action.user.login, action.user.email),
  })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    user: null,
    error: null,
  })),
  on(AuthActions.registerSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(AuthActions.clearError, (state) => ({
    ...state,
    error: null,
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
