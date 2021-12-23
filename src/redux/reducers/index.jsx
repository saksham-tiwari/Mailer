import { combineReducers } from "redux";
import message from "./message";
import auth_reducer from "./auth"

export default combineReducers({
    auth_reducer,
    message,
})