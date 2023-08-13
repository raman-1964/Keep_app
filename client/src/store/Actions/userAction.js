import {
  SEARCH_USER_FAILED,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
} from "../Constants/userConstants";

export const searchUserRequest = (data) => {
  return { type: SEARCH_USER_REQUEST, payload: data };
};
export const searchUserSuccess = (data) => {
  return { type: SEARCH_USER_SUCCESS, payload: data };
};
export const searchUserFailed = (data) => {
  return { type: SEARCH_USER_FAILED, payload: data };
};
