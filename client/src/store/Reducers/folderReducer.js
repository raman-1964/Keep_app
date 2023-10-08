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
  SHARE_FOLDER_FAILED,
  SHARE_FOLDER_REQUEST,
  SHARE_FOLDER_SUCCESS,
} from "../Constants/folderConstant";

const initialState = {
  folders: { personal: [], shared: [] },
  folderLoading: { personal: false, shared: false },
  createfolderLoading: false,
  deleteFolderLoading: false,
  shareFolderLoading: false,
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
          personal: [action.payload, ...state.folders.personal],
        },
        createfolderLoading: false,
      };

    case CREATE_FOLDER_FAILED:
      return { ...state, createfolderLoading: false };

    case DELETE_FOLDER_REQUEST:
      return { ...state, deleteFolderLoading: true };

    case DELETE_FOLDER_SUCCESS: {
      const { _id, type } = action.payload;
      const updatedFolders = state.folders[type].filter((folder) => {
        if (folder._id !== _id) return folder;
      });

      return {
        ...state,
        folders: { ...state.folders, [type]: updatedFolders },
        deleteFolderLoading: false,
      };
    }

    case DELETE_FOLDER_FAILED:
      return { ...state, deleteFolderLoading: false };

    case SHARE_FOLDER_REQUEST:
      return {
        ...state,
        shareFolderLoading: true,
      };

    case SHARE_FOLDER_SUCCESS: {
      const { _id, type, res } = action.payload;
      let updatedFolders = {};

      if (type === "personal") {
        updatedFolders.personal = state.folders.personal.filter(
          (item) => item._id !== _id
        );
        updatedFolders.shared = [...state.folders.shared, res];
      } else {
        updatedFolders.personal = state.folders.personal;
        updatedFolders.shared = state.folders.shared.map((item) => {
          if (item._id === _id) return res;
          return item;
        });
      }

      return {
        ...state,
        folders: updatedFolders,
        shareFolderLoading: false,
      };
    }

    case SHARE_FOLDER_FAILED:
      return {
        ...state,
        shareFolderLoading: false,
      };

    default:
      return state;
  }
};
