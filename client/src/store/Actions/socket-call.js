import {
  ANSWER_CALL,
  CALLER_DATA,
  CALLER_DATA_SUCCESS,
  CALL_AGAIN,
  CREATE_SOCKET,
  DECLINE_CALL,
  DESTROY_CONNECTION,
  GET_REMOTE_STREAM,
  MAKE_RTC_CONNECTION,
  NOTHING_DONE_TO_CALL,
  OFFER_RECEIVED,
} from "../Constants/socket-call";

export const createSocket = (data) => {
  return { type: CREATE_SOCKET, payload: data };
};
export const getRemoteStream = (data) => {
  return { type: GET_REMOTE_STREAM, payload: data };
};
export const offerRecieved = (data) => {
  return { type: OFFER_RECEIVED, payload: data };
};
export const handleAnswerCall = (data) => {
  return { type: ANSWER_CALL, payload: data };
};
export const handleDeclineCall = (data) => {
  return { type: DECLINE_CALL, payload: data };
};
export const handleCallAgain = (data) => {
  return { type: CALL_AGAIN, payload: data };
};
export const nothingDoneTocall = (data) => {
  return { type: NOTHING_DONE_TO_CALL, payload: data };
};
export const makeRTCconnection = (data) => {
  return { type: MAKE_RTC_CONNECTION, payload: data };
};
export const destroyConnection = (data) => {
  return { type: DESTROY_CONNECTION, payload: data };
};
export const getCallerData = (data) => {
  return { type: CALLER_DATA, payload: data };
};
export const getCallerDataSuccess = (data) => {
  return { type: CALLER_DATA_SUCCESS, payload: data };
};
