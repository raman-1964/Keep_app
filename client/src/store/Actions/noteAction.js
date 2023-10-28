import {
  ADD_NOTE_FAILED,
  ADD_NOTE_REQUEST,
  ADD_NOTE_SUCCESS,
  CLEAR_NOTE,
  DELETE_NOTE_FAILED,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  GET_LIKE_NOTE_FAILED,
  GET_LIKE_NOTE_REQUEST,
  GET_LIKE_NOTE_SUCCESS,
  GET_NOTE_FAILED,
  GET_NOTE_REQUEST,
  GET_NOTE_SUCCESS,
  LIKE_NOTE_FAILED,
  LIKE_NOTE_REQUEST,
  LIKE_NOTE_SUCCESS,
  UNLIKE_NOTE_FAILED,
  UNLIKE_NOTE_REQUEST,
  UNLIKE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILED,
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_SUCCESS,
} from "../Constants/noteConstants";

export const getNoteRequest = (data) => {
  return { type: GET_NOTE_REQUEST, payload: data };
};

export const getNoteSuccess = (data) => {
  return { type: GET_NOTE_SUCCESS, payload: data };
};

export const getNoteFailed = (data) => {
  return { type: GET_NOTE_FAILED, payload: data };
};

export const getLikeNoteRequest = (data) => {
  return { type: GET_LIKE_NOTE_REQUEST, payload: data };
};

export const getLikeNoteSuccess = (data) => {
  return { type: GET_LIKE_NOTE_SUCCESS, payload: data };
};

export const getLikeNoteFailed = (data) => {
  return { type: GET_LIKE_NOTE_FAILED, payload: data };
};

export const addNoteRequest = (data) => {
  return { type: ADD_NOTE_REQUEST, payload: data };
};

export const addNoteSuccess = (data) => {
  return { type: ADD_NOTE_SUCCESS, payload: data };
};

export const addNoteFailed = (data) => {
  return { type: ADD_NOTE_FAILED, payload: data };
};

export const updateNoteRequest = (data) => {
  return { type: UPDATE_NOTE_REQUEST, payload: data };
};

export const updateNoteSuccess = (data) => {
  return { type: UPDATE_NOTE_SUCCESS, payload: data };
};

export const updateNoteFailed = (data) => {
  return { type: UPDATE_NOTE_FAILED, payload: data };
};

export const deleteNoteRequest = (data) => {
  return { type: DELETE_NOTE_REQUEST, payload: data };
};

export const deleteNoteSuccess = (data) => {
  return { type: DELETE_NOTE_SUCCESS, payload: data };
};

export const deleteNoteFailed = (data) => {
  return { type: DELETE_NOTE_FAILED, payload: data };
};

export const likeNoteRequest = (data) => {
  return { type: LIKE_NOTE_REQUEST, payload: data };
};

export const likeNoteSuccess = (data) => {
  return { type: LIKE_NOTE_SUCCESS, payload: data };
};

export const likeNoteFailed = (data) => {
  return { type: LIKE_NOTE_FAILED, payload: data };
};

export const unlikeNoteRequest = (data) => {
  return { type: UNLIKE_NOTE_REQUEST, payload: data };
};

export const unlikeNoteSuccess = (data) => {
  return { type: UNLIKE_NOTE_SUCCESS, payload: data };
};

export const unlikeNoteFailed = (data) => {
  return { type: UNLIKE_NOTE_FAILED, payload: data };
};

export const clearNote = (data) => {
  return { type: CLEAR_NOTE, payload: data };
};
