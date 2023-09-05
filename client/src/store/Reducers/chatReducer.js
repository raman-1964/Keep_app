import {
  CREATE_CHAT_FAILED,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  GET_ALL_CHAT_FAILED,
  GET_ALL_CHAT_REQUEST,
  GET_ALL_CHAT_SUCCESS,
  UPDATE_CHAT_LATEST_MESSAGE,
} from "../Constants/chatConstant";

const initialState = {
  chats: [],
  chatLoading: false,
  createChatLoading: false,
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CHAT_REQUEST:
      return { ...state, chatLoading: true };

    case GET_ALL_CHAT_SUCCESS:
      return { ...state, chats: [...action.payload], chatLoading: false };

    case GET_ALL_CHAT_FAILED:
      return { ...state, chatLoading: false };

    case CREATE_CHAT_REQUEST:
      return { ...state, createChatLoading: true };

    case CREATE_CHAT_SUCCESS:
      action.payload.setSelectedChat(action.payload.res);
      return {
        ...state,
        chats: [action.payload.res, ...state.chat],
        createChatLoading: false,
      };

    case CREATE_CHAT_FAILED:
      return { ...state, createChatLoading: false };

    case UPDATE_CHAT_LATEST_MESSAGE:
      const { chatId, latestMessage } = action.payload;
      const updatedChats = state.chats.map((chat) => {
        if (chat._id === chatId)
          return {
            ...chat,
            latestMessage,
          };
        return chat;
      });

      return { ...state, chats: updatedChats };

    default:
      return state;
  }
};
