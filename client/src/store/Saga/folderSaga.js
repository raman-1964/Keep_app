import { call, put, takeEvery } from "redux-saga/effects";

import {
  CREATE_FOLDER_REQUEST,
  DELETE_FOLDER_REQUEST,
  GET_ALL_FOLDER_REQUEST,
} from "../Constants/folderConstant";

import {
  createFolderFailed,
  createFolderSuccess,
  deleteFolderFailed,
  deleteFolderSuccess,
  getAllFolderFailed,
  getAllFolderSuccess,
} from "../Actions/folderAction";

import {
  createFolderRequestApi,
  deleteFolderRequestApi,
  getAllFolderRequestApi,
} from "../../services/folder.services";
import { clearNote } from "../Actions/noteAction";

function* getAllFolderRequest(action) {
  try {
    const res = yield call(getAllFolderRequestApi, action.payload);
    yield put(getAllFolderSuccess({ folders: res.folders, ...action.payload }));
  } catch (e) {
    yield put(getAllFolderFailed(e));
  }
}

function* createFolderRequest(action) {
  try {
    const { name, setNewFolderModal, setNewFolderName } = action.payload;
    const res = yield call(createFolderRequestApi, { name });
    yield put(createFolderSuccess(res));
    setNewFolderModal((prev) => !prev);
    setNewFolderName({ folder: "" });
  } catch (e) {
    yield put(createFolderFailed(e));
  }
}

function* deleteFolderRequest(action) {
  try {
    const { _id, type, setDeleteModal, setSelectedFolder, selectedFolder } =
      action.payload;
    const res = yield call(deleteFolderRequestApi, _id);
    yield put(deleteFolderSuccess({ _id, type }));
    setDeleteModal(false);
    if (selectedFolder) {
      setSelectedFolder({});
      yield put(clearNote());
    }
  } catch (e) {
    yield put(deleteFolderFailed(e));
  }
}

function* folderSaga() {
  yield takeEvery(GET_ALL_FOLDER_REQUEST, getAllFolderRequest);
  yield takeEvery(CREATE_FOLDER_REQUEST, createFolderRequest);
  yield takeEvery(DELETE_FOLDER_REQUEST, deleteFolderRequest);
}

export default folderSaga;
