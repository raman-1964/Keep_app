import { call, put, takeEvery } from "redux-saga/effects";
import {
  createMessageFailed,
  createMessageSuccess,
  getAllMessageFailed,
  getAllMessageSuccess,
} from "../Actions/messageAction";
import {
  CREATE_MESSAGE_REQUEST,
  GET_ALL_MESSAGE_REQUEST,
} from "../Constants/messageConstant";
import {
  createMessageRequestApi,
  getAllMessageRequestApi,
} from "../../services/message.services";

function* getAllMessageRequest(action) {
  try {
    const res = yield call(getAllMessageRequestApi, action.payload);
    yield put(getAllMessageSuccess(res));
  } catch (e) {
    yield put(getAllMessageFailed(e));
  }
}

function* createMessageRequest(action) {
  try {
    const res = yield call(createMessageRequestApi, action.payload);
    yield put(createMessageSuccess(res));
  } catch (e) {
    yield put(createMessageFailed(e));
  }
}

function* messageSaga() {
  yield takeEvery(GET_ALL_MESSAGE_REQUEST, getAllMessageRequest);
  yield takeEvery(CREATE_MESSAGE_REQUEST, createMessageRequest);
}

export default messageSaga;
