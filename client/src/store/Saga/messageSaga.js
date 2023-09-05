import { call, put, takeEvery } from "redux-saga/effects";
import {
  createMessageFailed,
  createMessageSuccess,
  getAllMessageFailed,
  getAllMessageSuccess,
  getAllUnseenMessageFailed,
  getAllUnseenMessageSuccess,
  seenedMessageFailed,
  seenedMessageSuccess,
} from "../Actions/messageAction";
import {
  CREATE_MESSAGE_REQUEST,
  GET_ALL_MESSAGE_REQUEST,
  GET_ALL_UNSEEN_MESSAGE_REQUEST,
  SEENED_MESSAGE_REQUEST,
} from "../Constants/messageConstant";
import {
  createMessageRequestApi,
  getAllMessageRequestApi,
  getAllUnseenMessageRequestApi,
  seenedMessageRequestApi,
} from "../../services/message.services";
import { updateChatLatestMessage } from "../Actions/chatAction";

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
    if (action.payload.data) {
      const res = yield call(createMessageRequestApi, action.payload.data);
      action.payload.socket.emit("new-message", res);
      yield put(createMessageSuccess(res));
      yield put(
        updateChatLatestMessage({
          chatId: action.payload.data.chatId,
          latestMessage: res,
        })
      );
    } else yield put(createMessageSuccess(action.payload));
  } catch (e) {
    yield put(createMessageFailed(e));
  }
}

function* getAllUnseenMessageRequest(action) {
  try {
    let res;
    if (!action.payload) res = yield call(getAllUnseenMessageRequestApi);
    else res = [action.payload];
    yield put(getAllUnseenMessageSuccess(res));
  } catch (e) {
    yield put(getAllUnseenMessageFailed(e));
  }
}

function* seenedMessageRequest(action) {
  try {
    const res = yield call(seenedMessageRequestApi, action.payload);
    yield put(seenedMessageSuccess(action.payload));
  } catch (e) {
    yield put(seenedMessageFailed(e));
  }
}

function* messageSaga() {
  yield takeEvery(GET_ALL_MESSAGE_REQUEST, getAllMessageRequest);
  yield takeEvery(CREATE_MESSAGE_REQUEST, createMessageRequest);
  yield takeEvery(GET_ALL_UNSEEN_MESSAGE_REQUEST, getAllUnseenMessageRequest);
  yield takeEvery(SEENED_MESSAGE_REQUEST, seenedMessageRequest);
}

export default messageSaga;
