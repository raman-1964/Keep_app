import { call, put, takeEvery } from "redux-saga/effects";
import { searchUserFailed, searchUserSuccess } from "../Actions/userAction";
import { SEARCH_USER_REQUEST } from "../Constants/userConstants";

function* searchUserRequest(action) {
  // try {
  //   const res = yield call(searchUserRequestApi, action.payload);
  //   yield put(searchUserSuccess(res));
  // } catch (e) {
  //   yield put(searchUserFailed(e));
  // }
}

function* userSaga() {
  yield takeEvery(SEARCH_USER_REQUEST, searchUserRequest);
}

export default userSaga;
