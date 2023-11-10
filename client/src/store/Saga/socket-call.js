import { call, put, takeEvery } from "redux-saga/effects";
import { getAnotherUserApi } from "../../services/user.services";
import { toast } from "react-toastify";
import { defaultToastSetting } from "../../utils/constants";
import { getCallerDataSuccess } from "../Actions/socket-call";
import { CALLER_DATA } from "../Constants/socket-call";

function* getCallerData(action) {
  try {
    const res = yield call(getAnotherUserApi, action.payload);
    yield put(getCallerDataSuccess(res));
  } catch (error) {
    toast.error(`${error}`, defaultToastSetting);
  }
}

function* userSaga() {
  yield takeEvery(CALLER_DATA, getCallerData);
}

export default userSaga;
