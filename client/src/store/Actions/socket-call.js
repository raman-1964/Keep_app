import {
  ANSWER_CALL,
  CREATE_SOCKET,
  MAKE_RTC_CONNECTION,
  OFFER_RECEIVED,
} from "../Constants/socket-call";

export const createSocket = (data) => {
  return { type: CREATE_SOCKET, payload: data };
};
export const offerRecieved = (data) => {
  return { type: OFFER_RECEIVED, payload: data };
};
export const handleAnswerCall = (data) => {
  return { type: ANSWER_CALL, payload: data };
};
export const makeRTCconnection = (data) => {
  return { type: MAKE_RTC_CONNECTION, payload: data };
};
