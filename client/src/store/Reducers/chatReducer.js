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
  isNextPage: true,
  isNextPageLoading: false,
  chatLoading: false,
  createChatLoading: false,
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CHAT_REQUEST: {
      let obj = {};
      if (action.payload.page === 1) obj.chatLoading = true;
      else obj.isNextPageLoading = true;
      return { ...state, ...obj };
    }

    case GET_ALL_CHAT_SUCCESS: {
      let obj = {};
      if (action.payload.currentPage === 1) {
        obj.chatLoading = false;
        obj.chats = [...action.payload.allChats];
      } else {
        obj.isNextPageLoading = false;
        obj.chats = [...state.chats, ...action.payload.allChats];
      }
      return {
        ...state,
        ...obj,
        isNextPage: action.payload.next,
      };
    }

    case GET_ALL_CHAT_FAILED:
      return { ...state, chatLoading: false, isNextPageLoading: false };

    case CREATE_CHAT_REQUEST:
      return { ...state, createChatLoading: true };

    case CREATE_CHAT_SUCCESS: {
      let updatedChats;
      const chatExists = state.chats.some(
        (chat) => chat._id === action.payload.res._id
      );

      if (!chatExists) updatedChats = [action.payload.res, ...state.chats];
      else updatedChats = [...state.chats];

      return {
        ...state,
        chats: updatedChats,
        createChatLoading: false,
      };
    }

    case CREATE_CHAT_FAILED:
      return { ...state, createChatLoading: false };

    case UPDATE_CHAT_LATEST_MESSAGE: {
      const { chatId, latestMessage } = action.payload;
      let index = -1;
      const updatedChats = state.chats.map((chat, ind) => {
        if (chat._id === chatId) {
          index = ind;
          return {
            ...chat,
            latestMessage,
          };
        }
        return chat;
      });

      if (index !== -1) {
        const [newestChat] = updatedChats.splice(index, 1);
        updatedChats.unshift(newestChat);
      }

      return { ...state, chats: updatedChats };
    }

    default:
      return state;
  }
};
