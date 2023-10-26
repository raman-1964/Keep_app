import {
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  DELETE_USER_FAILED,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  UPDATE_USER_INFO_FAILED,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
  USER_INFO_FAILED,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
} from "../Constants/userConstants";

const initialState = {
  userDataLoading: false,
  deleteUserLoading: false,
  updateUserLoading: false,
  changePasswordLoading: false,
  userData: {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO_REQUEST:
      return {
        ...state,
        userDataLoading: true,
      };
    case USER_INFO_SUCCESS:
      return {
        ...state,
        userDataLoading: false,
        userData: action.payload,
      };
    case USER_INFO_FAILED:
      return {
        ...state,
        userDataLoading: false,
      };

    case DELETE_USER_REQUEST:
      return {
        ...state,
        deleteUserLoading: true,
      };
    case DELETE_USER_SUCCESS:
      localStorage.removeItem("Raman-Keep-Token");
      localStorage.removeItem("Raman-Keep-Username");

      return {
        ...state,
        deleteUserLoading: false,
        userData: {},
      };
    case DELETE_USER_FAILED:
      return {
        ...state,
        deleteUserLoading: false,
      };

    case UPDATE_USER_INFO_REQUEST:
      return {
        ...state,
        updateUserLoading: true,
      };
    case UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        updateUserLoading: false,
        userData: action.payload,
      };
    case UPDATE_USER_INFO_FAILED:
      return {
        ...state,
        updateUserLoading: false,
      };

    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        changePasswordLoading: true,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordLoading: false,
      };
    case CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        changePasswordLoading: false,
      };

    default:
      return state;
  }
};
