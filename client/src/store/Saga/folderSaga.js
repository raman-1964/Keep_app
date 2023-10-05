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

function* getAllFolderRequest(action) {
  try {
    const res = yield call(getAllFolderRequestApi, {
      type: action.payload.type,
    });
    yield put(
      getAllFolderSuccess({ folders: res.folders, type: action.payload.type })
    );
  } catch (e) {
    yield put(getAllFolderFailed(e));
  }
}

function* createFolderRequest(action) {
  try {
    const res = yield call(createFolderRequestApi, {
      name: action.payload.name,
    });
    yield put(createFolderSuccess(res));
    action.payload.setNewFolderModal((prev) => !prev);
  } catch (e) {
    yield put(createFolderFailed(e));
  }
}

function* deleteFolderRequest(action) {
  try {
    const res = yield call(deleteFolderRequestApi, {
      name: action.payload.name,
    });
    yield put(deleteFolderSuccess(res));
    action.payload.setNewFolderModal((prev) => !prev);
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
