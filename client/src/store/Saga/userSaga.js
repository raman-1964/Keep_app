import { call, put, takeEvery } from "redux-saga/effects";
import {
  changePasswordFailed,
  changePasswordSuccess,
  changePhotoSuccess,
  deleteUserFailed,
  deleteUserSuccess,
  followUnfollowFailed,
  followUnfollowSuccess,
  sendFeedbackFailed,
  sendFeedbackSuccess,
  updateUserInfoFailed,
  updateUserInfoSuccess,
  userInfoFailed,
  userInfoSuccess,
} from "../Actions/userAction";
import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PHOTO_REQUEST,
  DELETE_USER_REQUEST,
  FOLLOW_UNFOLLOW_REQUEST,
  SEND_FEEDBACK_REQUEST,
  UPDATE_USER_INFO_REQUEST,
  USER_INFO_REQUEST,
} from "../Constants/userConstants";
import {
  changePasswordRequestApi,
  changePhotoApi,
  deleteUserRequestApi,
  follow_unfollow_Api,
  sendFeedbackApi,
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
    toast.error(`${error.message}`, defaultToastSetting);
    yield put(userInfoFailed(error));
  }
}

function* updateUserInfoRequest(action) {
  const { updatedData, setEditModal } = action.payload;
  try {
    const res = yield call(updateUserInfoRequestApi, updatedData);
    yield put(updateUserInfoSuccess(res));
    toast.success("Profile updated successfully", defaultToastSetting);
  } catch (error) {
    toast.error(`${error.message}`, defaultToastSetting);
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
    toast.success("Your Account deleted successfully", defaultToastSetting);
  } catch (error) {
    toast.error(`${error.message}`, defaultToastSetting);
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
    toast.success("Your password changed successfully", defaultToastSetting);
  } catch (error) {
    toast.error(`${error.message}`, defaultToastSetting);
    yield put(changePasswordFailed(error));
  } finally {
    setModal(false);
  }
}

function* follow_unfollow(action) {
  try {
    const res = yield call(follow_unfollow_Api, action.payload);
    yield put(followUnfollowSuccess(res));
  } catch (error) {
    toast.error(`${error.message}`, defaultToastSetting);
    yield put(followUnfollowFailed(error));
  }
}

function* sendFeedback(action) {
  const { feedback, setModal } = action.payload;
  try {
    const res = yield call(sendFeedbackApi, feedback);
    yield put(sendFeedbackSuccess(res));
  } catch (error) {
    toast.error(`${error.message}`, defaultToastSetting);
    yield put(sendFeedbackFailed(error));
  } finally {
    if (setModal) setModal(false);
  }
}

function* changePhoto(action) {
  try {
    const res = yield call(changePhotoApi, action.payload);
    yield put(changePhotoSuccess(res));
  } catch (error) {
    toast.error(`${error}`, defaultToastSetting);
  }
}

function* userSaga() {
  yield takeEvery(USER_INFO_REQUEST, userInfoRequest);
  yield takeEvery(DELETE_USER_REQUEST, deleteUserRequest);
  yield takeEvery(UPDATE_USER_INFO_REQUEST, updateUserInfoRequest);
  yield takeEvery(CHANGE_PASSWORD_REQUEST, changePasswordRequest);
  yield takeEvery(FOLLOW_UNFOLLOW_REQUEST, follow_unfollow);
  yield takeEvery(SEND_FEEDBACK_REQUEST, sendFeedback);
  yield takeEvery(CHANGE_PHOTO_REQUEST, changePhoto);
}

export default userSaga;
