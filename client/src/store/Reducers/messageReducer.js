import {
  CREATE_MESSAGE_FAILED,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  GET_ALL_MESSAGE_FAILED,
  GET_ALL_MESSAGE_REQUEST,
  GET_ALL_MESSAGE_SUCCESS,
  GET_ALL_UNSEEN_MESSAGE_FAILED,
  GET_ALL_UNSEEN_MESSAGE_REQUEST,
  GET_ALL_UNSEEN_MESSAGE_SUCCESS,
  SEENED_MESSAGE_FAILED,
  SEENED_MESSAGE_REQUEST,
  SEENED_MESSAGE_SUCCESS,
} from "../Constants/messageConstant";

const initialState = {
  Message: [],
  MessageLoading: false,
  createMessageLoading: false,
  unseenMessage: [],
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MESSAGE_REQUEST:
      return { ...state, MessageLoading: true };

    case GET_ALL_MESSAGE_SUCCESS:
      return { ...state, Message: [...action.payload], MessageLoading: false };

    case GET_ALL_MESSAGE_FAILED:
      return { ...state, MessageLoading: false };

    case CREATE_MESSAGE_REQUEST:
      return { ...state, createMessageLoading: true };

    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        Message: [...state.Message, action.payload],
        createMessageLoading: false,
      };

    case CREATE_MESSAGE_FAILED:
      return { ...state, createMessageLoading: false };

    case GET_ALL_UNSEEN_MESSAGE_REQUEST:
      return { ...state };

    case GET_ALL_UNSEEN_MESSAGE_SUCCESS:
      return { ...state, unseenMessage: [...action.payload] };

    case GET_ALL_UNSEEN_MESSAGE_FAILED:
      return { ...state };
    case SEENED_MESSAGE_REQUEST:
      return { ...state };

    case SEENED_MESSAGE_SUCCESS:
      const unseen_Message = state.unseenMessage.filter((msg) => {
        if (!action.payload.messages_id.includes(msg._id)) return msg;
      });
      return { ...state, unseenMessage: unseen_Message };

    case SEENED_MESSAGE_FAILED:
      return { ...state };

    default:
      return state;
  }
};
