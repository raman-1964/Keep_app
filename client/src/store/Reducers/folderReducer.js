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
  REMOVE_SHARED_FOLDER_REQUEST,
  SHARE_FOLDER_FAILED,
  SHARE_FOLDER_REQUEST,
  SHARE_FOLDER_SUCCESS,
} from "../Constants/folderConstant";
import { folderType } from "../../utils/constants";

const initialState = {
  folders: { PRS: [], SBO: [], SBY: [] },
  folderLoading: false,
  createfolderLoading: false,
  deleteFolderLoading: false,
  shareFolderLoading: false,
};

export const folderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FOLDER_REQUEST:
      return {
        ...state,
        folderLoading: true,
      };

    case GET_ALL_FOLDER_SUCCESS:
      return {
        ...state,
        folderLoading: false,
        folders: action.payload.folders,
      };

    case GET_ALL_FOLDER_FAILED:
      return {
        ...state,
        folderLoading: false,
      };

    case CREATE_FOLDER_REQUEST:
      return { ...state, createfolderLoading: true };

    case CREATE_FOLDER_SUCCESS:
      return {
        ...state,
        folders: {
          ...state.folders,
          [folderType.PRS]: [action.payload, ...state.folders[folderType.PRS]],
        },
        createfolderLoading: false,
      };

    case CREATE_FOLDER_FAILED:
      return { ...state, createfolderLoading: false };

    case DELETE_FOLDER_REQUEST:
      return { ...state, deleteFolderLoading: true };

    case REMOVE_SHARED_FOLDER_REQUEST:
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

      if (type === folderType.PRS) {
        updatedFolders[folderType.PRS] = state.folders[folderType.PRS].filter(
          (item) => item._id !== _id
        );
        updatedFolders[folderType.SBY] = [
          ...state.folders[folderType.SBY],
          res,
        ];
      }
      if (type === folderType.SBY) {
        if (res.sharedTo.length)
          updatedFolders[folderType.SBY] = state.folders[folderType.SBY].map(
            (item) => {
              if (item._id === _id) return res;
              return item;
            }
          );
        else {
          updatedFolders[folderType.SBY] = state.folders[folderType.SBY].filter(
            (item) => item._id !== _id
          );
          updatedFolders[folderType.PRS] = [
            ...state.folders[folderType.PRS],
            res,
          ];
        }
      }

      return {
        ...state,
        folders: { ...state.folders, ...updatedFolders },
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
