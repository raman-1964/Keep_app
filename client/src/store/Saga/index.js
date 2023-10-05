import { all } from "redux-saga/effects";
import noteSaga from "./noteSaga";
import userSaga from "./userSaga";
import loginSaga from "./loginSaga";
import chatSaga from "./chatSaga";
import messageSaga from "./messageSaga";
import folderSaga from "./folderSaga";

export default function* rootSaga() {
  yield all([
    noteSaga(),
    userSaga(),
    loginSaga(),
    folderSaga(),
    messageSaga(),
    chatSaga(),
  ]);
}
