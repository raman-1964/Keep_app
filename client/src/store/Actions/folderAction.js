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
  REMOVE_SHARED_FOLDER_FAILED,
  REMOVE_SHARED_FOLDER_REQUEST,
  REMOVE_SHARED_FOLDER_SUCCESS,
  SHARE_FOLDER_FAILED,
  SHARE_FOLDER_REQUEST,
  SHARE_FOLDER_SUCCESS,
} from "../Constants/folderConstant";

export const getAllFolderRequest = (data) => {
  return { type: GET_ALL_FOLDER_REQUEST, payload: data };
};
export const getAllFolderSuccess = (data) => {
  return { type: GET_ALL_FOLDER_SUCCESS, payload: data };
};
export const getAllFolderFailed = (data) => {
  return { type: GET_ALL_FOLDER_FAILED, payload: data };
};

export const createFolderRequest = (data) => {
  return { type: CREATE_FOLDER_REQUEST, payload: data };
};
export const createFolderSuccess = (data) => {
  return { type: CREATE_FOLDER_SUCCESS, payload: data };
};
export const createFolderFailed = (data) => {
  return { type: CREATE_FOLDER_FAILED, payload: data };
};

export const deleteFolderRequest = (data) => {
  return { type: DELETE_FOLDER_REQUEST, payload: data };
};
export const deleteFolderSuccess = (data) => {
  return { type: DELETE_FOLDER_SUCCESS, payload: data };
};
export const deleteFolderFailed = (data) => {
  return { type: DELETE_FOLDER_FAILED, payload: data };
};

export const shareFolderRequest = (data) => {
  return { type: SHARE_FOLDER_REQUEST, payload: data };
};
export const shareFolderSuccess = (data) => {
  return { type: SHARE_FOLDER_SUCCESS, payload: data };
};
export const shareFolderFailed = (data) => {
  return { type: SHARE_FOLDER_FAILED, payload: data };
};

export const removeShareFolderRequest = (data) => {
  return { type: REMOVE_SHARED_FOLDER_REQUEST, payload: data };
};
