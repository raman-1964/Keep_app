import {
  CREATE_MESSAGE_FAILED,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  GET_ALL_MESSAGE_FAILED,
  GET_ALL_MESSAGE_REQUEST,
  GET_ALL_MESSAGE_SUCCESS,
} from "../Constants/messageConstant";

export const getAllMessageRequest = (data) => {
  return { type: GET_ALL_MESSAGE_REQUEST, payload: data };
};
export const getAllMessageSuccess = (data) => {
  return { type: GET_ALL_MESSAGE_SUCCESS, payload: data };
};
export const getAllMessageFailed = (data) => {
  return { type: GET_ALL_MESSAGE_FAILED, payload: data };
};

export const createMessageRequest = (data) => {
  return { type: CREATE_MESSAGE_REQUEST, payload: data };
};
export const createMessageSuccess = (data) => {
  return { type: CREATE_MESSAGE_SUCCESS, payload: data };
};
export const createMessageFailed = (data) => {
  return { type: CREATE_MESSAGE_FAILED, payload: data };
};
