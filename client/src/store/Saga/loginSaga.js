import { call, put, takeEvery } from "redux-saga/effects";
import {
  loginRequestApi,
  signupRequestApi,
} from "../../services/login.services";
import {
  loginFailed,
  loginSuccess,
  signupFailed,
  signupSuccess,
} from "../Actions/loginAction";
import { LOGIN_REQUEST, SIGNUP_REQUEST } from "../Constants/loginConstants";
import { toast } from "react-toastify";
import { defaultToastSetting } from "../../utils/constants";

function* loginRequest(action) {
  try {
    const res = yield call(loginRequestApi, action.payload);
    toast.success("Logged in successfully", defaultToastSetting);
    yield put(loginSuccess(res));
  } catch (e) {
    toast.error(`${e.message}`, defaultToastSetting);
    yield put(loginFailed(e));
  }
}

function* signupRequest(action) {
  try {
    const res = yield call(signupRequestApi, action.payload);
    toast.success("Registered successfully", defaultToastSetting);
    yield put(signupSuccess(res));
  } catch (e) {
    toast.error(`${e.message}`, defaultToastSetting);
    yield put(signupFailed(e));
  }
}

function* loginSaga() {
  yield takeEvery(LOGIN_REQUEST, loginRequest);
  yield takeEvery(SIGNUP_REQUEST, signupRequest);
}

export default loginSaga;
