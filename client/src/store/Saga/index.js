import { all } from "redux-saga/effects";
import noteSaga from "./noteSaga";
import userSaga from "./userSaga";
import loginSaga from "./loginSaga";

export default function* rootSaga() {
  yield all([noteSaga(), userSaga(), loginSaga()]);
}
