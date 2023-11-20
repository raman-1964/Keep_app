import {
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PHOTO_SUCCESS,
  DELETE_USER_FAILED,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  FOLLOW_UNFOLLOW_FAILED,
  FOLLOW_UNFOLLOW_REQUEST,
  FOLLOW_UNFOLLOW_SUCCESS,
  SEND_FEEDBACK_FAILED,
  SEND_FEEDBACK_REQUEST,
  SEND_FEEDBACK_SUCCESS,
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
  followUnfollowLoading: false,
  sendFeedbackLoading: false,
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

    case FOLLOW_UNFOLLOW_REQUEST:
      return {
        ...state,
        followUnfollowLoading: true,
      };
    case FOLLOW_UNFOLLOW_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        followUnfollowLoading: false,
      };
    case FOLLOW_UNFOLLOW_FAILED:
      return {
        ...state,
        followUnfollowLoading: false,
      };

    case SEND_FEEDBACK_REQUEST:
      return {
        ...state,
        sendFeedbackLoading: true,
      };
    case SEND_FEEDBACK_SUCCESS:
      return {
        ...state,
        sendFeedbackLoading: false,
      };
    case SEND_FEEDBACK_FAILED:
      return {
        ...state,
        sendFeedbackLoading: false,
      };

    case CHANGE_PHOTO_SUCCESS:
      return {
        ...state,
        userData: { ...state.userData, imgUrl: action.payload },
      };

    default:
      return state;
  }
};
