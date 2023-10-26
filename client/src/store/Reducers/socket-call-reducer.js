import {
  CREATE_SOCKET,
  ANSWER_CALL,
  OFFER_RECEIVED,
  MAKE_RTC_CONNECTION,
} from "../Constants/socket-call";
import io from "socket.io-client";

const initialState = {
  socket: null,
  callDropDown: { show: false, offer: null, from: null, config: null },
  answerCall: false,
  connection: null,
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

    case MAKE_RTC_CONNECTION:
      return {
        ...state,
        connection: action.payload,
      };

    case OFFER_RECEIVED:
      return {
        ...state,
        callDropDown: { show: true, ...action.payload },
      };

    case ANSWER_CALL:
      return {
        ...state,
        callDropDown: { ...state.callDropDown, show: false },
        answerCall: true,
      };

    default:
      return state;
  }
};
