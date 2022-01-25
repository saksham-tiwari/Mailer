import { combineReducers } from "redux";
import message from "./message";
import auth from "./auth"
import email from "./email"
import permission from "./permission";
import groups from "./groups"
import mails from "./mails"
import templates from "./templates"

export default combineReducers({
    email,
    auth,
    groups,
    message,
    permission,
    mails,
    templates,
})