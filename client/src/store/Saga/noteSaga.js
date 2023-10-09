import { call, put, takeEvery } from "redux-saga/effects";
import {
  addNoteApi,
  deleteNoteApi,
  getNoteApi,
  likeNoteApi,
  unlikeNoteApi,
  updateNoteApi,
} from "../../services/notes.services";
import {
  addNoteFailed,
  addNoteSuccess,
  deleteNoteFailed,
  deleteNoteSuccess,
  getNoteFailed,
  getNoteSuccess,
  likeNoteFailed,
  likeNoteSuccess,
  unlikeNoteFailed,
  unlikeNoteSuccess,
  updateNoteFailed,
  updateNoteSuccess,
} from "../Actions/noteAction";
import {
  ADD_NOTE_REQUEST,
  DELETE_NOTE_REQUEST,
  GET_NOTE_REQUEST,
  LIKE_NOTE_REQUEST,
  UNLIKE_NOTE_REQUEST,
  UPDATE_NOTE_REQUEST,
} from "../Constants/noteConstants";
import { toast } from "react-toastify";
import { defaultToastSetting } from "../../utils/constants";

function* getNote(action) {
  try {
    const res = yield call(getNoteApi, action.payload);
    yield put(getNoteSuccess(res));
  } catch (error) {
    yield put(getNoteFailed(error));
  }
}

function* addNote(action) {
  try {
    const res = yield call(addNoteApi, { ...action.payload.data });
    action.payload.setInputModal(false);
    toast.success("note added successfully", defaultToastSetting);
    yield put(addNoteSuccess(res));
  } catch (error) {
    toast.error(`${error}`, defaultToastSetting);
    action.payload.setInputModal(false);
    yield put(addNoteFailed(error));
  }
}

function* updateNote(action) {
  try {
    const res = yield call(updateNoteApi, {
      note: action.payload.data,
      id: action.payload.id,
    });
    action.payload.setToggle(null);
    toast.success("note updated successfully", defaultToastSetting);
    yield put(updateNoteSuccess(res));
  } catch (error) {
    toast.error(`${error}`, defaultToastSetting);
    action.payload.setToggle(null);
    yield put(updateNoteFailed(error));
  }
}

function* deleteNote(action) {
  try {
    const res = yield call(deleteNoteApi, action.payload);
    toast.success("note deleted successfully", defaultToastSetting);
    yield put(deleteNoteSuccess(action.payload));
  } catch (error) {
    toast.error(`${error}`, defaultToastSetting);
    yield put(deleteNoteFailed(action.payload));
  }
}

function* likeNote(action) {
  try {
    const res = yield call(likeNoteApi, action.payload);
    yield put(likeNoteSuccess(res));
  } catch (error) {
    yield put(likeNoteFailed(error));
  }
}

function* unlikeNote(action) {
  try {
    const res = yield call(unlikeNoteApi, action.payload);
    yield put(unlikeNoteSuccess(res));
  } catch (error) {
    yield put(unlikeNoteFailed(error));
  }
}

function* noteSaga() {
  yield takeEvery(GET_NOTE_REQUEST, getNote);
  yield takeEvery(ADD_NOTE_REQUEST, addNote);
  yield takeEvery(UPDATE_NOTE_REQUEST, updateNote);
  yield takeEvery(DELETE_NOTE_REQUEST, deleteNote);
  yield takeEvery(LIKE_NOTE_REQUEST, likeNote);
  yield takeEvery(UNLIKE_NOTE_REQUEST, unlikeNote);
}

export default noteSaga;
