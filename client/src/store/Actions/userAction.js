import {
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PHOTO_REQUEST,
  CHANGE_PHOTO_SUCCESS,
  DELETE_USER_FAILED,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  FOLLOW_UNFOLLOW_FAILED,
  FOLLOW_UNFOLLOW_REQUEST,
  FOLLOW_UNFOLLOW_SUCCESS,
  SEARCH_USER_FAILED,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEND_FEEDBACK_FAILED,
  SEND_FEEDBACK_REQUEST,
  SEND_FEEDBACK_SUCCESS,
  UPDATE_USER_INFO_FAILED,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
  USER_INFO_FAILED,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
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

export const userInfoRequest = (data) => {
  return { type: USER_INFO_REQUEST, payload: data };
};
export const userInfoSuccess = (data) => {
  return { type: USER_INFO_SUCCESS, payload: data };
};
export const userInfoFailed = (data) => {
  return { type: USER_INFO_FAILED, payload: data };
};

export const updateUserInfoRequest = (data) => {
  return { type: UPDATE_USER_INFO_REQUEST, payload: data };
};
export const updateUserInfoSuccess = (data) => {
  return { type: UPDATE_USER_INFO_SUCCESS, payload: data };
};
export const updateUserInfoFailed = (data) => {
  return { type: UPDATE_USER_INFO_FAILED, payload: data };
};

export const deleteUserRequest = (data) => {
  return { type: DELETE_USER_REQUEST, payload: data };
};
export const deleteUserSuccess = (data) => {
  return { type: DELETE_USER_SUCCESS, payload: data };
};
export const deleteUserFailed = (data) => {
  return { type: DELETE_USER_FAILED, payload: data };
};

export const changePasswordRequest = (data) => {
  return { type: CHANGE_PASSWORD_REQUEST, payload: data };
};
export const changePasswordSuccess = (data) => {
  return { type: CHANGE_PASSWORD_SUCCESS, payload: data };
};
export const changePasswordFailed = (data) => {
  return { type: CHANGE_PASSWORD_FAILED, payload: data };
};

export const followUnfollowRequest = (data) => {
  return { type: FOLLOW_UNFOLLOW_REQUEST, payload: data };
};
export const followUnfollowSuccess = (data) => {
  return { type: FOLLOW_UNFOLLOW_SUCCESS, payload: data };
};
export const followUnfollowFailed = (data) => {
  return { type: FOLLOW_UNFOLLOW_FAILED, payload: data };
};

export const sendFeedbackRequest = (data) => {
  return { type: SEND_FEEDBACK_REQUEST, payload: data };
};
export const sendFeedbackSuccess = (data) => {
  return { type: SEND_FEEDBACK_SUCCESS, payload: data };
};
export const sendFeedbackFailed = (data) => {
  return { type: SEND_FEEDBACK_FAILED, payload: data };
};

export const changePhotoRequest = (data) => {
  return { type: CHANGE_PHOTO_REQUEST, payload: data };
};
export const changePhotoSuccess = (data) => {
  return { type: CHANGE_PHOTO_SUCCESS, payload: data };
};
