import { combineReducers } from "redux";
import message from "./message";
import auth from "./auth"
import email from "./email"
import permission from "./permission";

export default combineReducers({
    email,
    auth,
    message,
    permission,
})