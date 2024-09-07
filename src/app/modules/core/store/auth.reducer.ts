import { Action, createReducer, on } from "@ngrx/store";

import { User } from "../models/auth.model";
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
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    loading: false,
    user: action.user,
    error: null,
  })),
  on(AuthActions.loginFailed, (state, action) => ({
    ...state,
    loading: false,
    user: null,
    error: action.error,
  })),

  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.registerSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(AuthActions.registerFailed, (state, action) => ({
    ...state,
    loading: false,
    user: null,
    error: action.error,
  })),
  on(AuthActions.clearError, (state) => ({
    ...state,
    error: null,
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
