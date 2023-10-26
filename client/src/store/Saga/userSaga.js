import { call, put, takeEvery } from "redux-saga/effects";
import {
  changePasswordFailed,
  changePasswordSuccess,
  deleteUserFailed,
  deleteUserSuccess,
  updateUserInfoFailed,
  updateUserInfoSuccess,
  userInfoFailed,
  userInfoSuccess,
} from "../Actions/userAction";
import {
  CHANGE_PASSWORD_REQUEST,
  DELETE_USER_REQUEST,
  UPDATE_USER_INFO_REQUEST,
  USER_INFO_REQUEST,
} from "../Constants/userConstants";
import {
  changePasswordRequestApi,
  deleteUserRequestApi,
  updateUserInfoRequestApi,
  userInfoRequestApi,
} from "../../services/user.services";
import { toast } from "react-toastify";
import { defaultToastSetting } from "../../utils/constants";

function* userInfoRequest(action) {
  try {
    const res = yield call(userInfoRequestApi, action.payload);
    yield put(userInfoSuccess(res));
  } catch (error) {
    toast.error(`${error}`, defaultToastSetting);
    yield put(userInfoFailed(error));
  }
}

function* updateUserInfoRequest(action) {
  const { updatedData, setEditModal } = action.payload;
  try {
    const res = yield call(updateUserInfoRequestApi, updatedData);
    yield put(updateUserInfoSuccess(res));
    toast.success("profile updated successfully", defaultToastSetting);
  } catch (error) {
    toast.error(`${error}`, defaultToastSetting);
    yield put(updateUserInfoFailed(error));
  } finally {
    setEditModal(false);
  }
}

function* deleteUserRequest(action) {
  try {
    const res = yield call(deleteUserRequestApi);
    yield put(deleteUserSuccess(action.payload.navigate));
    window.location.reload();
    toast.success("your Account deleted successfully", defaultToastSetting);
  } catch (error) {
    toast.error(`${error}`, defaultToastSetting);
    yield put(deleteUserFailed(error));
  } finally {
    action.payload.setDeleteModal(false);
  }
}

function* changePasswordRequest(action) {
  const { password, setModal } = action.payload;
  try {
    const res = yield call(changePasswordRequestApi, password);
    yield put(changePasswordSuccess(action.payload.navigate));
    toast.success("your password changed successfully", defaultToastSetting);
  } catch (error) {
    toast.error(`${error}`, defaultToastSetting);
    yield put(changePasswordFailed(error));
  } finally {
    setModal(false);
  }
}

function* userSaga() {
  yield takeEvery(USER_INFO_REQUEST, userInfoRequest);
  yield takeEvery(DELETE_USER_REQUEST, deleteUserRequest);
  yield takeEvery(UPDATE_USER_INFO_REQUEST, updateUserInfoRequest);
  yield takeEvery(CHANGE_PASSWORD_REQUEST, changePasswordRequest);
}

export default userSaga;
