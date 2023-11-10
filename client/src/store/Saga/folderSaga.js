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
  const { name, setNewFolderModal, setNewFolderName } = action.payload;
  try {
    const res = yield call(createFolderRequestApi, { name });
    yield put(createFolderSuccess(res));
    toast.success("Folder added to Personal successfully", defaultToastSetting);
  } catch (e) {
    toast.error(`${e.message}`, defaultToastSetting);
    yield put(createFolderFailed(e));
  } finally {
    setNewFolderModal(false);
    setNewFolderName({ folder: "" });
  }
}

function* deleteFolderRequest(action) {
  const { _id, type, setDeleteModal, setSelectedFolder, selectedFolder } =
    action.payload;
  try {
    const res = yield call(deleteFolderRequestApi, _id);
    yield put(deleteFolderSuccess({ _id, type }));
    if (selectedFolder) {
      setSelectedFolder({});
      yield put(clearNote());
    }
    toast.success("Folder deleted successfully", defaultToastSetting);
  } catch (e) {
    toast.error(`${e.message}`, defaultToastSetting);
    yield put(deleteFolderFailed(e));
  } finally {
    setDeleteModal(false);
  }
}

function* shareFolderRequest(action) {
  const { _id, type, arr, setShareModal, setDeleteOrSharedFolder } =
    action.payload;
  try {
    const res = yield call(shareFolderRequestApi, { _id, sharedTo: arr });
    yield put(shareFolderSuccess({ _id, type, res }));
    toast.success("Folder shared successfully", defaultToastSetting);
  } catch (e) {
    toast.error(`${e.message}`, defaultToastSetting);
    yield put(shareFolderFailed(e));
  } finally {
    setShareModal(false);
    setDeleteOrSharedFolder(null);
  }
}

function* removeSharedFolderRequest(action) {
  const { _id, type, setDeleteModal, setSelectedFolder, selectedFolder } =
    action.payload;
  try {
    const res = yield call(shareFolderRequestApi, { _id });
    yield put(deleteFolderSuccess({ _id, type }));
    if (selectedFolder) {
      setSelectedFolder({});
      yield put(clearNote());
    }
    toast.success("Successfully removed from folder.", defaultToastSetting);
  } catch (e) {
    toast.error(`${e.message}`, defaultToastSetting);
    yield put(deleteFolderFailed(e));
  } finally {
    setDeleteModal(false);
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
