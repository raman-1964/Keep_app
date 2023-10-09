import { call, put, takeEvery } from "redux-saga/effects";

import {
  CREATE_FOLDER_REQUEST,
  DELETE_FOLDER_REQUEST,
  GET_ALL_FOLDER_REQUEST,
  REMOVE_SHARED_FOLDER_REQUEST,
  SHARE_FOLDER_REQUEST,
} from "../Constants/folderConstant";

import {
  createFolderFailed,
  createFolderSuccess,
  deleteFolderFailed,
  deleteFolderSuccess,
  getAllFolderFailed,
  getAllFolderSuccess,
  shareFolderFailed,
  shareFolderSuccess,
} from "../Actions/folderAction";

import {
  createFolderRequestApi,
  deleteFolderRequestApi,
  getAllFolderRequestApi,
  shareFolderRequestApi,
} from "../../services/folder.services";
import { clearNote } from "../Actions/noteAction";
import { toast } from "react-toastify";
import { defaultToastSetting } from "../../utils/constants";

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
    setNewFolderModal(false);
    setNewFolderName({ folder: "" });
    toast.success("Folder added to Personal successfully", defaultToastSetting);
  } catch (e) {
    toast.error(`${e}`, defaultToastSetting);
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
    toast.success("folder deleted successfully", defaultToastSetting);
  } catch (e) {
    toast.error(`${e}`, defaultToastSetting);
    yield put(deleteFolderFailed(e));
  }
}

function* shareFolderRequest(action) {
  try {
    const { _id, type, arr, setShareModal, setDeleteOrSharedFolder } =
      action.payload;
    const res = yield call(shareFolderRequestApi, { _id, sharedTo: arr });
    yield put(shareFolderSuccess({ _id, type, res }));
    setShareModal(false);
    setDeleteOrSharedFolder(null);
    toast.success("folder shared successfully", defaultToastSetting);
  } catch (e) {
    toast.error(`${e}`, defaultToastSetting);
    yield put(shareFolderFailed(e));
  }
}

function* removeSharedFolderRequest(action) {
  try {
    const { _id, type, setDeleteModal, setSelectedFolder, selectedFolder } =
      action.payload;
    const res = yield call(shareFolderRequestApi, { _id });
    yield put(deleteFolderSuccess({ _id, type }));
    setDeleteModal(false);
    if (selectedFolder) {
      setSelectedFolder({});
      yield put(clearNote());
    }
    toast.success("Successfully removed from folder.", defaultToastSetting);
  } catch (e) {
    toast.error(`${e}`, defaultToastSetting);
    yield put(deleteFolderFailed(e));
  }
}

function* folderSaga() {
  yield takeEvery(GET_ALL_FOLDER_REQUEST, getAllFolderRequest);
  yield takeEvery(CREATE_FOLDER_REQUEST, createFolderRequest);
  yield takeEvery(DELETE_FOLDER_REQUEST, deleteFolderRequest);
  yield takeEvery(SHARE_FOLDER_REQUEST, shareFolderRequest);
  yield takeEvery(REMOVE_SHARED_FOLDER_REQUEST, removeSharedFolderRequest);
}

export default folderSaga;
