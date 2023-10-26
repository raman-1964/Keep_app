import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  SIGNUP_FAILED,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "../Constants/loginConstants";

var loginToken = localStorage.getItem("Raman-Keep-Token");

const initialState = {
  userToken: loginToken ? loginToken : "",
  loginLoading: false,
  signupLoading: false,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loginLoading: true };

    case LOGIN_SUCCESS:
      localStorage.setItem("Raman-Keep-Token", action.payload.token);
      localStorage.setItem("Raman-Keep-Username", action.payload.data.username);
      return {
        ...state,
        userToken: action.payload.token,
        loginLoading: false,
      };

    case LOGIN_FAILED:
      return { ...state, loginLoading: false };

    case SIGNUP_REQUEST:
      return { ...state, signupLoading: true };

    case SIGNUP_SUCCESS:
      localStorage.setItem("Raman-Keep-Token", action.payload.token);
      localStorage.setItem("Raman-Keep-Username", action.payload.data.username);
      return {
        ...state,
        userToken: action.payload.token,
        signupLoading: false,
      };

    case SIGNUP_FAILED:
      return { ...state, signupLoading: false };

    case LOGOUT_REQUEST:
      localStorage.removeItem("Raman-Keep-Token");
      localStorage.removeItem("Raman-Keep-Username");

      return { ...state, userToken: "" };

    default:
      return state;
  }
};
