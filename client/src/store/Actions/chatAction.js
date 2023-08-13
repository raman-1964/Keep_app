import {
  CREATE_CHAT_FAILED,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  GET_ALL_CHAT_FAILED,
  GET_ALL_CHAT_REQUEST,
  GET_ALL_CHAT_SUCCESS,
} from "../Constants/chatConstant";

export const getAllChatRequest = (data) => {
  return { type: GET_ALL_CHAT_REQUEST, payload: data };
};
export const getAllChatSuccess = (data) => {
  return { type: GET_ALL_CHAT_SUCCESS, payload: data };
};
export const getAllChatFailed = (data) => {
  return { type: GET_ALL_CHAT_FAILED, payload: data };
};

export const createChatRequest = (data) => {
  return { type: CREATE_CHAT_REQUEST, payload: data };
};
export const createChatSuccess = (data) => {
  return { type: CREATE_CHAT_SUCCESS, payload: data };
};
export const createChatFailed = (data) => {
  return { type: CREATE_CHAT_FAILED, payload: data };
};
