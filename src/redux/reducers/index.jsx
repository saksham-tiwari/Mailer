import { combineReducers } from "redux";
import message from "./message";
import auth from "./auth"
import email from "./email"
import permission from "./permission";
import groups from "./groups"
import mails from "./mails"

export default combineReducers({
    email,
    auth,
    groups,
    message,
    permission,
    mails,
})