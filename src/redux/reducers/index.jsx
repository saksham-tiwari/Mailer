import { combineReducers } from "redux";
import message from "./message";
import auth from "./auth"
import email from "./email"

export default combineReducers({
    email,
    auth,
    message,
})