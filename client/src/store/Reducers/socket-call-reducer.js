import {
  CREATE_SOCKET,
  ANSWER_CALL,
  OFFER_RECEIVED,
  MAKE_RTC_CONNECTION,
  GET_REMOTE_STREAM,
  DESTROY_CONNECTION,
  DECLINE_CALL,
  CALLER_DATA_SUCCESS,
  NOTHING_DONE_TO_CALL,
  CALL_AGAIN,
} from "../Constants/socket-call";
import io from "socket.io-client";

const initialState = {
  socket: null,
  callDropDown: { offer: null, from: null, config: null },
  callerData: {},
  answerCall: false,
  connection: null,
  remoteStream: null,
  waitToJoin: "ini",
};

export const socketCallReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SOCKET: {
      const socket = io(process.env.REACT_APP_ENDPOINT);
      socket.emit("setup", action.payload);

      return {
        ...state,
        socket,
      };
    }

    case GET_REMOTE_STREAM:
      return {
        ...state,
        remoteStream: action.payload,
      };

    case MAKE_RTC_CONNECTION:
      return {
        ...state,
        connection: action.payload,
      };

    case OFFER_RECEIVED:
      return {
        ...state,
        waitToJoin: "started",
        callDropDown: { ...action.payload },
      };

    case ANSWER_CALL:
      return {
        ...state,
        waitToJoin: "answered",
        answerCall: true,
      };

    case DECLINE_CALL:
      return {
        ...state,
        waitToJoin: "declined",
      };

    case NOTHING_DONE_TO_CALL:
      return {
        ...state,
        waitToJoin: "",
      };

    case CALL_AGAIN:
      return {
        ...state,
        waitToJoin: "ini",
      };

    case DESTROY_CONNECTION:
      return {
        ...state,
        callDropDown: { offer: null, from: null, config: null },
        answerCall: false,
        connection: null,
        remoteStream: null,
        waitToJoin: "ini",
      };
    case CALLER_DATA_SUCCESS:
      return {
        ...state,
        callerData: action.payload,
      };

    default:
      return state;
  }
};
