import { MAIL_SENT, ADD_ATTACHMENT } from "../actions/types";

const initialState = {sentMails:[]}

const mailsReducer = (state=initialState, action)=>{
    const {type, payload} = action;
    switch(type){
        case MAIL_SENT:
            return{
                ...state,
                sentMails: [...state.sentMails,{payload}]
            }
        default:
            return state;
    }
}

export default mailsReducer