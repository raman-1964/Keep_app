import { combineReducers } from "redux";
import { noteReducer } from "./noteReducer";
import { userReducer } from "./userReducer";
import { loginReducer } from "./loginReducer";

const rootReducer = combineReducers({
  noteReducer,
  userReducer,
  loginReducer
});

export default rootReducer;