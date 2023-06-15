import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  SIGNUP_FAILED,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "../Constants/loginConstants";

export const signupRequest = (data) => {
  return { type: SIGNUP_REQUEST, payload: data };
};
export const signupSuccess = (data) => {
  return { type: SIGNUP_SUCCESS, payload: data };
};
export const signupFailed = (data) => {
  return { type: SIGNUP_FAILED, payload: data };
};


export const loginRequest = (data) => {
  return { type: LOGIN_REQUEST, payload: data };
};
export const loginSuccess = (data) => {
  return { type: LOGIN_SUCCESS, payload: data };
};
export const loginFailed = (data) => {
  return { type: LOGIN_FAILED, payload: data };
};


export const logoutRequest = (data) => {
  return { type: LOGOUT_REQUEST, payload: data };
};
