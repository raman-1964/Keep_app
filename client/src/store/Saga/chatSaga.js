import { call, put, takeEvery } from "redux-saga/effects";
import {
  createChatFailed,
  createChatSuccess,
  getAllChatFailed,
  getAllChatSuccess,
} from "../Actions/chatAction";
import {
  CREATE_CHAT_REQUEST,
  GET_ALL_CHAT_REQUEST,
} from "../Constants/chatConstant";
import {
  createChatRequestApi,
  getAllChatRequestApi,
} from "../../services/chat.services";

function* getAllChatRequest(action) {
  try {
    const res = yield call(getAllChatRequestApi, action.payload);
    yield put(getAllChatSuccess(res));
  } catch (e) {
    yield put(getAllChatFailed(e));
  }
}

function* createChatRequest(action) {
  try {
    const { userId, setSelectedChat, navigate } = action.payload;
    const res = yield call(createChatRequestApi, { userId });
    yield put(createChatSuccess({ res }));
    if (setSelectedChat) setSelectedChat(res);
    if (navigate) navigate("/chat", { state: { res } });
  } catch (e) {
    yield put(createChatFailed(e));
  }
}

function* chatSaga() {
  yield takeEvery(GET_ALL_CHAT_REQUEST, getAllChatRequest);
  yield takeEvery(CREATE_CHAT_REQUEST, createChatRequest);
}

export default chatSaga;
