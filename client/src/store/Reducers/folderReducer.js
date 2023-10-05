import {
  CREATE_FOLDER_FAILED,
  CREATE_FOLDER_REQUEST,
  CREATE_FOLDER_SUCCESS,
  DELETE_FOLDER_FAILED,
  DELETE_FOLDER_REQUEST,
  DELETE_FOLDER_SUCCESS,
  GET_ALL_FOLDER_FAILED,
  GET_ALL_FOLDER_REQUEST,
  GET_ALL_FOLDER_SUCCESS,
} from "../Constants/folderConstant";

const initialState = {
  folders: { personal: [], shared: [] },
  folderLoading: { personal: false, shared: false },
  createfolderLoading: false,
  deleteFolderLoading: false,
};

export const folderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FOLDER_REQUEST:
      return {
        ...state,
        folderLoading: { ...state.folderLoading, [action.payload.type]: true },
      };

    case GET_ALL_FOLDER_SUCCESS:
      return {
        ...state,
        folderLoading: { personal: false, shared: false },
        folders: {
          ...state.folders,
          [action.payload.type]: action.payload.folders,
        },
      };

    case GET_ALL_FOLDER_FAILED:
      return { ...state, folderLoading: { personal: false, shared: false } };

    case CREATE_FOLDER_REQUEST:
      return { ...state, createfolderLoading: true };

    case CREATE_FOLDER_SUCCESS:
      return {
        ...state,
        folders: {
          ...state.folders,
          personal: [action.payload.folders, ...state.folders.personal],
        },
        createfolderLoading: false,
      };

    case CREATE_FOLDER_FAILED:
      return { ...state, createfolderLoading: false };

    case DELETE_FOLDER_REQUEST:
      return { ...state, deleteFolderLoading: true };

    case DELETE_FOLDER_SUCCESS:
      return {
        ...state,
        deleteFolderLoading: false,
      };

    case DELETE_FOLDER_FAILED:
      return { ...state, deleteFolderLoading: false };

    default:
      return state;
  }
};
